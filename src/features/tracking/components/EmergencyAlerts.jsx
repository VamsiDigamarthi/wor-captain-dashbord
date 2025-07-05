import React from "react";
import EmergencyAlertCard from "../../../utils/EmergencyAlertCard";
export default function EmergencyAlerts() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p>Emergency Alerts</p>
        <p className="bg-red-100 text-red-700 p-2 rounded-full text-xs">
          3 Critical
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <EmergencyAlertCard />
        <EmergencyAlertCard
          alertBgColor="bg-yellow-300"
          alertText="Route Deviation"
          btnBg="#CA8A04"
        />
      </div>
    </div>
  );
}
