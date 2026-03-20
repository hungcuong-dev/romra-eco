"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { RiceField, FieldStatus } from "@/types";
import { MAP_CENTER, MAP_ZOOM, STATUS_COLORS } from "@/lib/constants";
import { riceFields } from "@/data/fields";

interface MapViewProps {
  activeFilters: FieldStatus[];
  selectedField: RiceField | null;
  onFieldSelect: (field: RiceField) => void;
  onGalleryClick: () => void;
}

function createMarkerIcon(status: FieldStatus, isSelected: boolean) {
  const size = isSelected ? 32 : 22;
  const pulseSize = size + 20;
  const color = STATUS_COLORS[status];
  return L.divIcon({
    className: "",
    iconSize: [pulseSize, pulseSize],
    iconAnchor: [pulseSize / 2, pulseSize / 2],
    html: `
      <div style="position:relative;width:${pulseSize}px;height:${pulseSize}px;display:flex;align-items:center;justify-content:center;">
        <div class="marker-pulse" style="
          position:absolute;
          width:${size}px;height:${size}px;border-radius:50%;
          background:${color};opacity:0.3;
          animation:pulse-ring 2.5s ease-out infinite;
        "></div>
        ${isSelected ? `<div class="marker-pulse" style="
          position:absolute;
          width:${size}px;height:${size}px;border-radius:50%;
          background:${color};opacity:0.2;
          animation:pulse-ring 2.5s ease-out 0.8s infinite;
        "></div>` : ""}
        <div style="
          position:relative;z-index:1;
          width:${size}px;height:${size}px;border-radius:50%;
          background:${color};border:3px solid white;
          box-shadow:0 2px 8px rgba(0,0,0,0.3);
          cursor:pointer;transition:transform 0.2s;
        "></div>
      </div>
    `,
  });
}

function FlyToField({ field }: { field: RiceField | null }) {
  const map = useMap();
  useEffect(() => {
    if (field) {
      map.closePopup();
      map.flyTo([field.lat, field.lng], 14, { duration: 1.2 });
    } else {
      map.closePopup();
      map.flyTo([MAP_CENTER[1], MAP_CENTER[0]], MAP_ZOOM, { duration: 1.2 });
    }
  }, [field, map]);
  return null;
}

function FlyToLocation({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 12, { duration: 1.5 });
  }, [lat, lng, map]);
  return null;
}

function getDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* Inject pulse keyframes once */
const PULSE_CSS = `
@keyframes pulse-ring {
  0% { transform: scale(1); opacity: 0.35; }
  100% { transform: scale(2.2); opacity: 0; }
}
`;

function PulseStyle() {
  useEffect(() => {
    const id = "marker-pulse-style";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = PULSE_CSS;
    document.head.appendChild(style);
  }, []);
  return null;
}

export default function MapView({
  activeFilters,
  selectedField,
  onFieldSelect,
  onGalleryClick,
}: MapViewProps) {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locating, setLocating] = useState(false);
  const [satellite, setSatellite] = useState(false);

  const filteredFields = riceFields.filter((f) =>
    activeFilters.includes(f.status)
  );

  const handleFindNearMe = () => {
    if (!navigator.geolocation) {
      alert("Trình duyệt không hỗ trợ định vị.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        let nearest: RiceField | null = null;
        let minDist = Infinity;
        for (const field of riceFields) {
          const d = getDistance(latitude, longitude, field.lat, field.lng);
          if (d < minDist) {
            minDist = d;
            nearest = field;
          }
        }
        if (nearest) {
          onFieldSelect(nearest);
        }
        setLocating(false);
      },
      () => {
        alert("Không thể xác định vị trí. Hãy cho phép truy cập vị trí.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[MAP_CENTER[1], MAP_CENTER[0]]}
        zoom={MAP_ZOOM}
        className="h-full w-full z-0"
        zoomControl={false}
      >
        <PulseStyle />
        {satellite ? (
          <TileLayer
            key="satellite"
            attribution='&copy; Esri'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        ) : (
          <TileLayer
            key="street"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )}

        <FlyToField field={selectedField} />

        {/* Field overlay — green zone when selected */}
        {selectedField && (
          <Circle
            center={[selectedField.lat, selectedField.lng]}
            radius={800}
            pathOptions={{
              color: "#4a6b3a",
              fillColor: "#4a6b3a",
              fillOpacity: 0.12,
              weight: 2,
              dashArray: "6 4",
            }}
          />
        )}

        {/* User location */}
        {userLocation && (
          <>
            <Circle
              center={[userLocation.lat, userLocation.lng]}
              radius={500}
              pathOptions={{
                color: "#3b82f6",
                fillColor: "#3b82f6",
                fillOpacity: 0.15,
                weight: 2,
              }}
            />
            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={L.divIcon({
                className: "",
                iconSize: [16, 16],
                iconAnchor: [8, 8],
                html: `<div style="width:16px;height:16px;border-radius:50%;background:#3b82f6;border:3px solid white;box-shadow:0 0 10px rgba(59,130,246,0.5);"></div>`,
              })}
            >
              <Popup>
                <div style={{ fontSize: 12, fontWeight: 600 }}>📍 Vị trí của bạn</div>
              </Popup>
            </Marker>
          </>
        )}

        {filteredFields.map((field) => (
          <Marker
            key={field.id}
            position={[field.lat, field.lng]}
            icon={createMarkerIcon(field.status, selectedField?.id === field.id)}
            eventHandlers={{
              click: () => onFieldSelect(field),
            }}
          >
            <Popup>
              <div style={{ fontFamily: "inherit", minWidth: 240, padding: "8px 4px" }}>
                <h3 style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 700, color: "#2c3e2a" }}>
                  {field.name}
                </h3>
                <p style={{ margin: "0 0 6px", fontSize: 14, color: "#666" }}>
                  {field.farmer} &middot; {field.district}
                </p>
                <p style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 600, color: "#4a6b3a" }}>
                  {field.straw_kg.toLocaleString()} kg rơm
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onFieldSelect(field);
                    onGalleryClick();
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #e0ddd5",
                    borderRadius: 8,
                    background: "#faf8f3",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#2c3e2a",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontSize: 15 }}>📷</span>
                  Xem ảnh cánh đồng
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map style toggle */}
      <button
        onClick={() => setSatellite((s) => !s)}
        className="absolute bottom-28 right-4 z-10 flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-medium text-forest-dark shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl md:bottom-20 md:px-4 md:py-2.5 md:text-sm"
      >
        {satellite ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
            </svg>
            Bản đồ
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
            </svg>
            Vệ tinh
          </>
        )}
      </button>

      {/* Find near me button */}
      <button
        onClick={handleFindNearMe}
        disabled={locating}
        className="absolute bottom-16 right-4 z-10 flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-medium text-forest-dark shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 md:bottom-6 md:px-5 md:py-2.5 md:text-sm"
      >
        {locating ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-forest border-t-transparent" />
            Đang định vị...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
            </svg>
            Tìm cánh đồng gần tôi
          </>
        )}
      </button>
    </div>
  );
}
