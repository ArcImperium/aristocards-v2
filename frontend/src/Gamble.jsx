import {useState} from "react"
import {useNavigate} from "react-router-dom"

function Gamble({user, coins, setCoins}) {
    const [stage, setStage] = useState(false)
    const [bet, setBet] = useState(0)

    const nav = useNavigate()

    return(
        <>
        {!user && (<div className="fixed h-full w-full top-0 left-0 bg-black/50 z-100">
            <div className="flex flex-col fixed h-[80%] w-[60%] top-[10%] left-[20%] bg-[#242424] border-5 border-black items-center justify-center">
                <h1 className="text-white text-center text-5xl font-extrabold">NO USER</h1>
                <button onClick={() => {nav("/")}} className="h-15 w-75 bg-[#141414] text-white text-3xl font-extrabold border-5 border-black mt-25 hover:-translate-y-2.5 transition-transform duration-500 ease-in-out">HOME</button>
            </div>
        </div>)}
        <h1 className="w-[50%] ml-[25%] h-20 text-center p-2.5 text-white text-5xl font-extrabold bg-[#242424] mt-10 border-5 border-black">{user}</h1>
        {!stage && (<>
            <div className="flex flex-col md:flex-row w-[80%] ml-[10%] mt-10 p-5 bg-[#242424] border-5 border-black items-center">
                <input type="range" value={bet} min="0" max={coins} onChange={(e) => {setBet(e.target.value)}} className="w-[90%] md:w-[75%] ml-[2.5%]"/>
                <input type="number" value={bet} min="0" max={coins} onChange={(e) => {if (Number(e.target.value) <= coins && Number(e.target.value) > 0) {setBet(Number(e.target.value))} else if (Number(e.target.value) > coins) {setBet(coins)} else {setBet(0)}}} className="w-[75%] mt-5 md:w-[15%] md:mt-0 ml-[5%] p-1 bg-[#141414] text-white text-xl text-center font-bold border-5 border-black overflow-visible"/>
            </div>
        </>)}
        {stage && (<>
            <div className="w-[80%] bg-[#242424]"></div>
        </>)}
        </>
    )
}

export default Gamble