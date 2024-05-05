import { useNavigate } from "react-router-dom";
import { Button } from "../components/buttons";
import { Heading } from "../components/heading";
import { InputBox } from "../components/inputbox";
import { SubHeading } from "../components/subheading";
import { BottomText } from "../components/bottomText";
import { useRecoilState, useRecoilValue } from "recoil";
import { LastNameAtom, emailAtom, firstNameAtom, passwordAtom } from "../atoms/name";
import axios from "axios";



export function SignUp(){
    const[firstName,setFirstName]=useRecoilState(firstNameAtom)
    const[lastName,setLastName]=useRecoilState(LastNameAtom)
    const[email,setEmail]=useRecoilState(emailAtom)
    const[password,setPassword]=useRecoilState(passwordAtom)
    const navigate=useNavigate()

    return <div className="flex justify-center h-screen bg-zinc-500">
        <div className="flex flex-col justify-center">
            <div className="shadow-2xl p-4 text-center bg-slate-50 max-h-full max-w-80	 justify-center rounded-2xl border-solid border-1 border-orange-500">
                <Heading label={"Sign Up"}></Heading>
                <SubHeading label={"create a new account"}/>
                <InputBox label={"Email"} onChange={function(e){
                    setEmail(e.target.value)
                }} placeholder={"xyz@sample.com"} />

                <InputBox label={"First Name"} placeholder={"xyz"} onChange={function(e){
                    setFirstName(e.target.value)
                }}/>
                <InputBox label={"Last Name"} placeholder={"abc"} onChange={function(e){
                    setLastName(e.target.value)
                }}/>
                <InputBox label={"Password"} placeholder={"*******"} type={"Password"} onChange={function(e){
                    setPassword(e.target.value)
                }}/>
                <Button label={"Sign Up"} onClick={async function(){
                    const response=await axios({
                        url:"http://localhost:3000/api/v1/user/signup",
                        method:"POST",
                        headers:{},
                        data:{ 
                            username:email,
                            firstname:firstName,
                            lastname:lastName,
                            password:password
                                }
                        
                    })
                    console.log(response.data)
                    localStorage.setItem("token", "Bearer "+response.data.token)
                    navigate('/dashboard')
                    
                    
                }} ></Button>
                <BottomText label={"Already have an account?"} to={"Sign In"}  link={"/signin"}  ></BottomText>
                
                 
            </div>
        
        </div>
        
    </div>
}