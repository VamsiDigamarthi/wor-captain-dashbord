import { ArrowUp, Check, Cross, CrossIcon, X } from "lucide-react";
import IconBtn from "../../../utils/IconBtn";

export default function CallCentereIssueTopCard({
  name = "Sarah Johnson",
  id = "#WR-2025-001",
  resolveClick,
  rejectClick,
  escalateClick,
}) {
  return (
    <div className="flex gap-2 items-center">
      <div className="h-[150px] w-[150px] bg-yellow-400 rounded-2xl"></div>
      <div className="space-y-1">
        <p className="font-bold text-2xl">{name}</p>
        <p className="font-light text-sm">{id}</p>
        <div className="w-full flex items-center gap-2">
          <IconBtn
            bgColor="bg-[#16A34A]"
            iconBg="#16A34A"
            icon={Check}
            text="Mark As Resolved"
            onClick={resolveClick}
          />
          <IconBtn
            bgColor="bg-[#DC2626]"
            iconBg="#DC2626"
            icon={X}
            text="Mark As Resolved"
            onClick={rejectClick}
          />
          <IconBtn
            bgColor="bg-[#CA8A04]"
            iconBg="#CA8A04"
            icon={ArrowUp}
            text="Escalate"
            onClick={() =>
              escalateClick({
                name,
                id,
                resolveClick,
                rejectClick,
                escalateClick,
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
