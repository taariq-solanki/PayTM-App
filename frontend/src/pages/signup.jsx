import { useNavigate } from "react-router-dom";
import { Button } from "../components/buttons";
import { Heading } from "../components/heading";
import { InputBox } from "../components/inputbox";
import { SubHeading } from "../components/subheading";
import { BottomText } from "../components/bottomText";
import { Message } from "../components/message";
import { useRecoilState } from "recoil";
import { LastNameAtom, emailAtom, firstNameAtom, passwordAtom } from "../atoms/name";
import axios from "axios";
import { useState } from "react";

// 👇 replace with your backend Public IP or domain
import { API_BASE_URL } from "../config";

export function SignUp() {
  const [firstName, setFirstName] = useRecoilState(firstNameAtom);
  const [lastName, setLastName] = useRecoilState(LastNameAtom);
  const [email, setEmail] = useRecoilState(emailAtom);
  const [password, setPassword] = useRecoilState(passwordAtom);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!password) newErrors.password = "Password is required";
    if (email && !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Please enter a valid email";
    if (password && password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setMessage({ type: "", text: "" });
    
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/user/signup`, {
        username: email,
        firstname: firstName,
        lastname: lastName,
        password: password,
      });

      console.log(response.data);
      localStorage.setItem("token", "Bearer " + response.data.token);
      setMessage({ type: "success", text: "Account created successfully! Redirecting..." });
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Signup failed:", error);
      setMessage({ 
        type: "error", 
        text: error.response?.data?.message || "Signup failed. Please try again." 
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <Heading label="Create Account" size="xl" />
            <SubHeading label="Join us today" />
          </div>

          {message.text && (
            <Message 
              type={message.type} 
              message={message.text} 
              onClose={() => setMessage({ type: "", text: "" })}
            />
          )}

          <form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
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
              label="First Name"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={errors.firstName}
              required
            />

            <InputBox
              label="Last Name"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={errors.lastName}
              required
            />

            <InputBox
              label="Password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              required
            />

            <Button
              label="Create Account"
              onClick={handleSignUp}
              loading={loading}
              disabled={loading}
            />
          </form>

          <div className="mt-6 text-center">
            <BottomText
              label="Already have an account?"
              to="Sign In"
              link="/signin"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
