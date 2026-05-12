import { useState } from "react";
import { MapPin } from "lucide-react";

const MapPicker = ({ location, onLocationChange }) => {
  const [markerPosition, setMarkerPosition] = useState(location);

  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // تحويل إحداثيات الشاشة لإحداثيات جغرافية (تقريبية للعرض)
    const lat = location.lat + (y - rect.height / 2) / 1000;
    const lng = location.lng + (x - rect.width / 2) / 1000;

    const newLocation = { lat, lng };
    setMarkerPosition(newLocation);
    onLocationChange(newLocation);
  };

  return (
    <div className="space-y-3">
      <div
        onClick={handleMapClick}
        className="relative w-full h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg border-2 border-gray-300 cursor-crosshair overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        {/* خطوط الخريطة */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(10)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full border-t border-gray-400"
              style={{ top: `${i * 10}%` }}
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full border-l border-gray-400"
              style={{ left: `${i * 10}%` }}
            />
          ))}
        </div>

        {/* علامة الموقع */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200">
          <MapPin
            className="h-12 w-12 text-red-600 drop-shadow-lg animate-bounce"
            fill="currentColor"
          />
        </div>

        {/* نص إرشادي */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 px-4 py-2 rounded-full shadow-md">
          <p className="text-sm font-medium text-gray-700">
            اضغط على الخريطة لتحديد موقعك
          </p>
        </div>
      </div>

      {/* عرض الإحداثيات */}
      <div className="flex gap-4 text-sm text-gray-600">
        <div className="flex-1 bg-gray-50 p-3 rounded-lg">
          <span className="font-semibold">خط العرض:</span>{" "}
          {markerPosition.lat.toFixed(4)}
        </div>
        <div className="flex-1 bg-gray-50 p-3 rounded-lg">
          <span className="font-semibold">خط الطول:</span>{" "}
          {markerPosition.lng.toFixed(4)}
        </div>
      </div>
    </div>
  );
};

export default MapPicker;
