import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./Markers";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import MapBoxRoute from "./MapBoxRoute";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import DistanceTime from "../Booking/DistanceTime";
const MAPBOX_DRIVING_ENDPOINT =
  "https://api.mapbox.com/directions/v5/mapbox/driving/";
const session_token = "5ccce4a4-ab0a-4a7c-943d-580e55542363";

function MapboxMap() {
  const mapRef = useRef<any>();
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { soruceCordinates, setSourceCordinates } =
    useContext(SourceCordiContext);
  const { destinationCordinates, setDestinationCordinates } = useContext(
    DestinationCordiContext
  );

  const {directionData, setDirectionData} = useContext(DirectionDataContext);

  //Use to Fly to Source Marker Location

  useEffect(() => {
    if (soruceCordinates) {
      mapRef.current?.flyTo({
        center: [soruceCordinates.lng, soruceCordinates.lat],
        duration: 2500,
      });
    }
  }, [soruceCordinates]);
  //Use to Fly to Destination Markers Location
  useEffect(() => {
    if (destinationCordinates) {
      mapRef.current?.flyTo({
        center: [destinationCordinates.lng, destinationCordinates.lat],
        duration: 2500,
      });
    }

    if (soruceCordinates && destinationCordinates) {
      getDirectionRoute();
    }
  }, [destinationCordinates]);

  //Newly Added
  const getDirectionRoute = async () => {
    const res = await fetch(
      MAPBOX_DRIVING_ENDPOINT +
        soruceCordinates.lng +
        "," +
        soruceCordinates.lat +
        ";" +
        destinationCordinates.lng +
        "," +
        destinationCordinates.lat +
        "?overview=full&geometries=geojson" +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();
    console.log(result);
    console.log(result.routes);
    setDirectionData(result);
  };

  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Map</h2>
      <div className="rounded-lg overflow-hidden">
        {userLocation ? (
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation?.lng,
              latitude: userLocation?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 450, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers />

            {directionData?.routes ? (
              <MapBoxRoute
                coordinates={directionData?.routes[0]?.geometry?.coordinates}
              />
            ) : null}
          </Map>
        ) : null}
      </div>
      <div className="absolute bottom-[40px]
      z-20 right-[20px]">
     <DistanceTime />
     </div>
    </div>
  );
}

export default MapboxMap;
