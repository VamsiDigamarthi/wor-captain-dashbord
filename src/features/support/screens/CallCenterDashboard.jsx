import { ArrowUp, Hourglass, Ticket, UserPlus } from "lucide-react";
import { TicketTableDataHook } from "../data/TicketTableData.hook";
import ReusableCard from "../../../utils/ReusableCard";
import Table from "../../../utils/Table/Table";
import FilterMain from "../../../utils/FiltersMain";

export default function CallCenterDashboard() {
  const { columns, dummyData } = TicketTableDataHook();

  return (
    <div>
      <div className="grid grid-cols-4 gap-2">
        <ReusableCard
          title="Open Tickets"
          heading="251"
          iconColor={"#EF4444"}
          iconbg={"bg-[#FEF2F2]"}
          Icon={Ticket}
        />
        <ReusableCard
          title="Resolved"
          heading="1459"
          iconColor={"#10B981"}
          iconbg={"bg-[#ECFDF5]"}
          Icon={UserPlus}
        />
        <ReusableCard
          title="Open Tickets"
          heading="251"
          iconColor={"#000"}
          iconbg={"bg-[#FEF3C7]"}
          Icon={Hourglass}
        />
        <ReusableCard
          title="Escalated"
          heading="50"
          iconColor={"#A855F7"}
          iconbg={"bg-[#FAF5FF]"}
          Icon={ArrowUp}
        />
      </div>

      <FilterMain />

      <Table columns={columns} data={dummyData} />
    </div>
  );
}
