import { useRecoilState } from "recoil"
import { Appbar } from "../components/appbar"
import Balance from "../components/balance"
import { Heading } from "../components/heading"
import { UserCard } from "../components/userCard"
import { UserComponent } from "../components/usersComponent"
import { LastNameAtom, firstNameAtom } from "../atoms/name"
import { amountAtom } from "../atoms/amount"
import { useEffect } from "react"
import axios from "axios"
import { Logout } from "../components/logout"

export function Dashboard(){
    let [firstName,setFirstName]=useRecoilState(firstNameAtom)
    let [lastName,setLastName]=useRecoilState(LastNameAtom)
    const [amount,setAmount]=useRecoilState(amountAtom)

    useEffect( function(){
            async function res(){
                const response=await axios({
                    method:"GET",
                    url:"http://localhost:3000/api/v1/account/balance",
                    headers:{
                        
                        Authorization:localStorage.getItem("token")
                    }
                    
        
                })
                setAmount(response.data.balance)
                setFirstName(response.data.firstname)
                setLastName(response.data.lastname)

            }
            res()
        
        //console.log(response.data)
        
        
    },[amount,firstName,lastName])

    return <div className="">
        <div className=" bg-orange-500 p-1">
            <div className="shadow-2xl">
                <Appbar label={firstName+" "+lastName}></Appbar>
                <div className="border-2 mt-1 h-150 min-h-96 max-h-full bg-gray-100 border-slate-900 p-3 divide-black rounded-xl grid grid-cols-5 divide-x ">
                    <div><div><Balance amount={amount}></Balance> </div>
                        <div><Logout/></div>
                        
                    </div>
                    <div className="col-span-4 px-2"> 
                        <div className="pb-3 pt-2 mb-1 px-3 bg-white rounded-lg"><Heading label={"Users"}></Heading></div>
                        <UserCard></UserCard>

                    </div>
                
               
                </div>
            </div>
        </div>
     
        

    </div>
}