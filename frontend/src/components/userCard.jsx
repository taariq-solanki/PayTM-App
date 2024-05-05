import { useRecoilState } from "recoil";
import { UserComponent } from "./usersComponent";
import { filterAtom } from "../atoms/filter";
import { useEffect } from "react";
import axios from "axios";
import { userAtom } from "../atoms/users";
import { useNavigate } from "react-router-dom";
import { sendAmountAtom, toAtom } from "../atoms/transaction";


export function UserCard(){
    const navigate=useNavigate()
    const[filter,setFilter]=useRecoilState(filterAtom)
    const[users,setUsers]=useRecoilState(userAtom)
    const[sendAmount,setSendAmount]=useRecoilState(sendAmountAtom)
    const[to,setTo]=useRecoilState(toAtom)
    useEffect(function(){
        async function res(){
         const response=await axios({
             method:"GET",
             url:"http://localhost:3000/api/v1/user/bulk?filter="+filter
         })
         setUsers(response.data.users)
         console.log(users)

        }
        res()
        
     },[filter])
     
    return  <div className="rounded-xl bg-white px-3">
        <div ><input className="w-full m-2 mr-4" type="text" placeholder="search" onChange={function(e){
            setFilter(e.target.value)
        }}/></div>
        {users.map(function(i){
           return <UserComponent key={i._id} name={i.firstname} onClick={function(){
            // setTo(i._id)
            // //console.log(i._id)
            // console.log(to)

            navigate('/send?to='+i._id+"&name="+i.firstname)
           }}></UserComponent>
        })}
        
    

    </div> }