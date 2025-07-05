export const useAttendanceTableData = () => {
  const columns = [
    {
      name: "Day/Date",
      width: "20%",
      render: (row) => (
        <div className="flex flex-col">
          <p className="font-semibold">{row.day}</p>
          <p className="font-light text-xs">{row.date}</p>
        </div>
      ),
    },
    {
      name: "Clock In",
      width: "20%",
      render: (row) => <p>{row.checkIn}</p>,
    },
    {
      name: "Clock Out",
      width: "20%",
      render: (row) => <p>{row.checkOut}</p>,
    },
    {
      name: "Total Hours",
      width: "20%",
      render: (row) => <p>{row.totalHours}</p>,
    },
    {
      name: "Overtime",
      width: "20%",
      render: (row) => <p>{row.overTime}</p>,
    },
  ];

  return {
    columns,
  };
};
