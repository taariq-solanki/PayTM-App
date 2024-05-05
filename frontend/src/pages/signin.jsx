import { BottomText } from "../components/bottomText";
import { Button } from "../components/buttons";
import { Heading } from "../components/heading";
import { InputBox } from "../components/inputbox";
import { SubHeading } from "../components/subheading";
import { useRecoilState, useRecoilValue } from "recoil";
import { LastNameAtom, emailAtom, firstNameAtom, passwordAtom } from "../atoms/name";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignIn(){
  const navigate=useNavigate()
  const[email,setEmail]=useRecoilState(emailAtom)
  const[password,setPassword]=useRecoilState(passwordAtom)
  const[firstName,setfirstName]=useRecoilState(firstNameAtom)
  const[lastName,setlastName]=useRecoilState(LastNameAtom)

    return  <div className="flex justify-center h-screen bg-zinc-500">
    <div className="flex flex-col justify-center">
        <div className="shadow-2xl p-4 text-center bg-slate-50 max-h-full max-w-80	 justify-center rounded-2xl border-solid border-1 border-orange-500">
          <Heading label={"Sign In"}></Heading>
          <SubHeading label={"Log In to Your account"}></SubHeading>   
          <InputBox label={"Email"} placeholder={"xyz@gmail.com"} onChange={function(e){
            setEmail(e.target.value)
          }}></InputBox>
          <InputBox label={"Password"} placeholder={"********"} type={"Password"} onChange={function(e){
            setPassword(e.target.value)
          }}></InputBox>
          <Button label={"Sign In"} onClick={async function(){
            
            try{
              console.log("from signin")
              const response=await axios({
                method:"POST",
                data:{
                  username:email,
                  password:password
                },
                
                url:"http://localhost:3000/api/v1/user/signin"
              })
              const token=response.data.token
              localStorage.setItem("token", "Bearer "+token)
             // localStorage.setItem("userId", response.data.info.userId)
             // console.log(response.data.info.userId)
              
              navigate('/dashboard')
              

              
            }
            catch{
              alert("invalid input")
              console.log(12)
            }
            
          }}></Button>
          <BottomText label={"Don't have an account?"} to={"Sign Up"}  link={"/signup"} ></BottomText>

        </div>
    
    </div>
    
</div>
}