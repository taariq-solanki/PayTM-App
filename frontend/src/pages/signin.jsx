import { BottomText } from "../components/bottomText";
import { Button } from "../components/buttons";
import { Heading } from "../components/heading";
import { InputBox } from "../components/inputbox";
import { SubHeading } from "../components/subheading";
import { Message } from "../components/message";
import { useRecoilState } from "recoil";
import { LastNameAtom, emailAtom, firstNameAtom, passwordAtom } from "../atoms/name";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { useState } from "react";

export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useRecoilState(emailAtom);
  const [password, setPassword] = useRecoilState(passwordAtom);
  const [firstName, setFirstName] = useRecoilState(firstNameAtom);
  const [lastName, setLastName] = useRecoilState(LastNameAtom);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (email && !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Please enter a valid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setMessage({ type: "", text: "" });
    
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/user/signin`, {
        username: email,
        password: password,
      });
      
      const token = response.data.token;
      localStorage.setItem("token", "Bearer " + token);
      setMessage({ type: "success", text: "Sign in successful! Redirecting..." });
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setMessage({ 
        type: "error", 
        text: error.response?.data?.message || "Invalid email or password" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-orange-200">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <Heading label="Welcome Back" size="xl" />
            <SubHeading label="Sign in to your account" />
          </div>

          {message.text && (
            <Message 
              type={message.type} 
              message={message.text} 
              onClose={() => setMessage({ type: "", text: "" })}
            />
          )}

          <form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
            <InputBox
              label="Email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
            />
            <InputBox
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              required
            />
            <Button
              label="Sign In"
              onClick={handleSignIn}
              loading={loading}
              disabled={loading}
            />
          </form>

          <div className="mt-6 text-center">
            <BottomText label="Don't have an account?" to="Sign Up" link="/signup" />
          </div>
        </div>
      </div>
    </div>
  );
}
