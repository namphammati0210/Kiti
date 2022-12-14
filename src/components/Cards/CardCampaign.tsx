import { Link } from "react-router-dom";

interface IProps {
  campaignName: string;
  manager: string;
  date?: string;
}

const CardCampaign = ({ campaignName, manager }: IProps) => {
  return (
    <div className="my-1 px-1  md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      <article className="overflow-hidden rounded-lg shadow-lg">
        <img
          alt="Placeholder"
          className="block h-auto w-full"
          src="https://picsum.photos/600/400/?random"
        />

        <header className="flex items-center justify-between leading-tight p-2 md:p-4">
          <h1 className="text-lg w-[200px] truncate">{campaignName}</h1>
          <p className="text-grey-darker text-sm">11/1/19</p>
        </header>

        <footer className="flex items-center justify-between leading-none p-2 md:p-4">
          <img
            alt="Placeholder"
            className="block rounded-full"
            src="https://picsum.photos/32/32/?random"
          />
          <p className="ml-2 text-sm">Manager: {manager}</p>

          {/* <span className="hidden">Like</span>
            <i className="fa fa-heart"></i> */}
          <button
            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button"
          >
            <Link to={`campaign/${campaignName}`}>View more</Link>
          </button>
        </footer>
      </article>
    </div>
  );
};

export default CardCampaign;
