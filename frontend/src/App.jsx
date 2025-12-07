import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import User from './User.jsx'
import Gamble from './Gamble.jsx'

function App() {
  const [user, setUser] = useState(null)
  const [tempUser, setTempUser] = useState("")
  const [scores, setScores] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/scores")
      .then(res => res.json())
      .then(data => setScores(data))
    }, [])

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<User user={user} setUser={setUser} tempUser={tempUser} setTempUser={setTempUser} scores={scores}/>}/>
        <Route path="/play" element={<Gamble user={user} scores={scores}/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
