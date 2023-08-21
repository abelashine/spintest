import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default ({ coordinates: { lng, lat }, photo }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/dark-v10",
      zoom: 5,
      center: [lng, lat],
      interactive: false,
    });
  }, [lng, lat]);

  return (
    <>
      <div style={{ position: "relative" }} ref={mapRef}>
        <div ref={markerRef}/>
        <div
          style={{
            width: 56,
            height: 56,
            position: "absolute",
            zIndex: "11",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "8.8px",
            overflow: "hidden",
            backgroundImage: `url(${photo})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          />
      </div>
    </>
  );
};
