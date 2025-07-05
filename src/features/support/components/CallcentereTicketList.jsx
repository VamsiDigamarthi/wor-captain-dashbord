import { Search } from "lucide-react";
import React from "react";

export default function CallcentereTicketList() {
  return (
    <div className="bg-[#F9FAFB] p-4 rounded-2xl  h-full space-y-2">
      <div className="flex items-center bg-white border gap-2 border-gray-600 p-2 rounded-lg">
        <Search />
        <input
          type="search"
          placeholder="search users"
          className="outline-none bg-none border-none w-full"
        />
      </div>

      <div className="h-[70vh] space-y-2 overflow-y-scroll">
        <TicketCard status="pending" accent="yellow" />
        <TicketCard status="completed" accent="green" />
        <TicketCard status="completed" accent="green" />
      </div>
    </div>
  );
}

function TicketCard({
  name = "Sarah",
  id = "#WR-2025-001",
  status = "completed",
  accent = "red",
}) {
  const yellow =
    "bg-[#FEF9C3] text-[#854D0E] w-fit text-center h-fit rounded-full p-2 text-xs";
  const green =
    "bg-[#DCFCE7] text-[#166534] w-fit text-center h-fit rounded-full p-2 text-xs";

  const red =
    "bg-[#FEE2E2] text-[#DC2626] w-fit text-center h-fit rounded-full p-2 text-xs";

  const styles = accent === "red" ? red : accent == "yellow" ? yellow : green;

  return (
    <div className="w-full p-2 flex items-center justify-between shadow-lg bg-[#F9FAFB]">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-red-500"></div>
        <div>
          <p>{name}</p>
          <p>{id}</p>
        </div>
      </div>

      <div
        className={`
        ${styles}
        `}
      >
        {status}
      </div>
    </div>
  );
}
