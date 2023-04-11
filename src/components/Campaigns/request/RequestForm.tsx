import { useState } from "react";
import { useParams } from "react-router-dom";

import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";

import Alerts from "../../Badge/Alerts";

const RequestForm = () => {
  const { campaignId } = useParams();

  const [value, setValue] = useState("");
  const [desciption, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState<string>("");

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(e.target.value);

  const onChangeRecipient = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRecipient(e.target.value);

  const onSubmit = async () => {
    try {
      const campaign = Campaign(campaignId);
      const accounts = await web3.eth.getAccounts();
      const weiValue = web3.utils.toWei(value, "ether");

      const request = await campaign.methods
        .createRequest(desciption, weiValue, recipient)
        .send({ from: accounts[0], gas: "1000000" });

      if (request) {
        setSuccessMsg("Create a request sucessfully");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div className="text-center flex justify-between">
          <h6 className="text-blueGray-700 text-xl font-bold">
            Create a new request
          </h6>
          {/* <button
            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button"
          >
            Create
          </button> */}
        </div>
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        {error && <Alerts variant="error" message={error} />}
        {successMsg && <Alerts variant="success" message={successMsg} />}
        <form>
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Campaign Information
          </h6>
          <div className="flex flex-wrap">
            <div className="w-full px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Description
                </label>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  defaultValue={desciption}
                  onChange={onChangeDescription}
                />
              </div>

              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Value in (Ether)
                </label>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  defaultValue={value}
                  onChange={onChangeValue}
                />
              </div>

              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Recipient (Address)
                </label>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  defaultValue={recipient}
                  onChange={onChangeRecipient}
                />
              </div>
            </div>
          </div>

          <button
            className="px-4 bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button"
            onClick={onSubmit}
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default RequestForm;
