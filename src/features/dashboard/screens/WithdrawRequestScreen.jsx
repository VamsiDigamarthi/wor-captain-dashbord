import { useState } from "react";
import StatusWrapper from "../../../utils/StatusWrapper";
import Table from "../../../utils/Table/Table";
import WithdrawFilter from "../components/WithdrawFilter";
import { useWithdrawRequestData } from "../data/withdrawRequest.table.data";
import { useWithdrawRequestHook } from "../hooks/withdrawRequest.hook";
import RightDrawer from "../../../utils/RightDrawer";
import WithdrawDrawer from "../components/WithdrawDrawer";

const WithdrawRequestScreen = () => {
  const {
    totalPage,
    loading,
    error,
    widthdraws,
    handlePageClick,
    currentPage,
    fetchWidthDraws,
  } = useWithdrawRequestHook();

  const [drawer, setDrawer] = useState(false);
  const [singleRecord, setSingleRecord] = useState(null);

  const { columns } = useWithdrawRequestData({ setSingleRecord, setDrawer });

  return (
    <>
      {/* <WithdrawFilter /> */}
      <StatusWrapper error={error} loading={loading}>
        <Table
          columns={columns}
          data={widthdraws}
          handlePageClick={handlePageClick}
          currentPage={currentPage}
          totalPages={totalPage}
        />
      </StatusWrapper>
      <RightDrawer isOpen={drawer} onClose={() => setDrawer(false)}>
        <WithdrawDrawer
          singleRecord={singleRecord}
          setDrawer={setDrawer}
          fetchWidthDraws={fetchWidthDraws}
        />
      </RightDrawer>
    </>
  );
};

export default WithdrawRequestScreen;
