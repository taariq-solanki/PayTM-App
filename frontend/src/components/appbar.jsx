import { Heading } from "./heading";

export function Appbar({label}){
    return <div className="sticky top-0  flex justify-between border-2 bg-white border-slate-900 px-5 py-4 p-2 rounded-xl">
        <div className=" text-3xl font-bold">PayTm Clone</div>
        <div className="flex justify-between">
            <div className="p-2">Hello, {label}</div>
            <div className="pl-4 pr-4 ml-2 text-2xl text-white rounded-full bg-orange-500">{label[0]}</div>
        </div>
        
    </div>
}