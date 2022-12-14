import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import web3 from "../../ethereum/web3";
import Campaign from "../../ethereum/campaign";

// components

// import TableDropdown from "components/Dropdowns/TableDropdown.js";
import TableDropdown from "../Dropdowns/TableDropdown";

interface IProps {
  color?: "light" | "dark";
  headers: string[];
  data: [];
  approversCount: string;
  address: string;
}

export default function CardTable({
  color,
  headers,
  data,
  approversCount,
  address,
}: IProps) {
  console.log("🚀 ~ file: CardTable.tsx:27 ~ address", address);
  const navigate = useNavigate();

  const onApprove = async (id: number) => {
    try {
      const campaign = Campaign(address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(id).send({
        from: accounts[0],
        gas: "1000000",
      });
      // Refesh page after approve
      navigate(0);
    } catch (error) {
      console.log("🚀 ~ file: CardTable.tsx:29 ~ onApprove ~ error", error);
    }
  };

  const onFinalize = async (id: number) => {
    console.log("🚀 ~ file: CardTable.tsx:45 ~ onFinalize ~ id", id);
    try {
      const campaign = Campaign(address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.finalizeRequest(id).send({
        from: accounts[0],
        // gas: "1000000",
      });
      // Refesh page after approve
      // navigate(0);
    } catch (error) {
      console.log("🚀 ~ file: CardTable.tsx:48 ~ onFinalize ~ error", error);
    }
  };

  const calcApprovalCount = (approvalCount: number, approverCount: number) => {
    const progress =
      (approvalCount / (Math.trunc(approverCount / 2) + 1)) * 100;
    return `${progress}%`;
  };

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Requests Table
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {headers &&
                  headers.map((header, index) => (
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                      }
                      key={index}
                    >
                      {header}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, index) => (
                  <tr key={index}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                      {/* <img
                    src={require("assets/img/bootstrap.jpg").default}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>{" "} */}
                      <span
                        className={
                          "ml-3 font-bold " +
                          +(color === "light"
                            ? "text-blueGray-600"
                            : "text-white")
                        }
                      >
                        {index}
                      </span>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                      {/* <p className=" truncate w-[100px]"> */}
                      {item["description"]}
                      {/* </p> */}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                      {/* <i className="fas fa-circle text-orange-500 mr-2"></i>{" "}
                      pending */}
                      {web3.utils.fromWei(item["value"], "ether")} ETH
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                      <p className="truncate w-[150px]">{item["recipient"]}</p>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                      <p className="text-center">
                        {item["approvalCount"]}/{approversCount}
                      </p>
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-lightBlue-200">
                          <div
                            style={{
                              width: calcApprovalCount(
                                item["approvalCount"],
                                parseInt(approversCount)
                              ),
                            }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-lightBlue-500"
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                      <button
                        className=" bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => onApprove(index)}
                      >
                        Approve
                      </button>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                      <button
                        className="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => onFinalize(index)}
                      >
                        Finalize
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
