import React, { useEffect, useState } from "react";
import { getDayAttendace, markAttendance } from "../services/attendace.service";

const AttendanceModal = () => {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0]; // "YYYY-MM-DD"
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });

  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAttendance = async () => {
    setLoading(true);
    const res = await getDayAttendace({
      from: formattedDate,
      todate: formattedDate,
    });
    console.log("res", res);

    if (res.status && res.attendace?.records.length > 0) {
      setAttendanceData(res.attendace?.records[0]);
    } else {
      setAttendanceData(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAttendance();
  }, [formattedDate]);

  const handleCheckIn = async () => {
    const now = new Date().toLocaleTimeString("en-GB"); // HH:mm:ss
    const res = await markAttendance({
      date: formattedDate,
      day: dayName,
      checkIn: now,
    });
    if (res.status) {
      fetchAttendance();
    } else {
      alert(res.error);
    }
  };

  const handleCheckOut = async () => {
    const now = new Date().toLocaleTimeString("en-GB");
    const res = await markAttendance({
      date: formattedDate,
      day: dayName,
      checkOut: now,
    });
    if (res.status) {
      fetchAttendance();
    } else {
      alert(res.error);
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "--:--";
    return timeString;
  };

  return (
    <div className="w-full flex flex-col gap-0.5">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex items-start gap-4 my-2">
            <img
              src="/clock.png"
              className="h-[150px] w-[250px] object-cover rounded-xl"
              alt="clock"
            />
            <div>
              <h2 className="font-bold text-xl">
                {attendanceData?.checkIn ? "Clocked In" : "Not Clocked In"}
              </h2>
              <p className="text-gray-700">{today.toDateString()}</p>
              <p className="text-gray-700">
                Check In: {formatTime(attendanceData?.checkIn)}
              </p>
              {attendanceData?.checkOut && (
                <p className="text-gray-700">
                  Check Out: {formatTime(attendanceData.checkOut)}
                </p>
              )}
              {attendanceData?.totalHours && (
                <p className="text-gray-700">
                  Total Hours: {attendanceData.totalHours} hrs
                </p>
              )}
              {attendanceData?.overTime && (
                <p className="text-gray-700">
                  Over Time: {attendanceData.overTime} hrs
                </p>
              )}
            </div>
          </div>

          <div className="w-[50%] mx-auto my-4 text-center">
            {!attendanceData?.checkIn ? (
              <button
                onClick={handleCheckIn}
                className="bg-[#54D12B] px-6 py-2 rounded-md font-semibold text-white cup"
              >
                Check In
              </button>
            ) : !attendanceData?.checkOut ? (
              <button
                onClick={handleCheckOut}
                className="bg-[#F97316] px-6 py-2 rounded-md font-semibold text-white cursor-pointer"
              >
                Check Out
              </button>
            ) : (
              <p className="text-green-600 font-semibold">
                You already checked out
              </p>
            )}
          </div>

          <h2 className="font-bold text-lg mt-6">Today Records</h2>
          <div className="w-full rounded-md border border-[#DEE3DB]">
            <div className="w-full flex justify-between items-center p-2 border-b border-[#DEE3DB]">
              <span>Time</span>
              <span>Status</span>
            </div>
            <div className="w-full flex justify-between items-center p-2 border-b border-[#DEE3DB]">
              <span>{formatTime(attendanceData?.checkIn)}</span>
              <span className="w-[320px] bg-[#F2F5F2] rounded-md p-1 flex justify-center items-center font-semibold">
                Check In
              </span>
            </div>
            <div className="w-full flex justify-between items-center p-2 border-b border-[#DEE3DB]">
              <span>{formatTime(attendanceData?.checkOut)}</span>
              <span className="w-[320px] bg-[#F2F5F2] rounded-md p-1 flex justify-center items-center font-semibold">
                Check Out
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AttendanceModal;
