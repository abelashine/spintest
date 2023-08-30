import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import LocationIcon from "../../static/icons/Location.png"

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default ({ coordinates: { lng, lat }, photo }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/light-v10",
      zoom: 5,
      center: [lng, lat],
      interactive: false,
    });
  }, [lng, lat]);

  return (
    <>
      <div
        style={{ position: "relative", width: "353px", height: "153px",marginLeft:"20px" }}
        ref={mapRef}
      >
        <div ref={markerRef} />
        <div
          style={{
            width: 48,
            height: 48,
            position: "absolute",
            zIndex: "11",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            overflow: "hidden",
            backgroundImage: `url(${photo})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />
        <div
          style={{
            width: 26,
            height: 26,
            position: "absolute",
            zIndex: "11",
            top: "10%",
            left: "90%",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            overflow: "hidden",
            backgroundImage: `url(${LocationIcon})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            cursor:"pointer"
          }}
        />
      </div>
    </>
  );
};
