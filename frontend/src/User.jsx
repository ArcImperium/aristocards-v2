import {useState} from "react"

function User({user, setUser}) {
    const [tempUser, setTempUser] = useState("")
    const [showLead, setShowLead] = useState(false)

    function login() {
        setUser(tempUser)
    }

    return(
        <>
        <div className="hidden md:block fixed h-[90%] w-[30%] top-[5%] left-[5%] bg-[#242424] border-5 border-black">
            <h1 className="text-white text-2xl font-extrabold text-center mt-5">Leaderboard</h1>
        </div>
        {showLead && (
            <div className="block md:hidden fixed h-full w-full top-0 left-0 bg-black/50 z-100">
                <div className="fixed h-[90%] w-[60%] top-[5%] left-[5%] bg-[#242424] border-5 border-black">
                    <h1 className="text-white text-2xl font-extrabold text-center mt-5">Leaderboard</h1>
                </div>
                <button onClick={() => {setShowLead(false)}} className="block md:hidden fixed h-10 w-10 top-[5%] left-[66%] bg-[#242424] text-white border-4 border-black text-xl font-bold">≡</button>
            </div>
        )}
        <button onClick={() => {setShowLead(true)}} className="block md:hidden fixed h-10 w-10 top-[10%] left-[5%] bg-[#242424] text-white border-4 border-black text-xl font-bold">≡</button>
        <div className="flex flex-col fixed w-[80%] md:w-[50%] h-[80%] top-[10%] right-[5%] bg-[#242424] border-5 border-black items-center">
            <h1 className="text-white text-3xl font-extrabold mt-35">USERNAME:</h1>
            <input type="text" value={tempUser} onChange={(e) => {setTempUser(e.target.value)}} className="bg-white border-5 border-black text-xl font-bold pl-5 h-15 w-100 mt-5"/>
            <button onClick={() => {login()}} className="bg-[#141414] text-white text-xl font-extrabold border-5 border-black h-10 w-50 mt-10 hover:-translate-y-1 transition-transform duration-500 ease-in-out">SUBMIT</button>
        </div>
        </>
    )
}

export default User