import { CheckCircle, Clock, Moon } from "lucide-react";
import ReusableCard from "../../../utils/ReusableCard";
import DailyLoginCard from "../../../utils/DailyLoginCard";
import TimeSheetFilterCard from "../components/TimeSheetFilterCard";
import { useAttendanceTableData } from "../data/attendace.table.data";
import { useEmployeeAttendanceHook } from "../hooks/attendace.hook";
import StatusWrapper from "../../../utils/StatusWrapper";
import Table from "../../../utils/Table/Table";

const AttendaceScreen = () => {
  const {
    attendanceData,
    loading,
    error,
    currentPage,
    totalPages,
    handlePageClick,
    applyWeeklyView,
    applyMonthlyView,
    filters,
  } = useEmployeeAttendanceHook();
  const { columns } = useAttendanceTableData();

  const handleViewChange = (view) => {
    if (view === "weekly") applyWeeklyView();
    if (view === "monthly") applyMonthlyView();
  };
  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        {/* <ReusableCard
          title="Total Hours"
          heading="26h 00m"
          iconColor={"black"}
          Icon={Clock}
          greenText="26hrs Total Week"
          iconbg={"bg-[#DBEAFE]"}
        />
        <ReusableCard
          title="Over Time"
          iconbg={"bg-[#EDE9FE]"}
          heading="10h 06m"
          greenText="10%hrs This Week"
          iconColor={"black"}
          Icon={Moon}
        />
        <ReusableCard
          title="Leave Days"
          heading="2 days"
          Icon={CheckCircle}
          iconColor={"green"}
          greenText="This Month"
          iconbg={"bg-[#ECFDF5]"}
        /> */}

        <DailyLoginCard />
      </div>
      <TimeSheetFilterCard filters={filters} onViewChange={handleViewChange} />
      <StatusWrapper error={error} loading={loading}>
        {attendanceData?.length > 0 ? (
          <Table
            columns={columns}
            data={attendanceData}
            handlePageClick={handlePageClick}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        ) : (
          <div className="w-full flex justify-center items-center h-[300px]">
            <span className="text-xl">Data not found</span>
          </div>
        )}
      </StatusWrapper>
    </>
  );
};

export default AttendaceScreen;
