import { House } from "lucide-react";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 ">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative flex justify-center items-center select-none">
          <h1 className="text-9xl font-black  tracking-widest animate-pulse">
            404
          </h1>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Frankly, my dear, this page doesn't exist.
          </h2>
          <p className="text-sec text-base">
            Let’s head back to the main lobby before the curtains close.
          </p>
        </div>

        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-background bg-primary rounded-lg shadow-lg hover:bg-opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            <House className="mr-2" /> Rewind
          </Link>
        </div>
      </div>
    </div>
  );
}
