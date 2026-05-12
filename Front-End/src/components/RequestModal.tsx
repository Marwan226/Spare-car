import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { StationWithDistance, UserLocation, ServiceRequest } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  station: StationWithDistance | null;
  userLocation: UserLocation;
  onSuccess: (requestId: string) => void;
}

export default function RequestModal({
  isOpen,
  onClose,
  station,
  userLocation,
  onSuccess,
}: RequestModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [carType, setCarType] = useState("");
  const [issue, setIssue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!station) return;

    if (!name || !phone || !carType || !issue) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const requestData: ServiceRequest = {
      name,
      phone,
      carType,
      issue,
      userLocation,
      stationId: station.id,
    };

    setIsSubmitting(true);

    try {
      // For MVP, we'll simulate the backend call
      // In production, this would be: const response = await fetch('http://localhost:5000/request-service', {...})

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate a mock request ID
      const requestId = `REQ-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)
        .toUpperCase()}`;

      // Store request in localStorage as fallback
      const requests = JSON.parse(
        localStorage.getItem("serviceRequests") || "[]"
      );
      requests.push({
        ...requestData,
        requestId,
        timestamp: new Date().toISOString(),
        stationName: station.name,
      });
      localStorage.setItem("serviceRequests", JSON.stringify(requests));

      toast({
        title: "Request Submitted",
        description: "Your assistance request has been received.",
      });

      onSuccess(requestId);

      // Reset form
      setName("");
      setPhone("");
      setCarType("");
      setIssue("");
      onClose();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Unable to submit your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!station) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Request Road Assistance</DialogTitle>
          <DialogDescription>
            Station: {station.name} ({station.distance} km away)
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name *</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+20 XXX XXX XXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="carType">Car Type *</Label>
            <Input
              id="carType"
              placeholder="e.g., Toyota Corolla 2020"
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="issue">Problem Description *</Label>
            <Textarea
              id="issue"
              placeholder="Describe the issue with your car..."
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
            <p>
              <strong>Your Location:</strong>
            </p>
            <p>
              Lat: {userLocation.latitude.toFixed(4)}, Lon:{" "}
              {userLocation.longitude.toFixed(4)}
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
