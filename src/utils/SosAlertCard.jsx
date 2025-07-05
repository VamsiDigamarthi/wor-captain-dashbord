import { Phone, TriangleAlert } from "lucide-react";
import React from "react";
import IconBtn from "./IconBtn";

export default function SosAlertCard() {
  return (
    <div className="flex flex-col gap-2 bg-red-100 p-2 rounded-xl">
      <div className="flex gap-2 items-center">
        <div className="bg-red-400 p-2 rounded-full ">
          <TriangleAlert fill="red" size={15} />
        </div>

        <div>
          <p className="font-semibold">SOS Alert</p>
          <p className="text-gray-500">Ride #RT8294</p>
        </div>
      </div>

      <div className="flex w-full gap-2 items-center justify-end">
        <IconBtn
          bgColor="bg-[#DC2626]"
          iconBg="#DC2626"
          icon={Phone}
          text="Call Rider"
        />
        <IconBtn
          bgColor="bg-[#2563EB]"
          iconBg="#2563EB"
          icon={Phone}
          text="Alert Police"
        />
      </div>
    </div>
  );
}
