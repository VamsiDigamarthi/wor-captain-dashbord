import FilterMain from "../../../utils/FiltersMain";
import StatusWrapper from "../../../utils/StatusWrapper";
import Table from "../../../utils/Table/Table";
import PaymentIssuseCount from "../components/PaymentIssuseCount";
import { usePaymentIssueDataHook } from "../hooks/paymentIssuse.table.data";

const PaymentIssuse = () => {
  const { column } = usePaymentIssueDataHook();
  return (
    <>
      <PaymentIssuseCount />
      <FilterMain />
      <StatusWrapper loading={false} error={""}>
        <Table columns={column} />
      </StatusWrapper>
    </>
  );
};

export default PaymentIssuse;
