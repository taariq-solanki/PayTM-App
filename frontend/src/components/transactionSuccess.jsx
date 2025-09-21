import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function TransactionSuccess({ amount, recipient, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform animate-bounce-in">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-green-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          
          {/* Success Message */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Transaction Successful!
          </h2>
          <p className="text-gray-600">
            Your money has been transferred successfully
          </p>
        </div>

        {/* Transaction Details */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 animate-slide-up">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600">Amount Sent:</span>
            <span className="text-xl font-bold text-green-600">
              ₹{amount}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">To:</span>
            <span className="font-semibold text-gray-800">
              {recipient}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
          >
            Go to Dashboard
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
          >
            Close
          </button>
        </div>

        {/* Auto redirect notice */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Redirecting to dashboard in 3 seconds...
        </p>
      </div>
    </div>
  );
}
