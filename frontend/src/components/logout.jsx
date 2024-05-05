import { useNavigate } from "react-router-dom";
import { Button } from "./buttons";

export function Logout(){
    const navigate=useNavigate()
    return <div className="flex flex-col justify-between shadow-lg p-1 mr-3 mt-4 bg-white rounded-lg sticky top-20">
        
    <div className="">
        <button onClick={function(){
            localStorage.removeItem("token")
            navigate('/signup')

        }} className="m-2  middle none center w-11/12 rounded-lg bg-orange-500 mx-2 py-3 px-6 font-sans text-xs font-bold uppercase text-white
     shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] 
     focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" >Logout</button>
        
    </div>
    
</div>
}