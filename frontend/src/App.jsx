import {useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import User from './User.jsx'
import Gamble from './Gamble.jsx'

function App() {
  const [user, setUser] = useState(null)
  const [coins, setCoins] = useState(100)

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<User user={user} setUser={setUser}/>}/>
        <Route path="/play" element={<Gamble user={user} coins={coins} setCoins={setCoins}/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
