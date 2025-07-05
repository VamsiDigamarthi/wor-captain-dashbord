import AdminDashCounts from "../components/AdminDashCounts";
import FilterMain from "../../../utils/FiltersMain";
import { useAdminDashboardHook } from "../hooks/AdminDashboard.hook";
import { useEffect, useState } from "react";
import { useDashboardTableData } from "../data/dashboard.table.data";
import StatusWrapper from "../../../utils/StatusWrapper";
import Table from "../../../utils/Table/Table";
import { useSelector } from "react-redux";
import { filterOptions } from "../../../utils/FilterCard";
import { useNavigate } from "react-router-dom";

const DashboardScreen = () => {
  const navigate = useNavigate();
  let role = localStorage.getItem("role");
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

  useEffect(() => {
    if (role == "monitoring") {
      navigate("/tracking-employee/");
    } else if (role === "verificationTeam") {
      navigate("/");
    } else if (role === "manager") {
      navigate("/");
    } else if (role === "support") {
      navigate("/call-employee");
    }
  }, [role]);

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
      <div className="w-[100%] h-[500px] overflow-x-scroll">
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
    </>
  );
};

export default DashboardScreen;
