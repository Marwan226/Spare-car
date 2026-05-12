import { useState } from "react";
import { Car, MapPin, Phone } from "lucide-react";
import LocationInput from "@/components/LocationInput";
import StationCard from "@/components/StationCard";
import RequestModal from "@/components/RequestModal";
import ConfirmationPage from "@/components/ConfirmationPage";
import { stations } from "@/data/stations";
import { getDistanceFromUser } from "@/utils/distance";
import { UserLocation, StationWithDistance } from "@/types";

export default function LiteRoad() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [nearestStations, setNearestStations] = useState<StationWithDistance[]>(
    []
  );
  const [selectedStation, setSelectedStation] =
    useState<StationWithDistance | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);

  const handleLocationSet = (location: UserLocation) => {
    setUserLocation(location);

    // Calculate distances and sort stations
    const stationsWithDistance = stations.map((station) => ({
      ...station,
      distance: getDistanceFromUser(
        location,
        station.latitude,
        station.longitude
      ),
    }));

    // Sort by distance (nearest first)
    stationsWithDistance.sort((a, b) => a.distance - b.distance);

    setNearestStations(stationsWithDistance);
  };

  const handleRequestAssistance = (station: StationWithDistance) => {
    setSelectedStation(station);
    setIsModalOpen(true);
  };

  const handleRequestSuccess = (id: string) => {
    setRequestId(id);
  };

  const handleBackToHome = () => {
    setRequestId(null);
    setUserLocation(null);
    setNearestStations([]);
    setSelectedStation(null);
  };

  // Show confirmation page if request was successful
  if (requestId) {
    return (
      <ConfirmationPage requestId={requestId} onBackToHome={handleBackToHome} />
    );
  }

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Car className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Lite Road Assistance
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Find the nearest fuel station and request on-site support
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Banner */}
        <div className="bg-blue-100 border-l-4 border-blue-600 p-4 mb-6 rounded">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-1">How it works:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Enter your location manually or use auto-detect</li>
                <li>View nearby fuel stations sorted by distance</li>
                <li>Select a station and request roadside assistance</li>
                <li>
                  Wait for the station to contact you within 15-30 minutes
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Location Input */}
        <LocationInput onLocationSet={handleLocationSet} />

        {/* Stations List */}
        {userLocation && nearestStations.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Nearest Fuel Stations
              </h2>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-1" />
                <span>{nearestStations.length} stations found</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearestStations.map((station) => (
                <StationCard
                  key={station.id}
                  station={station}
                  onRequestAssistance={handleRequestAssistance}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!userLocation && (
          <div className="mt-12 text-center">
            <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Ready to Help You
            </h3>
            <p className="text-gray-600">
              Enter your location above to find nearby fuel stations
            </p>
          </div>
        )}
      </main>

      {/* Request Modal */}
      {userLocation && (
        <RequestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          station={selectedStation}
          userLocation={userLocation}
          onSuccess={handleRequestSuccess}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            Lite Road Assistance - Serving Cairo, Giza, and 6th of October
          </p>
        </div>
      </footer>
    </div>
  );
}
