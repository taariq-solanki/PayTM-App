import { Heading } from "./heading";

export function Appbar({ label }) {
  return (
    <div className="flex justify-between items-center px-6 py-4 text-white">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
        <div className="text-2xl font-bold">PayTM</div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="hidden md:block text-sm opacity-90">
          Welcome back, <span className="font-semibold">{label}</span>
        </div>
        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-lg font-semibold">
          {label ? label[0].toUpperCase() : 'U'}
        </div>
      </div>
    </div>
  );
}