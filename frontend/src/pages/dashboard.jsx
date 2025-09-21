import { useRecoilState } from "recoil";
import { Appbar } from "../components/appbar";
import Balance from "../components/balance";
import { Heading } from "../components/heading";
import { UserCard } from "../components/userCard";
import { LastNameAtom, firstNameAtom } from "../atoms/name";
import { amountAtom } from "../atoms/amount";
import { useEffect } from "react";
import axios from "axios";
import { Logout } from "../components/logout";
import { API_BASE_URL } from "../config";

export function Dashboard() {
  let [firstName, setFirstName] = useRecoilState(firstNameAtom);
  let [lastName, setLastName] = useRecoilState(LastNameAtom);
  const [amount, setAmount] = useRecoilState(amountAtom);

  useEffect(() => {
    async function res() {
      const response = await axios.get(`${API_BASE_URL}/api/v1/account/balance`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setAmount(response.data.balance);
      setFirstName(response.data.firstname);
      setLastName(response.data.lastname);
    }
    res();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg">
        <Appbar label={firstName + " " + lastName} />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <Balance amount={amount} />
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Logout />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <Heading label="Users" size="lg" />
                <div className="flex items-center space-x-2 text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <span className="text-sm">All Users</span>
                </div>
              </div>
              <UserCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
