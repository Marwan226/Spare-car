import { Phone, MapPin, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StationWithDistance } from "@/types";

interface StationCardProps {
  station: StationWithDistance;
  onRequestAssistance: (station: StationWithDistance) => void;
}

export default function StationCard({
  station,
  onRequestAssistance,
}: StationCardProps) {
  const handleCall = () => {
    window.location.href = `tel:${station.phone}`;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{station.name}</CardTitle>
          <Badge variant="secondary" className="ml-2">
            {station.distance} km
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2 text-blue-600" />
          {station.area}
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Phone className="h-4 w-4 mr-2 text-green-600" />
          {station.phone}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            onClick={handleCall}
            variant="outline"
            className="flex-1"
            size="sm">
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
          <Button
            onClick={() => onRequestAssistance(station)}
            className="flex-1"
            size="sm">
            <Info className="h-4 w-4 mr-2" />
            Request Help
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
