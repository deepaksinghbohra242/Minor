/* This example requires Tailwind CSS v2.0+ */
import { CheckCircleIcon } from "@heroicons/react/solid";

export default function AccountVerificationSuccessAlert() {
  return (
    <div className="rounded-md bg-green-800 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-5 w-5 text-green-200"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-yellow-500">
            Email is successfully sent to your Email
          </p>
        </div>
      </div>
    </div>
  );
}
