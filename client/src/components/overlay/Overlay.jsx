import './overlay.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Overlay = () => {
    const { overlay, dispatch } = useContext(AuthContext)
    return (
        <div className='overlay-invisible' onClick={() => { overlay ? dispatch({ type: "OVERLAY_OFF" }) : dispatch({ type: "OVERLAY_ON" }) }}></div>
    )
}

export default Overlay