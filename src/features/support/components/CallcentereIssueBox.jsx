import React, { useState } from "react";
import CallCentereIssueTopCard from "./CallCentereIssueTopCard";
import TicketDetails from "./TicketDetails";
import IssueDescription from "./IssueDescription";
import RightDrawer from "../../../utils/RightDrawer";
import EscalationSidebar from "./EscalationSidebar";

export default function CallcentereIssueBox() {
  const [sidebar, setSideBar] = useState(true);

  const escalate = (data) => {
    setSideBar(true);
    console.log(data);
  };
  return (
    <div className="bg-[#F9FAFB] p-2 rounded-xl">
      <CallCentereIssueTopCard escalateClick={escalate} />
      <div className="w-full mt-4 gap-2 grid grid-cols-2">
        <TicketDetails />
        <IssueDescription />
      </div>

      <RightDrawer isOpen={sidebar} onClose={() => setSideBar(false)}>
        <EscalationSidebar onClose={() => setSideBar(false)} />
      </RightDrawer>
    </div>
  );
}
