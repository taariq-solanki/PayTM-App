import { useRecoilState } from "recoil";
import { Button } from "../components/buttons";
import { Heading } from "../components/heading";
import { InputBox } from "../components/inputbox";
import { sendAmountAtom, toAtom } from "../atoms/transaction";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export function SendMoney(){
  const [searchParams] = useSearchParams();
  const id = searchParams.get("to");
  const name=searchParams.get("name")
  const [sendAmount,setSendAmount]=useRecoilState(sendAmountAtom)
  const [to,setTo]=useRecoilState(toAtom)
  const navigate=useNavigate()

   
    return <div className="flex justify-center h-screen bg-zinc-500">
    <div className="flex flex-col justify-center">
        <div className="shadow-2xl p-4 text-center bg-slate-50 max-h-full max-w-80	 justify-center rounded-2xl border-solid border-1 border-orange-500">
          <Heading label={"Money Transfer"}></Heading>
          <div>
          <div className="flex py-3 px-10"> 
            <div className="rounded-full mr-5 mt-1 border-4 border-gray-200 size-11
               bg-orange-500 px-3"><button className=" text-2xl  bg-transparent text-white font-semibold ">{name[0].toUpperCase()}</button></div>
            <div className=" text-4xl">{name}</div>
        </div>
          </div>
          <div className="px-10">
                <InputBox label={"Amount"} placeholder={"Enter amount"} onChange={function(e){
                  setSendAmount(e.target.value)
                  
                }}></InputBox>

          </div>
          <Button label={"send"} onClick={async function(){
            
            setTo(id)
            try{
              console.log(id,sendAmount)
              const response=await axios({
                method:"POST",
                url:"http://localhost:3000/api/v1/account/transfer",
                headers:{Authorization:localStorage.getItem("token")},
                data:{
                  to:id,
                  amount:sendAmount
                }
                 })
                 alert(response.data.msg)
                 navigate('/dashboard')
                 
            }catch{
              alert("something went wrong")
            }

            

            
          }}></Button>

        </div>
    
    </div>
    
</div>
}