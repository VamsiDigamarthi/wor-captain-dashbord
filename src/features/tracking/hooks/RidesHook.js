import { useEffect, useState } from "react";
import { API } from "../../../Core/url";

export const useRidesHook = () => {
  const [rides, setRides] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [activeRides, setActiveRides] = useState([]);

  const [selectedDate, setSelectedDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const filterOptions = ["all", "pending", "completed", "cancelled", "accept"];

  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);

  const formatDateForApi = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // Returns YYYY-MM-DD format
  };

  // console.log(selectedDate, "date");

  const fetchOrdersData = async () => {
    // setLoading(true);
    // setError(null);

    try {
      // Format the date for the API

      const startDate = formatDateForApi(selectedDate?.startDate);
      const endDate = formatDateForApi(selectedDate?.endDate);

      const response = await API.get(
        `/user-dashboard/orders?search=${searchText}&fromDate=${startDate}&toDate=${endDate}&status=${selectedFilter}&page=${page}`
      );

      console.log(response.data.orders, "RIDE DATA");

      if (response.status == 200) {
        setRides(response.data.orders);
        setTotalCount(response.data.pages);

        const activeRides = response.data.orders?.filter(
          // (e) => e.status == "accept"
          (e) => true
        );

        setActiveRides(activeRides);

        // setInitialOrderData(response.data.orders);
      } else {
        console.log(response);

        // setError(response.data.message || "Failed to fetch orders data");
      }
    } catch (err) {
      console.error("Error fetching orders data:", err);
    } finally {
      //   setLoading(false);
    }
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setPage(selectedPage); // 0-based
  };

  useEffect(() => {
    refreshData();
  }, [selectedDate, selectedFilter, page]); // Empty dependency array means this runs once on mount

  const refreshData = () => {
    fetchOrdersData(selectedDate);
  };

  return {
    setSearchText,
    searchText,
    setSelectedDate,
    selectedDate,
    filterOptions,
    rides,
    setSelectedFilter,
    page,
    setPage,
    totalCount,
    handlePageClick,
    activeRides,
  };
};
