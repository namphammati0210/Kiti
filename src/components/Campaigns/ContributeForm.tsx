import { useState } from "react";

import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import { useNavigate } from "react-router-dom";

/* Import components */
import Alerts from "../Badge/Alerts";

interface IProps {
  address: string | undefined;
}

const ContributeForm = ({ address = "" }: IProps) => {
  const navigate = useNavigate();
  const [contribution, setContribution] = useState("");
  const [error, setError] = useState(null);

  const onChangeContribution = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContribution(e.target.value);
  };

  const onSubmit = async () => {
    try {
      const campaign = Campaign(address);

      // if (contribution > 0) {
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(contribution, "ether"),
      });

      // Refesh page after contribute
      navigate(0);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {error && <Alerts variant="error" message={error} />}
      <label
        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
        htmlFor="grid-password"
      >
        Contribution (ETH)
      </label>
      <div className="flex w-full gap-2">
        <input
          type="number"
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          defaultValue={contribution}
          onChange={onChangeContribution}
        />
        <button
          className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="button"
          onClick={onSubmit}
        >
          Contribute
        </button>
      </div>
    </div>
  );
};

export default ContributeForm;
