import { ThreeDots } from "react-loader-spinner";

const Loader = ({ isPreloading }) => {
  return (
    <div className="Loader">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#3f51b5"
        ariaLabel="three-dots-loading"
        visible={isPreloading}
      />
    </div>
  );
};

export default Loader;
