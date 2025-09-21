import { useNavigate } from "react-router-dom";
import { Button } from "./buttons";

export function Logout() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/signin');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="text-center">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Sign Out</h3>
        <p className="text-sm text-gray-600 mb-4">Are you sure you want to sign out?</p>
        <Button
          label="Sign Out"
          onClick={handleLogout}
          variant="danger"
        />
      </div>
    </div>
  );
}