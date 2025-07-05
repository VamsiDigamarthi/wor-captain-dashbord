export const usePaymentIssueDataHook = () => {
  const column = [
    {
      name: "User Name",
      width: "20%",
      render: (row) => (
        <div className="w-full flex gap-0.5 items-center">
          <span className="w-[40px] h-[40px] bg-gray-100 rounded-full"></span>
          <div className="flex flex-col ">
            <span className="text-base">{row?.name?.slice(0, 27)}</span>
            <span className="text-[10px] text-gray-600">
              {" "}
              #{row?._id?.slice(0, 10)}
            </span>
          </div>
        </div>
      ),
    },
    {
      name: "Mobile Number",
      width: "15%",
      render: (row) => <span>{row?.mobile}</span>,
    },
    {
      name: "Transaction ID",
      width: "15%",
      render: (row) => <p> #49080480</p>,
    },
    {
      name: "Payment Method",
      width: "15%",
      render: (row) => <div>Net banking</div>,
    },
    {
      name: "Description",
      width: "25%",
      render: (row) => (
        <p>
          {" "}
          Payment was deducted but order shows as failed. The amount has not
          been refunded to my account yet.
        </p>
      ),
    },
    {
      name: "Status",
      width: "10%",
      render: (row) => <p></p>,
    },
  ];

  return {
    column,
  };
};
