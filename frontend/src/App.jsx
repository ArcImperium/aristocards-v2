import {useState} from 'react'
import User from './User.jsx'

function App() {
  const [user, setUser] = useState(null)

  return (
    <>
    <User user={user} setUser={setUser}/>
    </>
  )
}

export default App
