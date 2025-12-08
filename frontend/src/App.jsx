import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import User from './User.jsx'
import Gamble from './Gamble.jsx'
import Coin from './assets/coin_img.png'

function App() {
  const [user, setUser] = useState(null)
  const [tempUser, setTempUser] = useState("")
  const [scores, setScores] = useState([])

  const [popup, setPopup] = useState(true)

  function newTab(web) {
    window.open(web, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
    <Router>
      {popup && (
        <div onClick={() => {setPopup(false)}} className="fixed h-full w-full top-0 left-0 bg-black/50 z-200">
          <div onClick={(e) => e.stopPropagation()} className="fixed flex flex-col h-[85%] w-[80%] md:w-[60%] top-[7.5%] left-[10%] md:left-[20%] bg-[#242424] border-5 border-black justify-center items-center z-201">
            <h1 className="text-white text-3xl font-bold mb-5">Welcome to</h1>
            <h1 className="title text-white text-6xl md:text-8xl font-semibold underline decoration-yellow-500">AristoCards</h1>
            <div className="relative flex w-full h-[40%] items-center justify-center">
              <img src={Coin} className="coin absolute w-[10%] h-auto"/>
            </div>
            <h1 className="text-[20px] pl-[25px] text-white">A subsidiary of <a onClick={() => {newTab("https://elipeters.org")}} className="hover:cursor-pointer text-blue-400 hover:text-blue-500 transition-colors duration-250 ease-in-out">The Eli Peters Foundation</a></h1>
            <button onClick={() => {setPopup(false)}} className="absolute h-15 w-15 -top-5 -right-5 bg-[#141414] text-white text-3xl font-bold border-5 border-black hover:translate-x-1 hover:-translate-y-1 transition-transform duration-500 ease-in-out z-202">X</button>
          </div>
        </div>
      )}
      <Routes>
        <Route path="/" element={<User user={user} setUser={setUser} tempUser={tempUser} setTempUser={setTempUser}/>}/>
        <Route path="/play" element={<Gamble user={user}/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
