import { CircleSmall, MapPin } from "lucide-react";
import { imageUrl } from "../../../Core/url";

export default function ActiveRideDetailBox({ ride }) {
  return (
    <div className="border-t border-b border-gray-300 space-y-2 p-2">
      <div className="flex justify-between items-center">
        <p>Ride ID: #${ride._id?.slice(0, 15)}</p>
        <span className="h-2 w-2 bg-green-500 rounded-full"></span>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-20 w-20 rounded-full bg-red-400">
          <img
            src={`${imageUrl}/${ride?.acceptCaptain?.profilePic}`}
            className="h-full w-full object-cover rounded-full"
          />
        </div>

        <div className="flex flex-col text-sm">
          <p className="font-semibold">{ride?.acceptCaptain?.name}</p>
          <p className="text-gray-600">
            {ride?.acceptCaptain?.services[0]?.rcNumber} -{" "}
            {ride?.acceptCaptain?.services[0]?.serviceType}
          </p>
          <p className="text-gray-600">Speed: 45 km/h</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <CircleSmall fill="green" />
        <p className="text-sm">{ride?.pickupAddress}</p>
      </div>
      <div className="flex items-center gap-2">
        <MapPin fill="red" />
        <p className="text-sm">{ride?.dropAddress}</p>
      </div>

      <div className="flex items-center justify-between">
        <p>Started: {ride?.orderPlaceTime}</p>
        {/* <p>ETA: 11:15 AM</p> */}
      </div>
    </div>
  );
}
