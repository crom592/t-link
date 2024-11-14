'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Map event components
function MapEvents({ onLocationFound, onLocationError }: { 
  onLocationFound: (location: L.LatLng) => void;
  onLocationError: (error: L.ErrorEvent) => void;
}) {
  const map = useMapEvents({
    locationfound(e) {
      onLocationFound(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
    locationerror(e) {
      onLocationError(e);
    },
    click(e) {
      onLocationFound(e.latlng);
    }
  });
  return null;
}

// Change view component
function ChangeView({ center, zoom }: { center: L.LatLngExpression; zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

interface MapComponentProps {
  center: [number, number];
  zoom: number;
  markerPosition: L.LatLng | null;
  onLocationFound: (location: L.LatLng) => void;
  onLocationError: (error: L.ErrorEvent) => void;
}

export default function MapComponent({
  center,
  zoom,
  markerPosition,
  onLocationFound,
  onLocationError
}: MapComponentProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="h-96 bg-gray-100" />;
  }

  return (
    <div className="h-[400px] w-full relative">
      {isMounted && (
        <MapContainer
          key={`${center[0]}-${center[1]}-${zoom}`}
          center={center}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {markerPosition && (
            <Marker position={markerPosition} />
          )}
          <MapEvents
            onLocationFound={onLocationFound}
            onLocationError={onLocationError}
          />
          <ChangeView center={center} zoom={zoom} />
        </MapContainer>
      )}
    </div>
  );
}
