import { Home, Login, Profile, Register } from './pages/'
import Overlay from './components/overlay/Overlay'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { AuthContext } from './context/AuthContext'

const App = () => {
  const { user, darkTheme, overlay, dispatch } = useContext(AuthContext)
  useEffect(()=> {
    if (sessionStorage.getItem('currentUser')) {
      const getUser = async () => {
          currUser = await JSON.parse(sessionStorage.getItem('currentUser'))
          console.log('FETCHED FROM THE SESSION STORAGE , user: ')
          console.log(currUser)
          dispatch({type: "SET_USER_TOKEN", payload: currUser})
      }
      getUser()
  }
  },[])
  return (
    <div className={`App ${darkTheme && `darkTheme`}`}>
      <Router>
        {overlay && <Overlay />}
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
