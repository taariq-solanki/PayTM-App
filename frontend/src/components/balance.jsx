export default function Balance({amount}){
    return <div className="flex flex-col justify-between shadow-lg p-3 mr-3 bg-white rounded-lg sticky top-20">
        
        <div>
            <div className="text-xl">Account Balance</div>
            <div className="text-5xl font-semibold">₹{amount}/-</div>
            
        </div>
        
    </div>
}