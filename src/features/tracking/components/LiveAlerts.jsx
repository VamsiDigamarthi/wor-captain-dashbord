import EmergencyAlerts from "./EmergencyAlerts";

export default function LiveAlerts({ orders, selectedRideId }) {
  console.log("activeorder", selectedRideId, "From live alert box");
  console.log("activeorder", orders, "From live alert box");

  const presentRide = orders?.filter((e) => e._id === selectedRideId);

  console.log(orders, "presentRide");

  return (
    <div className="my-2 space-y-2">
      {/* <div className="flex justify-between items-center">
        <p className="font-semibold">Live Alerts</p>
        <p className="bg-red-100 text-red-700 p-2 rounded-full text-xs">
          3 Critical
        </p>
      </div> */}

      {/* <SosAlertCard /> */}
      <EmergencyAlerts ride={presentRide[0]} />
    </div>
  );
}
