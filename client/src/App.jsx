import { Home, Login, Profile, Register } from './pages/'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

const App = () => {
  const { user, darkTheme } = useContext(AuthContext)

  return (
    <div className={`App ${darkTheme && `darkTheme`}`}>
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
