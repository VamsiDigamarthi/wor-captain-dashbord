import React from "react";
import EmergencyAlertCard from "../../../utils/EmergencyAlertCard";

export default function EmergencyAlerts({ ride }) {
  console.log(ride, "FROM ALERT");

  return (
    <div>
      <div className="flex items-center justify-between">
        <p>Ride Details</p>
        {/* <p className="bg-red-100 text-red-700 p-2 rounded-full text-xs">
          3 Critical
        </p> */}
      </div>

      {ride && (
        <div className="grid grid-cols-2 gap-2">
          <EmergencyAlertCard
            alertBgColor="bg-yellow-300"
            alertText="Passenger"
            rideText={`#${ride?._id}`}
            name={ride?.head?.name || "N/A"}
            onClick={() =>
              (window.location.href = `tel:+91${ride?.head?.mobile}`)
            }
          />
          <EmergencyAlertCard
            alertBgColor="bg-yellow-300"
            alertText="Driver"
            btnBg="#CA8A04"
            rideText={`#${ride?._id}`}
            name={ride?.acceptCaptain?.name || "N/A"}
            onClick={() =>
              (window.location.href = `tel:+91${ride?.acceptCaptain?.mobile}`)
            }
          />
        </div>
      )}
    </div>
  );
}
