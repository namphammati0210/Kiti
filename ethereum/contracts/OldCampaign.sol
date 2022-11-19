// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint256 minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));

        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address payable recipient;
        bool isComplete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    /* Contract's Property */
    address public manager;
    uint256 public minimumContribution; // The minimum amount of money that each person must contribute to become an approver
    // TODO: save amount of money each approver has contributed
    mapping(address => bool) public approvers; // List of addresses for every person who has donated
    uint256 public approversCount;

    mapping(uint256 => Request) public requests; // List of requests that the manager has created
    uint256 private currentIndex;

    /*  Modifier for only manager */
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    /* Contract's method */
    constructor(uint256 minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

    receive() external payable {}

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function contribute() public payable {
        require(
            msg.value > minimumContribution,
            "The amount of money is not enough"
        );

        require(!approvers[msg.sender], "The address has contributed before");

        approvers[msg.sender] = true;

        approversCount++;
    }

    function createRequest(
        string memory description,
        uint256 value,
        address payable recipient
    ) public restricted {
        Request storage newRequestInStorage = requests[currentIndex];

        newRequestInStorage.description = description;
        newRequestInStorage.value = value;
        newRequestInStorage.recipient = recipient;
        newRequestInStorage.isComplete = false;
        newRequestInStorage.approvalCount = 0;

        currentIndex++;
    }

    function approveRequest(uint256 indexOfRequest) public {
        Request storage request = requests[indexOfRequest];

        require(approvers[msg.sender], "You must be an approver");
        require(
            !request.approvals[msg.sender],
            "You can't vote because you already voted"
        );

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint256 indexOfRequest) public restricted {
        Request storage request = requests[indexOfRequest];

        require(!request.isComplete, "This request has been completed");

        require(
            request.approvalCount > (approversCount / 2),
            "At least more than 50% approvers to make transactions"
        );

        request.isComplete = true;

        request.recipient.transfer(request.value);
    }
}
