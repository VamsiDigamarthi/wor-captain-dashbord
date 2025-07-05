import { Plus } from "lucide-react";
import FilterMain from "../../../utils/FiltersMain";
import { useEmployeeListDataHook } from "../data/employe.table.data";
import { useEmployeeListHook } from "../hooks/employee.hook";
import Table from "../../../utils/Table/Table";
import RightDrawer from "../../../utils/RightDrawer";
import SingleEmpDisplay from "../components/SingleEmpDisplay";
import AdminEmpAdded from "../components/AdminEmpAdded";
import StatusWrapper from "../../../utils/StatusWrapper";

const AddEmployeScreen = () => {
  const {
    empDisdrawerOpen,
    setEmpDisDrawerOpen,
    singleEmp,
    setSingleEmp,
    addEmpDrawer,
    setAddEmpDrawer,
    empList,
    getEmployees,
    loading,
    error,
    //
    searchContact,
    handlePageClick,
    setSearchText,
    searchText,
    currentPage,
    dateRange,
    totalPage,
    deleteEmployee,
  } = useEmployeeListHook();

  const { columns } = useEmployeeListDataHook({
    setEmpDisDrawerOpen,
    setSingleEmp,
  });

  return (
    <>
      <FilterMain
        title="Employee List"
        btnText="Add Employee"
        Icon={Plus}
        donwOrAddFun={() => setAddEmpDrawer(true)}
        setSearchText={searchContact}
        searchText={searchText}
        dateRange={dateRange}
      />
      <StatusWrapper loading={loading} error={error}>
        {empList?.length ? (
          <Table
            columns={columns}
            data={empList}
            handlePageClick={handlePageClick}
            currentPage={currentPage}
            totalPages={totalPage}
          />
        ) : (
          <div className="w-full h-[400px] flex justify-center items-center">
            <span>No Data</span>
          </div>
        )}
      </StatusWrapper>
      <RightDrawer
        isOpen={empDisdrawerOpen}
        onClose={() => setEmpDisDrawerOpen(false)}
      >
        <SingleEmpDisplay
          emp={singleEmp}
          deleteEmployee={deleteEmployee}
          setIsDrawer={setEmpDisDrawerOpen}
          getEmployees={getEmployees}
        />
      </RightDrawer>
      <RightDrawer isOpen={addEmpDrawer} onClose={() => setAddEmpDrawer(false)}>
        <AdminEmpAdded
          getEmployees={getEmployees}
          setIsDrawer={setAddEmpDrawer}
        />
      </RightDrawer>
    </>
  );
};

export default AddEmployeScreen;
