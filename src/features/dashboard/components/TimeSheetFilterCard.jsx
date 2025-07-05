import React from "react";
import { Download, Filter } from "lucide-react";
import CustomDropDown from "../../../utils/CustomDropDown";
import IconBtn from "../../../utils/IconBtn";

export default function TimeSheetFilterCard({ onViewChange, filters }) {
  return (
    <div className="bg-[#F8F8F8] my-2 p-4">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-2xl font-bold">Timesheet</h2>
        {/* <IconBtn
          iconBg="bg-[#EA4C89]"
          icon={Download}
          text="Export"
          bgColor="bg-[#EA4C89]"
          onClick={() => console.log("Export clicked")}
        /> */}
      </div>

      <div className="flex itcems-center justify-between mt-2">
        <p>
          {filters?.fromDate} - {filters?.toDate}
        </p>
        <div className="flex items-center gap-2">
          <CustomDropDown
            placeholder={"Select View"}
            options={[
              { title: "Weekly View", value: "Weekly View" },
              { title: "Monthly View", value: "Monthly View" },
            ]}
            onChange={(val) => {
              if (val === "Weekly View") onViewChange("weekly");
              if (val === "Monthly View") onViewChange("monthly");
            }}
          />
          {/* <IconBtn
            iconBg="bg-[#E5E7EB]"
            icon={Filter}
            textColor="black"
            text="Filters"
            bgColor="bg-[#E5E7EB]"
            onClick={() => console.log("Export clicked")}
          /> */}
        </div>
      </div>
    </div>
  );
}
