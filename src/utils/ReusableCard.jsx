import { ArrowUp } from "lucide-react";

export default function ReusableCard({
  title = "Hey",
  heading = "Manchidi",
  Icon,
  greenText = "12% up",
  iconbg,
  iconColor,
}) {
  return (
    <div className="bg-[#f8f8f8] rounded-2xl shadow p-4 flex justify-between flex-col gap-2 min-w-[240px]">
      <p className="text-gray-500">{title}</p>

      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">{heading}</h2>
        <div
          className={`rounded-xl flex items-center justify-center p-3 ${iconbg}`}
        >
          {Icon && <Icon color={iconColor} />}
        </div>
      </div>

      <p className="text-green-600 flex items-center">
        <ArrowUp />
        {greenText}
      </p>
    </div>
  );
}
