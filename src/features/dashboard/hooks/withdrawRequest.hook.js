import { useEffect, useState } from "react";
import { withdrawsApi } from "../services/withdraws.service";

export const useWithdrawRequestHook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [widthdraws, setWithdraws] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage); // 0-based
  };

  const searchContact = (text) => {
    setSearchText(text);
    setCurrentPage(0); // reset to first page on new search
  };

  const fetchWidthDraws = async ({ page = 1 }) => {
    setLoading(true);
    const data = await withdrawsApi({ page });
    if (data?.status) {
      setWithdraws(data?.apiData?.withdrawData);
      setTotalPage(data?.apiData?.totalPage);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWidthDraws({ page: currentPage + 1 });
  }, [currentPage]);

  return {
    totalPage,
    loading,
    error,
    widthdraws,
    handlePageClick,
    currentPage,
    fetchWidthDraws,
  };
};
