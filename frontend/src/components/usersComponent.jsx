import { Button } from "./buttons";
import { Heading } from "./heading";

export function UserComponent({name,onClick}){
    return <div className="flex justify-between py-2 border-t-2 border-gray-100  ">
        <div className="flex"> 
            <div className="rounded-full mr-5 mt-1 border-4 border-gray-200 size-11
               bg-black px-3"><button className=" text-2xl  bg-transparent text-white font-semibold ">{name[0].toUpperCase()}</button></div>
            <div className=" text-4xl">{name}</div>
        </div>
        
         <button onClick={onClick} className="bg-orange-500 px-20 rounded-lg text-white font-bold text-2xl">SEND</button>
    </div>
}