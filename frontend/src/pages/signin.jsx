import { BottomText } from "../components/bottomText";
import { Button } from "../components/buttons";
import { Heading } from "../components/heading";
import { InputBox } from "../components/inputbox";
import { SubHeading } from "../components/subheading";
import { useRecoilState } from "recoil";
import { LastNameAtom, emailAtom, firstNameAtom, passwordAtom } from "../atoms/name";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useRecoilState(emailAtom);
  const [password, setPassword] = useRecoilState(passwordAtom);
  const [firstName, setFirstName] = useRecoilState(firstNameAtom);
  const [lastName, setLastName] = useRecoilState(LastNameAtom);

  return (
    <div className="flex justify-center h-screen bg-zinc-500">
      <div className="flex flex-col justify-center">
        <div className="shadow-2xl p-4 text-center bg-slate-50 max-h-full max-w-80 justify-center rounded-2xl border-solid border-1 border-orange-500">
          <Heading label={"Sign In"} />
          <SubHeading label={"Log In to Your account"} />
          <InputBox
            label={"Email"}
            placeholder={"xyz@gmail.com"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            label={"Password"}
            placeholder={"********"}
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            label={"Sign In"}
            onClick={async () => {
              try {
                const response = await axios.post(`${API_BASE_URL}/api/v1/user/signin`, {
                  username: email,
                  password: password,
                });
                const token = response.data.token;
                localStorage.setItem("token", "Bearer " + token);
                navigate("/dashboard");
              } catch {
                alert("Invalid input");
              }
            }}
          />
          <BottomText label={"Don't have an account?"} to={"Sign Up"} link={"/signup"} />
        </div>
      </div>
    </div>
  );
}
