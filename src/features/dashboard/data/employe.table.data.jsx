import { Eye } from "lucide-react";

export const useEmployeeListDataHook = ({
  setEmpDisDrawerOpen,
  setSingleEmp,
}) => {
  const columns = [
    {
      name: "Emp ID",
      width: "10%",
      render: (row) => <p className="w-full text-sm">{row?.userId}</p>,
    },
    {
      name: "Emp Name",
      width: "25%",
      render: (row) => <p className="w-full text-sm">{row?.userName}</p>,
    },
    {
      name: "Contact",
      width: "20%",
      render: (row) => (
        <div className="w-full flex flex-col items-start">
          <p className="text-sm">{row?.mobile}</p>
          <p className="text-sm">{row?.email}</p>
        </div>
      ),
    },
    {
      name: "Joining Date",
      width: "15%",
      render: (row) => (
        <p className="w-full text-sm">{row?.createdAt?.slice(0, 10)}</p>
      ),
    },
    {
      name: "Role",
      width: "17%",
      render: (row) => <p className="w-full text-sm">{row?.role}</p>,
    },
    {
      name: "Action",
      width: "3%",
      render: (row) => (
        <p
          onClick={() => {
            setEmpDisDrawerOpen(true);
            setSingleEmp(row);
          }}
          className="w-full"
        >
          <Eye />
        </p>
      ),
    },
  ];

  return {
    columns,
  };
};
