import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Loader2 } from "lucide-react";
import { UserLocation } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface LocationInputProps {
  onLocationSet: (location: UserLocation) => void;
}

export default function LocationInput({ onLocationSet }: LocationInputProps) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);
  const { toast } = useToast();

  const handleManualSubmit = () => {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
      toast({
        title: "Invalid Coordinates",
        description: "Please enter valid latitude and longitude values.",
        variant: "destructive",
      });
      return;
    }

    if (lat < 29.5 || lat > 31.5 || lon < 30.5 || lon > 32.0) {
      toast({
        title: "Location Out of Range",
        description:
          "Please enter coordinates within Cairo, Giza, or 6th of October area.",
        variant: "destructive",
      });
      return;
    }

    onLocationSet({ latitude: lat, longitude: lon });
    toast({
      title: "Location Set",
      description: "Finding nearest fuel stations...",
    });
  };

  const handleAutoDetect = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser does not support geolocation.",
        variant: "destructive",
      });
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setLatitude(location.latitude.toString());
        setLongitude(location.longitude.toString());
        onLocationSet(location);
        setIsDetecting(false);
        toast({
          title: "Location Detected",
          description: "Finding nearest fuel stations...",
        });
      },
      (error) => {
        setIsDetecting(false);
        toast({
          title: "Location Detection Failed",
          description:
            error.message ||
            "Unable to detect your location. Please enter manually.",
          variant: "destructive",
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Your Location</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="latitude">Latitude</Label>
          <Input
            id="latitude"
            type="number"
            step="any"
            placeholder="e.g., 30.0444"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            id="longitude"
            type="number"
            step="any"
            placeholder="e.g., 31.2357"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleManualSubmit}
          className="flex-1"
          disabled={!latitude || !longitude}>
          <MapPin className="mr-2 h-4 w-4" />
          Set Location
        </Button>
        <Button
          onClick={handleAutoDetect}
          variant="outline"
          className="flex-1"
          disabled={isDetecting}>
          {isDetecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Detecting...
            </>
          ) : (
            <>
              <MapPin className="mr-2 h-4 w-4" />
              Auto-Detect Location
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
