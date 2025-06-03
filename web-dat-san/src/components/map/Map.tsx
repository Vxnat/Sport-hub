"use client";

import { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  address: string;
}

export default function Map({ address }: MapProps) {
  const [map, setMap] = useState<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null); // Ref to track the map container

  useEffect(() => {
    if (!map && mapContainerRef.current) {
      // Initialize map only if it hasn't been created
      const mapInstance = L.map(mapContainerRef.current).setView(
        [10.762622, 106.660172],
        13
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapInstance);

      setMap(mapInstance);
    }

    // Cleanup on unmount
    return () => {
      if (map) {
        map.remove(); // Remove the map instance
        setMap(null); // Reset map state
      }
    };
  }, [map]); // Dependency on map state

  useEffect(() => {
    async function geocode() {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
          )}`
        );
        const data = await res.json();

        if (data.length > 0) {
          const { lat, lon } = data[0];
          if (map) {
            map.setView([lat, lon], 15);
            L.marker([lat, lon]).addTo(map).bindPopup(address).openPopup();
          }
        } else {
          console.error("Không tìm thấy địa chỉ:", address);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (map && address) {
      geocode();
    }
  }, [map, address]);

  return (
    <div
      ref={mapContainerRef}
      id="map"
      style={{ height: "400px", width: "100%" }}
    />
  );
}
