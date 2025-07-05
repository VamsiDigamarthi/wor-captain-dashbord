import { useSelector } from "react-redux";
import FilterMain from "../../../utils/FiltersMain";
import Table from "../../../utils/Table/Table";
import AdminDashCounts from "../components/AdminDashCounts";
import CaptainDetailsCard from "../components/CaptainDetailsCard";
import { useDashboardTableData } from "../data/dashboard.table.data";
import { useAdminDashboardHook } from "../hooks/AdminDashboard.hook";
import StatusWrapper from "../../../utils/StatusWrapper";
import { useEffect, useState } from "react";
import { filterOptions } from "../../../utils/FilterCard";

const PartnerListScreen = () => {
  const { loading, users, pages, error } = useSelector(
    (state) => state.worUsers
  );

  const {
    searchContact,
    handlePageClick,
    searchText,
    currentPage,
    dateRange,
    handleChangeFilter,
  } = useAdminDashboardHook();

  const [singleUser, setSingleUser] = useState(null);
  useEffect(() => {
    setSingleUser(users?.[0]);
  }, [users]);

  const { colums } = useDashboardTableData({ setSingleUser });
  return (
    <>
      <AdminDashCounts />
      <FilterMain
        setSearchText={searchContact}
        searchText={searchText}
        dateRange={dateRange}
        filterOptions={filterOptions}
        handleChangeFilter={handleChangeFilter}
      />
      <div className="w-full flex items-start gap-4">
        <div className="w-[60%] overflow-x-scroll">
          <div className="w-[1400px]">
            <StatusWrapper error={error} loading={loading}>
              <Table
                columns={colums}
                data={users}
                handlePageClick={handlePageClick}
                currentPage={currentPage}
                totalPages={pages}
              />
            </StatusWrapper>
          </div>
        </div>
        <div className="w-[40%]">
          <CaptainDetailsCard singleUser={singleUser} />
        </div>
      </div>
    </>
  );
};

export default PartnerListScreen;
