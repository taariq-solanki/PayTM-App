import { Navigate, useNavigate } from "react-router-dom";


export function BottomText({to,label,link}){
    const navigate=useNavigate()
    return <div className="flex justify-center m-2 text-slate-600">
        <div>{label}</div>
        <div> <button onClick={function(){
            navigate(link)
        }} > <a className="underline decoration-orange-500 font-medium">{to}</a> </button></div>
       
    </div>
}