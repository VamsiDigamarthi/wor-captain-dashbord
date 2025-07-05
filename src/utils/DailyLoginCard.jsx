import { useState } from "react";
import Modal from "./Modal";
import AttendanceModal from "../features/dashboard/components/AttendanceModal";

export default function DailyLoginCard({ buttonText = "Check In" }) {
  const [modal, setModal] = useState(false);
  return (
    <>
      <div className="bg-[#f8f8f8] rounded-2xl shadow-lg p-4 flex justify-between flex-col gap-2">
        <p className="text-gray-500">Daily</p>

        <div className="flex items-center justify-between">
          <h2 className="font-bold text-2xl">Login</h2>
        </div>

        <button
          onClick={() => setModal(true)}
          className="bg-[#374151] text-white p-3 cursor-pointer rounded-2xl"
        >
          {buttonText}
        </button>
      </div>
      {modal && (
        <Modal onClose={() => setModal(false)}>
          <AttendanceModal />
        </Modal>
      )}
    </>
  );
}
