/* eslint-disable */
import { useState } from "react";
// import { getStorage, ref, uploadBytes } from "firebase/storage";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../../firebase";

import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
// import CardSettings from "../Cards/CardSettings";

/* Import components */
import Alerts from "../Badge/Alerts";

const CampaignCreationForm = () => {
  // const fileInputRef = React.useRef(null);
  const [minimumContribution, setMinimumContribution] = useState<number>(1000);
  const [campaignName, setCampaignName] = useState<string>("");
  const [campaignDesc, setCampaignDesc] = useState<string>("");
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState<string>("");
  // const [progresspercent, setProgresspercent] = useState(0);
  const [file, setFile] = useState<File | null>(null);

  const onChangeMinimumContribution = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMinimumContribution(Number(e.target.value));
  };

  const onChangeCampaignName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCampaignName(e.target.value);
  };

  const onChangeCampaignDes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCampaignDesc(e.target.value);
  };

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUploadDataToDB = ({
    name,
    description,
    minContribution,
  }: {
    name: string;
    description: string;
    minContribution: number;
  }) => {
    // e.preventDefault()
    if (file) {
      if (!file) return;

      const storageRef = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // setProgresspercent(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // setImgUrl(downloadURL);
            // firestore.collection("files").add({
            //   name: file.name,
            //   url: downloadURL,
            //   createdAt: new Date(),
            // });
            const docRef = addDoc(collection(db, "campaign"), {
              name,
              description,
              minContribution: `${minContribution} WEI`,
              fileName: file.name,
              fileURL: downloadURL,
              createdAt: new Date(),
            });
            console.log(
              "🚀 ~ file: CampaignCreationForm.tsx:93 ~ docRef ~ docRef:",
              docRef
            );
          });
        }
      );
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (minimumContribution < 0) {
      return;
    }

    // Creating a campaign
    const accounts = await web3.eth.getAccounts();

    try {
      const request = await factory.methods
        .createCampaign(minimumContribution)
        .send({
          from: accounts[0],
          gas: "1000000",
        });
      console.log(
        "🚀 ~ file: CampaignCreationForm.tsx:119 ~ onSubmit ~ request:",
        request
      );
      if (request) {
        setSuccessMsg("Create a request sucessfully");
        handleUploadDataToDB({
          name: campaignName,
          description: campaignDesc,
          minContribution: minimumContribution,
        });
      }
    } catch (error: any) {
      console.log(
        "🚀 ~ file: CampaignCreationForm.tsx:85 ~ onSubmit ~ error:",
        error
      );
      setError(error.message);
    }
  };

  return (
    <>
      {/* <div className="flex flex-wrap h-[100vh]">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            
            
          </div>
        </div>
      </div> */}
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div className="text-center flex justify-between">
          <h6 className="text-blueGray-700 text-xl font-bold">
            Create a new campaign
          </h6>
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
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Campaign name
                </label>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="campaign name"
                  onChange={onChangeCampaignName}
                  required
                />
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Campaign image
                </label>
                <input
                  type="file"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  // defaultValue="Upload image"
                  // value=""
                  onChange={onChangeFile}
                  // ref={fileInputRef}
                />
              </div>
            </div>
            <div className="w-full px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Minimum Contribution (Wei)
                </label>
                <input
                  type="number"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  defaultValue={minimumContribution}
                  onChange={onChangeMinimumContribution}
                  placeholder="1000"
                  required
                />
              </div>
            </div>
            <div className="w-full lg:w-12/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Description
                </label>
                <textarea
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="description"
                  rows={7}
                  onChange={onChangeCampaignDes}
                  required
                ></textarea>
              </div>
            </div>
          </div>

          <button
            className="px-4 bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button"
            onClick={onSubmit}
          >
            Create Campaign
          </button>
        </form>
      </div>
    </>
  );
};

export default CampaignCreationForm;
