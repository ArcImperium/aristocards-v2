import {useState} from "react"

function User({user, setUser}) {
    const [tempUser, setTempUser] = useState("")

    function login() {
        setUser(tempUser)
    }

    return(
        <>
        <div className="hidden md:block fixed h-[90%] w-[20%] top-[5%] left-[5%] bg-[#242424] border-5 border-black">
            Leaderboard
        </div>
        <button className="block md:hidden fixed h-5 w-5 top-[5%] left-[5%] bg-[#242424] text-white">≡</button>
        <div className="flex flex-col fixed w-[80%] md:w-[50%] h-[80%] top-[10%] right-[10%] bg-[#242424] border-5 border-black items-center">
            <h1 className="text-white text-3xl font-extrabold mt-35">USERNAME:</h1>
            <input type="text" value={tempUser} onChange={(e) => {setTempUser(e.target.value)}} className="bg-white border-5 border-black text-xl font-bold pl-5 h-15 w-100 mt-5"/>
            <button onClick={() => {login()}} className="bg-[#141414] text-white text-xl font-extrabold border-5 border-black h-10 w-50 mt-10 hover:-translate-y-1 transition-transform duration-500 ease-in-out">SUBMIT</button>
        </div>
        </>
    )
}

export default User