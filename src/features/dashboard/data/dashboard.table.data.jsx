export const useDashboardTableData = ({ setSingleUser }) => {
  const colums = [
    {
      name: "User Name",
      width: "20%",
      render: (row) => <p onClick={() => setSingleUser(row)}>{row?.name}</p>,
    },
    {
      name: "Contact",
      width: "20%",
      render: (row) => (
        <div className="w-full flex flex-col gap-0.5">
          <p>{row?.mobile}</p>
          <p>{row?.email}</p>
        </div>
      ),
    },
    {
      name: "Vehicle Info",
      width: "10%",
      render: (row) => (
        <p className="w-full flex flex-col gap-0.5">
          {row?.services?.[0]?.rcNumber}
        </p>
      ),
    },
    {
      name: "Signup Date",
      width: "10%",
      render: (row) => <p className="w-full">{row.createdAt?.slice(0, 10)}</p>,
    },
    { name: "Ride rate", width: "10%", render: (row) => <p>20</p> },
    { name: "Earnings", width: "10%", render: (row) => <p>300</p> },
    {
      name: "Verified",
      width: "10%",
      render: (row) => (
        <p>{row?.userVerified ? "✅ Verified" : "❌ Not Verified"}</p>
      ),
    },
    {
      name: "Status",
      width: "10%",
      render: (row) => {
        let bgColor = "";
        let textColor = "";

        switch (row.status) {
          case "Active":
            bgColor = "bg-green-100";
            textColor = "text-green-700";
            break;
          case "In-Active":
            bgColor = "bg-yellow-100";
            textColor = "text-yellow-700";
            break;
          case "Pending":
            bgColor = "bg-blue-100";
            textColor = "text-blue-700";
            break;
          case "Block":
            bgColor = "bg-red-100";
            textColor = "text-red-700";
            break;
          default:
            bgColor = "bg-gray-100";
            textColor = "text-gray-700";
        }

        return (
          <span
            className={`px-2 py-1 text-sm font-medium rounded-full ${bgColor} ${textColor}`}
          >
            {row.status}
          </span>
        );
      },
    },
  ];

  return {
    colums,
  };
};
