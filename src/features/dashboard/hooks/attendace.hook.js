// hooks/useEmployeeAttendanceHook.js
import { useEffect, useState } from "react";
import { getPaginatedAttendance } from "../services/attendace.service";

const formatDate = (date) => date.toISOString().split("T")[0];

export const useEmployeeAttendanceHook = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ fromDate: "", toDate: "" });

  // Initial load: 1 year
  useEffect(() => {
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    setFilters({
      fromDate: formatDate(oneYearAgo),
      toDate: formatDate(today),
    });
  }, []);

  const fetchAttendance = async (page = currentPage) => {
    if (!filters.fromDate || !filters.toDate) return;

    setLoading(true);
    setError("");

    const res = await getPaginatedAttendance({
      from: filters.fromDate,
      todate: filters.toDate,
      page,
      limit: 10,
    });

    if (res.status) {
      setAttendanceData(res.records);
      setTotalPages(res.totalPages);
    } else {
      setError(res.error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAttendance(1); // whenever filters change, reset to page 1
  }, [filters]);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage);
    fetchAttendance(selectedPage);
  };

  const applyWeeklyView = () => {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 6);
    setFilters({
      fromDate: formatDate(lastWeek),
      toDate: formatDate(today),
    });
  };

  const applyMonthlyView = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    setFilters({
      fromDate: formatDate(startOfMonth),
      toDate: formatDate(today),
    });
  };

  return {
    attendanceData,
    loading,
    error,
    currentPage,
    totalPages,
    handlePageClick,
    applyWeeklyView,
    applyMonthlyView,
    filters,
  };
};
