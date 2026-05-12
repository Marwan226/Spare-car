import { useEffect, useRef } from "react";

interface LiveMapProps {
  mechanicLocation: { lat: number; lng: number };
  customerLocation: { lat: number; lng: number };
  status: string;
}

const LiveMap = ({
  mechanicLocation,
  customerLocation,
  status,
}: LiveMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const mechanicMarkerRef = useRef<L.Marker | null>(null);
  const customerMarkerRef = useRef<L.Marker | null>(null);
  const routeLineRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // @ts-expect-error - Leaflet loaded via CDN
      const L = window.L;

      const map = L.map(mapRef.current).setView(
        [customerLocation.lat, customerLocation.lng],
        13
      );

      L.tileLayer("/images/photo1764501889.jpg", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      // Custom mechanic icon
      const mechanicIcon = L.divIcon({
        html: `
          <div class="relative">
            <div class="absolute -top-8 -left-4 bg-blue-600 text-white p-2 rounded-full shadow-lg animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
            </div>
          </div>
        `,
        className: "",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      // Custom customer icon
      const customerIcon = L.divIcon({
        html: `
          <div class="relative">
            <div class="absolute -top-8 -left-4 bg-green-600 text-white p-2 rounded-full shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
          </div>
        `,
        className: "",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      // Add markers
      const mechanicMarker = L.marker(
        [mechanicLocation.lat, mechanicLocation.lng],
        { icon: mechanicIcon }
      ).addTo(map);

      const customerMarker = L.marker(
        [customerLocation.lat, customerLocation.lng],
        { icon: customerIcon }
      ).addTo(map);

      // Add route line
      const routeLine = L.polyline(
        [
          [mechanicLocation.lat, mechanicLocation.lng],
          [customerLocation.lat, customerLocation.lng],
        ],
        {
          color: "#3b82f6",
          weight: 4,
          opacity: 0.7,
          dashArray: "10, 10",
        }
      ).addTo(map);

      // Fit bounds to show both markers
      const bounds = L.latLngBounds([
        [mechanicLocation.lat, mechanicLocation.lng],
        [customerLocation.lat, customerLocation.lng],
      ]);
      map.fitBounds(bounds, { padding: [50, 50] });

      mapInstanceRef.current = map;
      mechanicMarkerRef.current = mechanicMarker;
      customerMarkerRef.current = customerMarker;
      routeLineRef.current = routeLine;
    }
  }, []);

  useEffect(() => {
    if (mechanicMarkerRef.current && routeLineRef.current) {
      // Update mechanic marker position with smooth animation
      mechanicMarkerRef.current.setLatLng([
        mechanicLocation.lat,
        mechanicLocation.lng,
      ]);

      // Update route line
      routeLineRef.current.setLatLngs([
        [mechanicLocation.lat, mechanicLocation.lng],
        [customerLocation.lat, customerLocation.lng],
      ]);

      // Adjust map view if needed
      if (mapInstanceRef.current && status === "on_way") {
        const bounds = mapInstanceRef.current.getBounds();
        const mechanicLatLng: [number, number] = [
          mechanicLocation.lat,
          mechanicLocation.lng,
        ];

        if (!bounds.contains(mechanicLatLng)) {
          mapInstanceRef.current.panTo(mechanicLatLng);
        }
      }
    }
  }, [mechanicLocation, customerLocation, status]);

  return (
    <div className="relative h-[600px] w-full">
      <div ref={mapRef} className="h-full w-full rounded-b-lg" />

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg z-[1000] space-y-2">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-600 rounded-full ml-2"></div>
          <span className="text-sm font-medium">الفني</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-600 rounded-full ml-2"></div>
          <span className="text-sm font-medium">موقعك</span>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;
