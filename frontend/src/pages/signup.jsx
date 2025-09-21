import { useNavigate } from "react-router-dom";
import { Button } from "../components/buttons";
import { Heading } from "../components/heading";
import { InputBox } from "../components/inputbox";
import { SubHeading } from "../components/subheading";
import { BottomText } from "../components/bottomText";
import { useRecoilState } from "recoil";
import { LastNameAtom, emailAtom, firstNameAtom, passwordAtom } from "../atoms/name";
import axios from "axios";

// 👇 replace with your backend Public IP or domain
const API_BASE_URL = "http://3.6.93.205:3000";

export function SignUp() {
  const [firstName, setFirstName] = useRecoilState(firstNameAtom);
  const [lastName, setLastName] = useRecoilState(LastNameAtom);
  const [email, setEmail] = useRecoilState(emailAtom);
  const [password, setPassword] = useRecoilState(passwordAtom);
  const navigate = useNavigate();

  return (
    <div className="flex justify-center h-screen bg-zinc-500">
      <div className="flex flex-col justify-center">
        <div className="shadow-2xl p-4 text-center bg-slate-50 max-h-full max-w-80 justify-center rounded-2xl border-solid border-1 border-orange-500">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Create a new account"} />

          <InputBox
            label={"Email"}
            placeholder={"xyz@sample.com"}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputBox
            label={"First Name"}
            placeholder={"xyz"}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <InputBox
            label={"Last Name"}
            placeholder={"abc"}
            onChange={(e) => setLastName(e.target.value)}
          />

          <InputBox
            label={"Password"}
            type={"password"}
            placeholder={"*******"}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            label={"Sign Up"}
            onClick={async () => {
              try {
                const response = await axios.post(`${API_BASE_URL}/api/v1/user/signup`, {
                  username: email,
                  firstname: firstName,
                  lastname: lastName,
                  password: password,
                });

                console.log(response.data);
                localStorage.setItem("token", "Bearer " + response.data.token);
                navigate("/dashboard");
              } catch (error) {
                console.error("Signup failed:", error);
                alert("Signup failed! Check console for details.");
              }
            }}
          />

          <BottomText
            label={"Already have an account?"}
            to={"Sign In"}
            link={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}
