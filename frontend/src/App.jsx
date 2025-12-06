import {useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import User from './User.jsx'
import Gamble from './Gamble.jsx'

function App() {
  const [user, setUser] = useState(null)

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<User user={user} setUser={setUser}/>}/>
        <Route path="/play" element={<Gamble user={user}/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
