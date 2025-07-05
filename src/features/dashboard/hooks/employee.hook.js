import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { API } from "../../../Core/url";
import { ShowError, SuccessFully } from "../../../Core/Toast";

export const useEmployeeListHook = () => {
  const token = localStorage.getItem("token");
  const [empDisdrawerOpen, setEmpDisDrawerOpen] = useState(false);
  const [singleEmp, setSingleEmp] = useState(null);
  const [addEmpDrawer, setAddEmpDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [empList, setEmpList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [dateFilter, setDateFilter] = useState({
    fromDate: null,
    toDate: null,
  });

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage); // 0-based
  };

  const searchContact = (text) => {
    setSearchText(text);
    setCurrentPage(0); // reset to first page on new search
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText]);

  const dateRange = (range) => {
    const from = range.startDate;
    const to = range.endDate;
    setDateFilter({
      fromDate: from,
      toDate: to,
    });
    setCurrentPage(0);
  };

  const getEmployees = async ({ page = 1, search = "", fromDate, toDate }) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit: 10,
      });

      if (search) params.append("search", search);
      if (fromDate) params.append("fromDate", fromDate.toISOString());
      if (toDate) params.append("toDate", toDate.toISOString());

      const resp = await API.get(`/manager/employee?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("..", resp.data);

      setEmpList(resp.data?.data);
      setTotalPage(resp.data?.totalPages);
    } catch (error) {
      if (isAxiosError(error)) {
        ShowError(error.response.data.message);
        setLoading(error.response.data.message || "Something Went Wrong");
      } else {
        ShowError(error.message || "Something Went Wrong");
        setLoading(error.message || "Something Went Wrong");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getEmployees({
      page: currentPage + 1,
      search: debouncedSearchText,
      fromDate: dateFilter.fromDate,
      toDate: dateFilter.toDate,
    });
  }, [debouncedSearchText, currentPage, dateFilter]);

  const deleteEmployee = async (id) => {
    try {
      const resp = await API.delete(`/auth/delete-employee/${id}`);

      if (resp.status == 200) {
        SuccessFully("Deleted Employee Successfully");
        getEmployees({ page: 1 });
      }
    } catch (error) {
      if (isAxiosError(error)) {
        ShowError(
          error?.response?.data ||
            error?.response?.data?.message ||
            "Something Went wrong"
        );
      } else {
        ShowError(error?.message);
      }
    }
  };

  return {
    empDisdrawerOpen,
    setEmpDisDrawerOpen,
    singleEmp,
    setSingleEmp,
    addEmpDrawer,
    empList,
    setAddEmpDrawer,
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
  };
};
