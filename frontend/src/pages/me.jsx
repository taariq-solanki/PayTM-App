import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Me(){
    const navigate=useNavigate()
    useEffect(function(){
        if(localStorage.getItem("token")){
            console.log(1)
            navigate('/dashboard')
        }else{
            console.log(12)
    
            navigate('/signup')
        }
    },[navigate])
  
    
    return <div>loading..</div>
}