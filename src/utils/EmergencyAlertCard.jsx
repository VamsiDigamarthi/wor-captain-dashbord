import CustomButton from "./CustomButton";

export default function EmergencyAlertCard({
  alertText = "SOS Alert",
  alertBgColor = "bg-[#FEE2E2]",
  name = "Sarah Wilson",
  rideText = "Ride #2847",
  btnText = "Call Now",
  btnBg = "#DC2626",
  onClick,
}) {
  return (
    <div className="bg-white border-gray-400 border p-2 rounded-2xl space-y-2">
      <div className="flex items-center justify-between">
        <p className={`${alertBgColor} text-red-700 p-2 rounded-full text-xs`}>
          {alertText}
        </p>

        <p className="text-xs">2 Min Ago</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-red-300"></div>
        <div className="text-sm">
          <p className="font-bold">{name}</p>
          <p>{rideText}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <CustomButton
          onClick={onClick}
          bg={btnBg}
          className={"text-white p-1"}
          text={btnText}
        />
        <CustomButton bg="#E5E7EB" text={"View Details"} />
      </div>
    </div>
  );
}
