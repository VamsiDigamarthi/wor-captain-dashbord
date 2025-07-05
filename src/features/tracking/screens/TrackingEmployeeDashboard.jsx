import { Bell, Bike, Users } from "lucide-react";
import ReusableCard from "../../../utils/ReusableCard";
import DailyLoginCard from "../../../utils/DailyLoginCard";
import { useRidesHook } from "../hooks/RidesHook";
import FilterMain from "../../../utils/FiltersMain";
import Table from "../../../utils/Table/Table";
import { RideTableData } from "../data/RidesTableData";

const TrackingEmployeeDashboard = () => {
  const {
    setSearchText,
    setSelectedFilter,
    searchText,
    filterOptions,
    setSelectedDate,
    rides,
    page,
    handlePageClick,
    totalCount,
    activeRides,
  } = useRidesHook();

  const { columns } = RideTableData();
  return (
    <>
      <div className="grid grid-cols-4 gap-3">
        <ReusableCard
          title="Active Rides"
          heading={activeRides.length}
          Icon={Bike}
          iconColor={"#2563EB"}
          iconbg={"bg-[#DBEAFE]"}
          greenText="12% from last hour"
        />
        {/* <ReusableCard
          title="Active Users"
          heading="14"
          Icon={Users}
          iconColor={"#9333EA"}
          iconbg={"bg-[#F3E8FF]"}
          greenText="8% from last hour"
        /> */}
        {/* <ReusableCard
          title="Emergency Alerts"
          heading="872  "
          Icon={Bell}
          iconColor={"#DC2626"}
          iconbg={"bg-[#FEE2E2]"}
          greenText="8% from last hour"
        /> */}

        <DailyLoginCard />
      </div>

      <FilterMain
        setSearchText={setSearchText}
        searchText={searchText}
        dateRange={setSelectedDate}
        filterOptions={filterOptions}
        handleChangeFilter={setSelectedFilter}
      />

      <Table
        currentPage={page}
        totalPages={totalCount}
        columns={columns}
        data={rides}
        handlePageClick={handlePageClick}
      />
    </>
  );
};

export default TrackingEmployeeDashboard;
