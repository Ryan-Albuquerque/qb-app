import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default function AlertBanner({
  error,
  setShowAlert,
}: {
  error: string;
  setShowAlert: (b: boolean) => void;
}) {
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  return (
    <div className="flex flex-row justify-center py-4">
      {" "}
      <div className="fixed md:w-[60%] w-[90%]">
        <Alert
          variant="destructive"
          className="flex flex-row justify-between bg-red-500 text-white"
        >
          <div className="flex gap-4">
            <AlertCircle className="h-4 w-4" color="white" />
            <div>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </div>
          </div>
          <div>
            <button
              onClick={handleCloseAlert}
              className="ml-2 text-white"
              aria-label="Close"
            >
              X
            </button>
          </div>
        </Alert>
      </div>
    </div>
  );
}
