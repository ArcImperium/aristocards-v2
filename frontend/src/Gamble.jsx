import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import Deck from './assets/deck.json'

function Gamble({user, scores}) {
    useEffect(() => {
        if (!user || !scores) return;

        const currentUser = scores.find(s => s.user === user);

        if (currentUser) {
            setCoins(currentUser.score);
        }
    }, [user, scores])

    const [stage, setStage] = useState(false)
    const [bet, setBet] = useState(0)
    const [coins, setCoins] = useState(0)

    const [play, setPlay] = useState([])
    const [comp, setComp] = useState([])
    const [cards, setCards] = useState(Object.keys(Deck))

    const [showBtn, setShowBtn] = useState(true)
    const [showCards, setShowCards] = useState(false)
    const [win, setWin] = useState("IN PROGRESS")

    const nav = useNavigate()

    function yaBet() {
        setCards(prev => [...prev].sort(() => Math.random() - 0.5))

        const ccard1 = cards[0]
        const pcard1 = cards[1]
        const ccard2 = cards[2]
        const pcard2 = cards[3]
        setCards(prev => prev.slice(4))

        setComp([ccard1, ccard2])
        setPlay([pcard1, pcard2])

        setStage(true)
    }

    function getCompHand() {
        const compHand = []

        for (let i = 0; i < comp.length; i++) {
            const goLeft = 2.5 + 2.5 * i

            compHand.push(<div style={{left: `${goLeft}rem`}} className="absolute bottom-0 w-40 h-30 p-2.5 bg-white hover:h-40 transition-all duration-500 ease-in-out border-l-4 border-r-4 border-t-4 border-black">
                {comp[i]}
            </div>)
        }

        return compHand
    }

    function getPlayHand() {
        const playHand = []

        for (let i = 0; i < play.length; i++) {
            const goLeft = 2.5 + 2.5 * i

            playHand.push(<div style={{left: `${goLeft}rem`}} className="absolute bottom-0 w-40 h-30 p-2.5 bg-white hover:h-40 transition-all duration-500 ease-in-out border-l-4 border-r-4 border-t-4 border-black">
                {play[i]}
            </div>)
        }

        return playHand
    }

    function getCompTotal() {
        let compTotal = 0

        for (let i = 0; i < comp.length; i++) {
            const more = Deck[comp[i]]
            compTotal += more
        }

        return compTotal
    }

    function getPlayTotal() {
        let playTotal = 0

        for (let i = 0; i < play.length; i++) {
            const more = Deck[play[i]]
            playTotal += more
        }

        return playTotal
    }

    function hit() {
        const nextCard = cards[0]
        setCards(prev => prev.slice(1))

        setPlay(prev => [...prev, nextCard])

        const playTotal = getPlayTotal()

        if (playTotal > 21) {
            end()
        }
    }

    function stand() {
        setShowBtn(false)

        end()
    }

    function end() {
        const playTotal = getPlayTotal()
        const compTotal = getCompTotal()
        if (playTotal > 21) {
            setWin("Dealer")
        }
        else if (compTotal > 21) {
            setWin("Player")
        }
        else if (compTotal >= playTotal) {
            setWin("Dealer")
        }
        else if (playTotal > compTotal) {
            setWin("Player")
        }
    }

    return(
        <>
        {!user && (<div className="fixed h-full w-full top-0 left-0 bg-black/50 z-100">
            <div className="flex flex-col fixed h-[80%] w-[60%] top-[10%] left-[20%] bg-[#242424] border-5 border-black items-center justify-center">
                <h1 className="text-white text-center text-5xl font-extrabold">NO USER</h1>
                <button onClick={() => {nav("/")}} className="h-15 w-75 bg-[#141414] text-white text-3xl font-extrabold border-5 border-black mt-25 hover:-translate-y-2.5 transition-transform duration-500 ease-in-out">HOME</button>
            </div>
        </div>)}
        <h1 className="w-[80%] md:w-[50%] ml-[10%] md:ml-[25%] text-center p-2.5 text-white text-5xl font-extrabold bg-[#242424] mt-10 border-5 border-black">{user} ({coins})</h1>
        {!stage && (<>
            <div className="flex flex-col md:flex-row w-[80%] ml-[10%] mt-10 p-5 bg-[#242424] border-5 border-black items-center">
                <input type="range" value={bet} min="0" max={coins} onChange={(e) => {setBet(e.target.value)}} className="w-[90%] md:w-[75%] ml-[2.5%]"/>
                <input type="number" value={bet} min="0" max={coins} onChange={(e) => {if (Number(e.target.value) <= coins && Number(e.target.value) > 0) {setBet(Number(e.target.value))} else if (Number(e.target.value) > coins) {setBet(coins)} else {setBet(0)}}} className="w-[75%] mt-5 md:w-[15%] md:mt-0 ml-[5%] p-1 bg-[#141414] text-white text-xl text-center font-bold border-5 border-black overflow-visible"/>
            </div>
            {(bet > 0) && (<button onClick={() => {yaBet()}} className="w-[40%] ml-[30%] h-20 mt-10 bg-[#242424] text-white text-3xl font-bold border-5 border-black hover:-translate-y-2.5 transition-transform duration-500 ease-in-out">BET</button>)}
        </>)}
        {stage && (<>
            {showBtn && (<div className="flex flex-row w-full h-25 justify-center">
                <button onClick={() => {hit()}} className="w-40 h-15 mt-10 bg-[#242424] text-white text-xl font-bold border-5 border-black hover:-translate-y-1 transition-transform duration-500 ease-in-out">HIT</button>
                <button onClick={() => {stand()}} className="w-40 h-15 mt-10 ml-40 bg-[#242424] text-white text-xl font-bold border-5 border-black hover:-translate-y-1 transition-transform duration-500 ease-in-out">STAND</button>
            </div>)}
            <div className="flex flex-col md:flex-row w-[80%] ml-[10%] mt-5 mb-10 bg-[#242424] border-5 border-black">
                <div className="w-[80%] md:w-[42.5%] ml-[10%] md:ml-[5%] mt-10 mb-10">
                    <h1 className="text-white text-3xl text-center font-bold mb-5 underline">Dealer - {getCompTotal()}</h1>
                    <div className="relative w-full h-50 bg-[#141414] border-5 border-black">
                        {getCompHand()}
                    </div>
                </div>
                <div className="w-[80%] md:w-[42.5%] ml-[10%] md:ml-[5%] md:mt-10 mb-10">
                    <h1 className="text-white text-3xl text-center font-bold mb-5 underline">Player - {getPlayTotal()}</h1>
                    <div className="relative w-full h-50 bg-[#141414] border-5 border-black">
                        {getPlayHand()}
                    </div>
                </div>
            </div>
        </>)}
        </>
    )
}

export default Gamble