import { ArrowRight, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const RideTableData = () => {
  // const navigate = useNavigate();

  const columns = [
    {
      name: "Passenger Name",
      width: "20%",
      render: (row) => (
        <div className="w-full flex gap-0.5 items-center">
          <span className="w-[40px] h-[40px] bg-gray-100 rounded-full"></span>
          <div className="flex flex-col ">
            <span className="text-base">{row?.head?.name?.slice(0, 27)}</span>
            <span className="text-[10px] text-gray-600">
              {" "}
              #{row?.head?._id?.slice(0, 10)}
            </span>
          </div>
        </div>
      ),
    },
    {
      name: "Partner Name",
      width: "20%",
      render: (row) => (
        <div className="w-full flex gap-0.5 items-center">
          <span className="w-[40px] h-[40px] bg-gray-100 rounded-full"></span>
          <div className="flex flex-col ">
            <span className="text-base">
              {row?.acceptCaptain?.name?.slice(0, 27)}
            </span>
            <span className="text-[10px] text-gray-600">
              {" "}
              #{row?.acceptCaptain?._id?.slice(0, 10)}
            </span>
          </div>
        </div>
      ),
    },
    {
      name: "Route",
      width: "40%",
      render: (row) => (
        <div className="w-full flex gap-0.5 items-center">
          <p>{row.pickupAddress?.slice(0, 25)}</p>
          <ArrowRight />
          <p>{row.dropAddress?.slice(0, 25)}</p>
        </div>
      ),
    },
    {
      name: "Duration",
      width: "10%",
      render: (row) => (
        <div className="w-full  gap-0.5 items-center">
          <p>{row.started}</p>
          <p>24 min</p>
        </div>
      ),
    },
    {
      name: "Status",
      width: "10%",
      render: (row) => {
        const statusStyles = {
          accepted: "bg-green-100 text-green-700",
          completed: "bg-blue-100 text-blue-700",
          pending: "bg-yellow-100 text-yellow-700",
          cancelled: "bg-red-100 text-red-700",
        };

        const defaultStyle = "bg-gray-100 text-gray-700";
        const currentStyle =
          statusStyles[row.status?.toLowerCase()] || defaultStyle;

        return (
          <div className="w-full flex items-center justify-center">
            <span
              className={`text-sm -ml-5 px-3 py-1 rounded-full font-medium ${currentStyle}`}
            >
              {row.status}
            </span>
          </div>
        );
      },
    },
    // {
    //   name: "Actions",
    //   width: "10%",
    //   render: (row) => (
    //     <button
    //       // onClick={() =>
    //       //   navigate("/tracking-employee/ride-tracking", {
    //       //     state: {
    //       //       data: row,
    //       //     },
    //       //   })
    //       // }
    //       className="w-full  gap-0.5 items-center"
    //     >
    //       <Eye />
    //     </button>
    //   ),
    // },
  ];

  return {
    columns,
  };
};
