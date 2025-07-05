import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useSocket } from "../../../SocketProvider";
import { fetchActiveOrders } from "../../../Redux/slice/activeOrderSlice";

export const useLiveRiders = () => {
  const dispatch = useDispatch();
  const storedToken = localStorage.getItem("token");
  const { socket, isConnected } = useSocket();
  const { data } = useSelector((state) => state.profile);
  const { activeorder } = useSelector((state) => state.activeOrder);

  const [trackingData, setTrackingData] = useState([]);

  useEffect(() => {
    dispatch(fetchActiveOrders(storedToken));
  }, []);

  useEffect(() => {
    console.log("data", data);

    if (isConnected && socket && data) {
      socket.emit("monitoring-user-connected", {
        newUserId: data?._id,
      });
    }
  }, [socket, isConnected, data]);

  const allCaptainCoordinates = (coordinatesData) => {
    setTrackingData((prevData) => {
      const existingIndex = prevData.findIndex(
        (item) => item.orderId === coordinatesData.orderId
      );
      if (existingIndex !== -1) {
        // Update existing orderId coordinates
        const updatedData = [...prevData];
        updatedData[existingIndex] = coordinatesData;
        return updatedData;
      } else {
        // Add new orderId with coordinates
        return [...prevData, coordinatesData];
      }
    });
  };

  useEffect(() => {
    if (socket && isConnected) {
      socket.on("all-captain-coordinates", allCaptainCoordinates);
    }
    return () => {
      socket?.off("all-captain-coordinates", allCaptainCoordinates);
    };
  }, [socket, isConnected]);

  return {
    trackingData,
  };
};
