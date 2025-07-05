import { Users } from "lucide-react";
import { verificationPaymentIssue } from "../data/verificationPaymentIssue.data.hook";
import ReusableCard from "../../../utils/ReusableCard";

const PaymentIssuseCount = () => {
  const carddata = verificationPaymentIssue({
    issueCount: 0,
  });

  return (
    <div className="w-full flex flex-wrap gap-2 justify-between items-center">
      {carddata?.map((each, index) => (
        <ReusableCard
          key={index}
          title={each?.titile}
          heading={each?.heading}
          iconColor={"#3B82F6"}
          Icon={Users}
          iconbg={"bg-[#EFF6FF]"}
        />
      ))}
    </div>
  );
};

export default PaymentIssuseCount;
