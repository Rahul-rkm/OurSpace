import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import Register from './pages/register/Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
function App() {
  const { user } = useContext(AuthContext)

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home user={user} />} />
          <Route path='/login' element={<Login userAuth={user} />} />
          <Route path='/register' element={<Register userAuth={user} />} />
          <Route path='/profile/:username' element={<Profile />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
