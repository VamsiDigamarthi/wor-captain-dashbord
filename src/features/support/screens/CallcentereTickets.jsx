import React, { useState } from "react";

import { ArrowUp, Hourglass, Search, Ticket, UserPlus } from "lucide-react";
import ReusableCard from "../../../utils/ReusableCard";
import CallcentereTicketList from "../components/CallcentereTicketList";
import CallcentereIssueBox from "../components/CallcentereIssueBox";

export default function CallcentereTickets() {
  return (
    <div className="w-full">
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

      <div className="flex w-full gap-2 my-5">
        <div className="w-[30%]  overflow-y-scroll">
          <CallcentereTicketList />
        </div>

        <div className="w-[70%]">
          <CallcentereIssueBox />
        </div>
      </div>
    </div>
  );
}
