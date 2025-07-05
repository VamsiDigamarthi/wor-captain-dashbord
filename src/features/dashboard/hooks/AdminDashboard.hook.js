import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorUserSlice } from "../../../Redux/slice/worUsersSlice";

export const useAdminDashboardHook = () => {
  const dispatch = useDispatch();
  // const { data } = useSelector((state) => state.profile);

  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0); // 0-based for UI
  const [dateFilter, setDateFilter] = useState({
    fromDate: null,
    toDate: null,
  });
  const [filter, setFilter] = useState(null);

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

  const handleChangeFilter = (txt) => {
    console.log("txt", txt);

    if (txt === "Verified Partner") {
      setFilter(true);
    } else if (txt === "Not Verified") {
      setFilter(false);
    } else if (txt === "All Users") {
      setFilter(null);
    }
  };

  const fetchWorUsers = async ({
    page = 1,
    search = "",
    fromDate,
    toDate,
    userVerified,
  }) => {
    dispatch(
      fetchWorUserSlice({
        page,
        limit: 10,
        search,
        fromDate: fromDate ? fromDate.toISOString() : "",
        toDate: toDate ? toDate.toISOString() : "",
        userVerified,
        // role: data?.whichType || "captain",
      })
    );
  };

  useEffect(() => {
    fetchWorUsers({
      page: currentPage + 1,
      search: debouncedSearchText,
      fromDate: dateFilter.fromDate,
      toDate: dateFilter.toDate,
      userVerified: filter,
    });
  }, [debouncedSearchText, currentPage, dateFilter, filter]);

  return {
    searchContact,
    handlePageClick,
    searchText,
    currentPage,
    dateRange,
    handleChangeFilter,
  };
};
