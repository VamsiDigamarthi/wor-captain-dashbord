import { ArrowRight, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const TicketTableDataHook = () => {
  const navigate = useNavigate();

  const columns = [
    {
      name: "Ticket ID",
      width: "20%",
      render: (row) => (
        <div className="w-full  gap-0.5 items-center">
          <p>{row._id}</p>
        </div>
      ),
    },
    {
      name: "Passenger name",
      width: "20%",
      render: (row) => (
        <div className="w-full  gap-0.5 items-center">
          <p>{row.userName}</p>
        </div>
      ),
    },
    {
      name: "Created Date",
      width: "20%",
      render: (row) => (
        <div className="w-full  gap-0.5 items-center">
          <p>{row.createdAt}</p>
        </div>
      ),
    },
    {
      name: "Issue Type",
      width: "20%",
      render: (row) => (
        <div className="w-full  gap-0.5 items-center">
          <p>{row.issueType}</p>
        </div>
      ),
    },
    {
      name: "Status",
      width: "20%",
      render: (row) => (
        <div className="w-full  gap-0.5 items-center">
          <p>{row.status}</p>
        </div>
      ),
    },
    {
      name: "Actions",
      width: "10%",
      render: (row) => (
        <button
          //   onClick={() =>
          //     navigate("/tracking-employee/ride-tracking", {
          //       state: {
          //         data: row,
          //       },
          //     })
          //   }
          className="w-full  gap-0.5 items-center"
        >
          <Eye />
        </button>
      ),
    },
  ];

  const dummyData = [
    {
      _id: "TKT001",
      userName: "John Smith",
      createdAt: "2025-01-15 10:30 AM",
      issueType: "Payment Issue",
      status: "Open",
    },
    {
      _id: "TKT002",
      userName: "Sarah Johnson",
      createdAt: "2025-01-14 02:15 PM",
      issueType: "Booking Problem",
      status: "In Progress",
    },
    {
      _id: "TKT003",
      userName: "Michael Brown",
      createdAt: "2025-01-13 09:45 AM",
      issueType: "Refund Request",
      status: "Resolved",
    },
    {
      _id: "TKT004",
      userName: "Emily Davis",
      createdAt: "2025-01-12 04:20 PM",
      issueType: "Technical Issue",
      status: "Open",
    },
    {
      _id: "TKT005",
      userName: "David Wilson",
      createdAt: "2025-01-11 11:00 AM",
      issueType: "Cancellation",
      status: "Closed",
    },
    {
      _id: "TKT006",
      userName: "Lisa Anderson",
      createdAt: "2025-01-10 08:30 AM",
      issueType: "Schedule Change",
      status: "In Progress",
    },
    {
      _id: "TKT007",
      userName: "Robert Taylor",
      createdAt: "2025-01-09 01:45 PM",
      issueType: "Lost Ticket",
      status: "Open",
    },
    {
      _id: "TKT008",
      userName: "Jennifer Martinez",
      createdAt: "2025-01-08 03:10 PM",
      issueType: "Seat Assignment",
      status: "Resolved",
    },
    {
      _id: "TKT009",
      userName: "Christopher Lee",
      createdAt: "2025-01-07 12:25 PM",
      issueType: "Baggage Issue",
      status: "In Progress",
    },
    {
      _id: "TKT010",
      userName: "Amanda White",
      createdAt: "2025-01-06 05:50 PM",
      issueType: "Customer Service",
      status: "Closed",
    },
  ];

  return {
    columns,
    dummyData,
  };
};
