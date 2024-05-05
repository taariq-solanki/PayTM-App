export function InputBox({label,placeholder,type,onChange}){
    return <div className="grid grid-cols-3 font-medium p-2 justify-items-start ">
        <div className="m-1">{label} </div>
        <div> <input className="m-1 max-w-40 col-span-2 border-2 rounded-lg" type={type} onChange={onChange} placeholder={placeholder} /></div>
    </div>
}