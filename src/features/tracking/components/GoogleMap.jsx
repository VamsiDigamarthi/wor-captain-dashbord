import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

const GOOGLE_MAPS_APIKEY = "AIzaSyCNMAEsU6BwMrrXQRvAHw42i7gd8m6zv2g"; // Replace with your API Key

const containerStyle = {
  width: "100%",
  height: "500px",
};

const GoogleMapComponent = ({ orders, trackingData, selectedRideId }) => {
  console.log("selectedRideId", selectedRideId);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_APIKEY,
  });

  const [directionsList, setDirectionsList] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    if (!isLoaded || orders.length === 0) return;

    const directionsService = new window.google.maps.DirectionsService();

    const fetchDirections = async () => {
      const newDirectionsList = [];
      const newColors = [];

      for (const order of orders) {
        const origin = {
          lat: order.pickup.coordinates[1],
          lng: order.pickup.coordinates[0],
        };
        const destination = {
          lat: order.drop.coordinates[1],
          lng: order.drop.coordinates[0],
        };

        try {
          const result = await new Promise((resolve, reject) => {
            directionsService.route(
              {
                origin,
                destination,
                travelMode: window.google.maps.TravelMode.DRIVING,
              },
              (response, status) => {
                if (status === "OK") resolve(response);
                else reject(status);
              }
            );
          });

          newDirectionsList.push(result);

          const baseColor = Math.floor(Math.random() * 16777215).toString(16);
          const polylineColor = `#${baseColor}99`;
          const markerColor = `#${baseColor}`;
          newColors.push({ polyline: polylineColor, marker: markerColor });
        } catch (error) {
          console.error("Error fetching directions:", error);
        }
      }

      setDirectionsList(newDirectionsList);
      setColors(newColors);
    };

    fetchDirections();
  }, [isLoaded, orders]);

  console.log("directionsList", directionsList);

  if (!isLoaded) return <p>Loading Map...</p>;
  //   console.log("trackingData", trackingData);

  return (
    <GoogleMap mapContainerStyle={containerStyle} zoom={12}>
      {orders?.map((order, index) => (
        <React.Fragment key={order._id}>
          <Marker
            position={{
              lat: order.pickup.coordinates[0],
              lng: order.pickup.coordinates[1],
            }}
            label="Start-Point"
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: colors[index]?.marker || "#FF0000",
              fillOpacity: 1,
              strokeWeight: 1,
              strokeColor: "#000",
            }}
          />
          <Marker
            position={{
              lat: order.captainCoor[0],
              lng: order.captainCoor[1],
            }}
            label="Pickup-Point"
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: colors[index]?.marker || "#FF0000",
              fillOpacity: 1,
              strokeWeight: 1,
              strokeColor: "#000",
            }}
          />
          <Marker
            position={{
              lat: order.drop.coordinates[0],
              lng: order.drop.coordinates[1],
            }}
            label="End-Point"
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: colors[index]?.marker || "#FF0000",
              fillOpacity: 1,
              strokeWeight: 1,
              strokeColor: "#000",
            }}
          />
        </React.Fragment>
      ))}

      {trackingData?.map((eachPerson, index) => {
        const isSelected = selectedRideId === eachPerson.orderId;
        const markerColor = isSelected
          ? "#007BFF"
          : colors[index]?.marker || "#FF0000";

        return (
          <Marker
            key={index}
            position={eachPerson.coordinates}
            label="🚗"
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: markerColor,
              fillOpacity: 1,
              strokeWeight: 1,
              strokeColor: "#000",
            }}
            animation={google.maps.Animation.DROP}
          />
        );
      })}
      {directionsList?.map((direction, index) => {
        const isSelected = selectedRideId === index;
        console.log("isSelected---", isSelected);

        // const markerColor = colors[index]?.marker || "#FF0000";
        const markerColor = isSelected
          ? "#007BFF"
          : colors[index]?.marker || "#FF0000";
        return (
          <DirectionsRenderer
            key={`${index}-${isSelected}`}
            directions={direction}
            options={{
              polylineOptions: {
                strokeColor: markerColor,
                strokeOpacity: 0.8,
                strokeWeight: 6,
              },
            }}
          />
        );
      })}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
