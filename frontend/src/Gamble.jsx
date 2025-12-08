import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {doc, getDoc, updateDoc} from "firebase/firestore"
import {db} from "./firebase.jsx"
import Deck from './assets/deck.json'

function Gamble({user}) {
    useEffect(() => {
        if (!user) {return}

        async function getScores() {
            try {
                const userRef = doc(db, "scores", user)
                const userExists = await getDoc(userRef)

                if (userExists.exists()) {
                    setCoins(userExists.data().score)
                }
                else {
                    setCoins(0)
                }
            }
            catch (err) {
                console.error("Failed to get score:", err)
            }
        }

        getScores()
    }, [user])

    const [stage, setStage] = useState(false)
    const [bet, setBet] = useState(0)
    const [coins, setCoins] = useState(0)

    const [play, setPlay] = useState([])
    const [comp, setComp] = useState([])
    const [cards, setCards] = useState(Object.keys(Deck))

    const [showBtn, setShowBtn] = useState(true)
    const [showCards, setShowCards] = useState(false)
    const [win, setWin] = useState("In Progress")

    const nav = useNavigate()

    async function updateScore(newScore) {
        try {
            const userRef = doc(db, "scores", user)
            await updateDoc(userRef, {score: newScore})
        }
        catch (err) {
            console.error("Failed to update score:", err)
        }
    }

    function yaBet() {
        const newScore = coins - bet
        setCoins(newScore)
        updateScore(newScore)

        const shuffled = [...cards].sort(() => Math.random() - 0.5)

        const ccard1 = shuffled[0]
        const pcard1 = shuffled[1]
        const ccard2 = shuffled[2]
        const pcard2 = shuffled[3]
        setCards(shuffled.slice(4))

        setComp([ccard1, ccard2])
        setPlay([pcard1, pcard2])

        setStage(true)
    }

    function getCompHand() {
        const compHand = []

        if (showCards) {
            for (let i = 0; i < comp.length; i++) {
                const goLeft = 2.5 + 2.5 * i

                compHand.push(<div style={{left: `${goLeft}rem`}} className="absolute bottom-0 w-40 h-30 p-2.5 bg-white hover:h-40 transition-all duration-500 ease-in-out border-l-4 border-r-4 border-t-4 border-black">
                    {comp[i]}
                </div>)
            }
        }
        else if (!showCards) {
            compHand.push(<div style={{left: `2.5rem`}} className="absolute bottom-0 w-40 h-30 p-2.5 bg-red-800 hover:h-40 transition-all duration-500 ease-in-out border-l-4 border-r-4 border-t-4 border-black"></div>)
            compHand.push(<div style={{left: `5rem`}} className="absolute bottom-0 w-40 h-30 p-2.5 bg-white hover:h-40 transition-all duration-500 ease-in-out border-l-4 border-r-4 border-t-4 border-black">
                {comp[1]}
            </div>)
        }

        return compHand
    }

    function getPlayHand() {
        const playHand = []

        if (showCards) {
            for (let i = 0; i < play.length; i++) {
                const goLeft = 2.5 + 2.5 * i

                playHand.push(<div style={{left: `${goLeft}rem`}} className="absolute bottom-0 w-40 h-30 p-2.5 bg-white hover:h-40 transition-all duration-500 ease-in-out border-l-4 border-r-4 border-t-4 border-black">
                    {play[i]}
                </div>)
            }
        }
        else if (!showCards) {
            for (let i = 0; i < play.length; i++) {
                const goLeft = 2.5 + 2.5 * i

                if (i === 1) {
                    playHand.push(<div style={{left: `${goLeft}rem`}} className="absolute bottom-0 w-40 h-30 p-2.5 bg-white hover:h-40 transition-all duration-500 ease-in-out border-l-4 border-r-4 border-t-4 border-black">
                        {play[i]}
                    </div>)}
                else {
                    playHand.push(<div style={{left: `${goLeft}rem`}} className="absolute bottom-0 w-40 h-30 p-2.5 bg-red-800 hover:bg-white hover:h-40 text-red-800 hover:text-black transition-all duration-500 ease-in-out border-l-4 border-r-4 border-t-4 border-black">
                        {play[i]}
                    </div>)
                }
            }
        }

        return playHand
    }

    function getCompTotal() {
        let compTotal = 0
        let ace = 0

        if (showCards) {
            for (let i = 0; i < comp.length; i++) {
                const more = Deck[comp[i]]
                if (more === 11) {ace++}
                compTotal += more
            }
        }   
        else if (!showCards) {
            compTotal = Deck[comp[1]]
        }

        while (compTotal > 21 && ace > 0) {
            compTotal -= 10
            ace--
        }

        return compTotal
    }

    function getPlayTotal() {
        let playTotal = 0
        let ace = 0

        for (let i = 0; i < play.length; i++) {
            const more = Deck[play[i]]
            if (more === 11) {ace++}
            playTotal += more
        }

        while (playTotal > 21 && ace > 0) {
            playTotal -= 10
            ace--
        }

        return playTotal
    }

    function hit() {
        let otherCards = [...cards]
        const nextCard = otherCards[0]
        const newHand = [...play, nextCard]
        otherCards = otherCards.slice(1)

        setCards(otherCards)
        setPlay(newHand)

        let playTotal = 0
        let ace = 0

        for (let i = 0; i < newHand.length; i++) {
            const more = Deck[newHand[i]]
            if (more === 11) {ace++}
            playTotal += more
        }

        while (playTotal > 21 && ace > 0) {
            playTotal -= 10
            ace--
        }

        if (playTotal > 21) {
            setShowBtn(false)
            setShowCards(true)
            end("bust", playTotal)
        }
    }

    function stand() {
        setShowBtn(false)
        setShowCards(true)

        let dealerHand = [...comp]
        let otherCards = [...cards]
        let compTotal = 0
        let ace = 0
        
        for (let i = 0; i < dealerHand.length; i++) {
                const more = Deck[dealerHand[i]]
                if (more === 11) {ace++}
                compTotal += more
            }
        
        while (compTotal > 21 && ace > 0) {
            compTotal -= 10
            ace--
        }

        while (compTotal < 17) {
            const nextCard = otherCards[0]
            otherCards = otherCards.slice(1)
            
            dealerHand.push(nextCard)

            let nextVal = Deck[nextCard]
            if (nextVal === 11) {ace++}
            compTotal += nextVal

            while (compTotal > 21 && ace > 0) {
                compTotal -= 10
                ace--
            }
        }

        setComp(dealerHand)
        setCards(otherCards)

        end("stand", compTotal)
    }

    function end(how, total) {
        let playTotal = 0
        let compTotal = 0
        if (how === "bust") {
            playTotal = total
            compTotal = getCompTotal()
        }
        else if (how === "stand") {
            playTotal = getPlayTotal()
            compTotal = total
        }

        let winner = ""

        if (playTotal > 21) {
            winner = "Dealer"
        }
        else if (compTotal > 21) {
            winner = "Player"
        }
        else if (compTotal >= playTotal) {
            winner = "Dealer"
        }
        else if (playTotal > compTotal) {
            winner = "Player"
        }

        setWin(winner)

        if (winner === "Player") {
            const newScore = coins + bet * 2
            setCoins(newScore)
            updateScore(newScore)
        }
    }

    function next() {
        setStage(false)
        setWin("In Progress")
        setBet(0)
        setShowBtn(true)
        setShowCards(false)
        setCards(Object.keys(Deck))
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
                <input type="range" value={bet} min="0" max={coins} onChange={(e) => {setBet(Number(e.target.value))}} className="w-[90%] md:w-[75%] ml-[2.5%]"/>
                <input type="number" value={bet} min="0" max={coins} onChange={(e) => {if (Number(e.target.value) <= coins && Number(e.target.value) > 0) {setBet(Number(e.target.value))} else if (Number(e.target.value) > coins) {setBet(coins)} else {setBet(0)}}} className="w-[75%] mt-5 md:w-[15%] md:mt-0 ml-[5%] p-1 bg-[#141414] text-white text-xl text-center font-bold border-5 border-black overflow-visible"/>
            </div>.
            <div className="flex flex-row">
                <button onClick={() => {nav('/')}} className="w-[35%] ml-[10%] h-20 mt-10 bg-[#242424] text-white text-3xl font-bold border-5 border-black hover:-translate-y-2.5 transition-transform duration-500 ease-in-out">HOME</button>
                {(bet > 0) && (<button onClick={() => {yaBet()}} className="w-[35%] ml-[10%] h-20 mt-10 bg-[#242424] text-white text-3xl font-bold border-5 border-black hover:-translate-y-2.5 transition-transform duration-500 ease-in-out">BET/DEAL</button>)}
            </div>
        </>)}
        {stage && (<>
            <div className="flex flex-row w-full h-25 justify-center">
                {showBtn && (<>
                    <button onClick={() => {hit()}} className="w-40 h-15 mt-10 bg-[#242424] text-white text-xl font-bold border-5 border-black hover:-translate-y-1 transition-transform duration-500 ease-in-out">HIT</button>
                    <button onClick={() => {stand()}} className="w-40 h-15 mt-10 ml-40 bg-[#242424] text-white text-xl font-bold border-5 border-black hover:-translate-y-1 transition-transform duration-500 ease-in-out">STAND</button>
                </>)}
                {!showBtn && (<button onClick={() => {next()}} className="w-80 h-15 mt-10 bg-[#242424] text-white text-xl font-bold border-5 border-black hover:-translate-y-1 transition-transform duration-500 ease-in-out">NEXT</button>)}
            </div>
            <div className="flex flex-col md:flex-row w-[80%] ml-[10%] mt-5 mb-2.5 bg-[#242424] border-5 border-black">
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
            <div className="flex flex-col w-[90%] ml-[5%] mb-5 justify-center">
                <h1 className="w-full text-2xl font-extrabold text-white text-center">Bet: {bet}</h1>
                <h1 className="w-full text-2xl font-extrabold text-white text-center">Winner: {win}</h1>
            </div>
        </>)}
        </>
    )
}

export default Gamble