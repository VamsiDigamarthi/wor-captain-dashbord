import { getCardData } from "../data/dashboard.data";
import ReusableCard from "../../../utils/ReusableCard";
import { Users } from "lucide-react";
import { useSelector } from "react-redux";

const AdminDashCounts = () => {
  const { totalCount, todaySignUpCount } = useSelector(
    (state) => state.worUsers
  );
  const carddata = getCardData({
    totalUsers: totalCount,
    newUsersToday: todaySignUpCount,
  });
  return (
    <div className="w-full flex flex-wrap gap-4 justify-between items-center">
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

export default AdminDashCounts;
