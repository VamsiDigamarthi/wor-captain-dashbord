import { Delete, LucideBlocks, Trash, X } from "lucide-react";

const SingleEmpDisplay = ({ setIsDrawer, emp, deleteEmployee }) => {
  return (
    <div className="w-full h-full  flex flex-col gap-2 relative">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Employees Detail</h2>
        <X className="cursor-pointer" onClick={() => setIsDrawer(false)} />
      </div>
      <div className="flex flex-col gap-2">
        <DisplayInput lable="Full Name" value={emp?.userName} />
        <DisplayInput lable="Email Address" value={emp?.email} />
        <DisplayInput lable="Mobile Number" value={emp?.mobile} />
        <DisplayInput lable="Role" value={emp?.role} />
        {/* <DisplayInput lable="Username" /> */}
      </div>
      <div className="absolute bottom-2 right-2 w-full flex justify-end items-end gap-2">
        <button
          onClick={() => deleteEmployee(emp._id)}
          className="w-[150px] h-[45px]  rounded-md flex justify-center items-center gap-2 cursor-pointer bg-[#FF0000] text-white"
        >
          <Trash />
          Delete User
        </button>
        {/* <button
          onClick={() => blockEmp(emp._id)}
          className="w-[150px] h-[45px] rounded-md flex justify-center items-center gap-2 bg-[#FF0000] text-white"
        >
          <LucideBlocks />
          Block User
        </button> */}
      </div>
    </div>
  );
};

export default SingleEmpDisplay;

export const DisplayInput = ({ lable, value, height = "h-[40px]" }) => (
  <div className="w-full flex flex-col gap-0.5">
    <span className="text-[12px] text-gray-600">{lable}</span>
    <span
      className={`w-full ${height} border border-[#E5E7EB] bg-white rounded-md px-2 flex justify-start items-center`}
    >
      {value}
    </span>
  </div>
);
