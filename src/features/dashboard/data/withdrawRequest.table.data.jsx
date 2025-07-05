import { Eye } from "lucide-react";

export const useWithdrawRequestData = ({ setSingleRecord, setDrawer }) => {
  const columns = [
    {
      name: "Request ID",
      width: "10%",
      render: (row) => (
        <p className="w-full text-sm">{row?._id?.slice(0, 15)}</p>
      ),
    },
    {
      name: "Partner Name",
      width: "20%",
      render: (row) => <p className="w-full text-sm">{row?.user?.name}</p>,
    },
    {
      name: "Amount",
      width: "10%",
      render: (row) => <p className="w-full text-sm">{row?.money}</p>,
    },
    {
      name: "Payment method",
      width: "20%",
      render: (row) => <p className="w-full text-sm">{row?.paymnetBank}</p>,
    },
    {
      name: "UPI/Bank Details",
      width: "20%",
      render: (row) => (
        <p className="w-full text-sm">
          {row?.upiId} {row?.bankName} {row?.accountNumber}
        </p>
      ),
    },
    {
      name: "Status",
      width: "10%",
      render: (row) => {
        let bgColor = "";
        let textColor = "";

        switch (row.isPayed) {
          case true:
            bgColor = "bg-green-100";
            textColor = "text-green-700";
            break;
          case false:
            bgColor = "bg-yellow-100";
            textColor = "text-yellow-700";
            break;
          default:
            bgColor = "bg-yellow-100";
            textColor = "text-yellow-700";
        }

        return (
          <span
            className={`px-2 py-1 text-sm font-medium rounded-full ${bgColor} ${textColor}`}
          >
            {row.isPayed ? "Completed" : "Pending"}
          </span>
        );
      },
    },
    {
      name: "Action",
      width: "10%",
      render: (row) => (
        <p
          onClick={() => {
            setSingleRecord(row);
            setDrawer(true);
          }}
          className="w-full text-sm"
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
