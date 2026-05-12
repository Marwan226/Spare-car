import { CheckCircle, Phone, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ConfirmationPageProps {
  requestId: string;
  onBackToHome: () => void;
}

export default function ConfirmationPage({
  requestId,
  onBackToHome,
}: ConfirmationPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Request Received!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Your Request ID:</p>
            <p className="text-xl font-mono font-bold text-blue-600">
              {requestId}
            </p>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <p className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                Your assistance request has been successfully submitted to the
                nearest fuel station.
              </span>
            </p>
            <p className="flex items-start">
              <Phone className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                The station will contact you within{" "}
                <strong>15-30 minutes</strong> to confirm and provide
                assistance.
              </span>
            </p>
            <p className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                Please keep your phone accessible and wait at your current
                location.
              </span>
            </p>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600 mb-3">
              Save your request ID for reference. You can also contact the
              station directly if needed.
            </p>
            <Button onClick={onBackToHome} className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
