import ActiveRideDetailBox from "./ActiveRideDetailBox";

export default function ActiveRidesList({
  rides,
  selectedRideId,
  setSelectedRideId,
}) {
  return (
    <div className="w-full border-r border-gray-300 p-4">
      <div className="flex items-center justify-between">
        <h2>Active Rides</h2>
        <p className="bg-green-200 text-sm font-semibold rounded-full p-1">
          {rides?.length} Active
        </p>
      </div>

      <div className="h-[90vh] overflow-y-scroll">
        {rides.map((ride, index) => {
          const isSelected = index === selectedRideId;
          return (
            <div
              key={ride._id}
              onClick={() => setSelectedRideId(index)}
              className={`cursor-pointer p-2 my-2 rounded ${
                isSelected
                  ? "bg-blue-100 border border-blue-500"
                  : "hover:bg-gray-100"
              }`}
            >
              <ActiveRideDetailBox ride={ride} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
