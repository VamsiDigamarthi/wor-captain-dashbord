import ClipLoader from "react-spinners/ClipLoader";

const StatusWrapper = ({ loading, error, data, children }) => {
  if (loading) {
    return (
      <div className="w-full h-[300px] bg-white flex justify-center items-center rounded-md">
        <ClipLoader color="#E60023" size={30} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[300px] bg-white flex justify-center items-center rounded-md text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  if (Array.isArray(data) && data.length === 0) {
    return (
      <div className="w-full h-[300px] bg-white flex justify-center items-center rounded-md text-gray-500 font-medium">
        No data found
      </div>
    );
  }

  return <>{children}</>;
};

export default StatusWrapper;
