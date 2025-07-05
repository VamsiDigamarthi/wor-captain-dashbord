import { useSelector } from "react-redux";
import { useLiveRiders } from "../hooks/liveRider.Hook";
import { useState } from "react";
import ActiveRidesList from "../components/ActiveRidesList";
import GoogleMapComponent from "../components/GoogleMap";
import LiveAlerts from "../components/LiveAlerts";

const RideTracking = () => {
  const { activeorder } = useSelector((state) => state.activeOrder);
  const { trackingData } = useLiveRiders();

  const [selectedRideId, setSelectedRideId] = useState(null);

  return (
    <div className="flex gap-2 my-2 relative">
      <div className="w-[35%]">
        <ActiveRidesList
          rides={activeorder}
          selectedRideId={selectedRideId}
          setSelectedRideId={setSelectedRideId}
        />
      </div>

      <div className="w-[65%] overflow-y-scroll">
        <GoogleMapComponent
          orders={activeorder}
          trackingData={trackingData}
          selectedRideId={selectedRideId}
        />
        <LiveAlerts orders={activeorder} selectedRideId={selectedRideId} />
      </div>
    </div>
  );
};
export default RideTracking;
