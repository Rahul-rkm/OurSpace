import { useRef, useContext, useState } from "react"
import "./login.css"
import { loginCall } from "../../apiCalls"
import { AuthContext } from "../../context/AuthContext"
import { Navigate, useNavigate } from "react-router-dom"
// import { CircularProgress } from "@mui/material"

const Login = ({ userAuth }) => {
    if (userAuth) {
        return <Navigate to="/" />
    }
    const navigate = useNavigate()
    const email = useRef()
    const password = useRef()
    const { user, isFetching, error, dispatch } = useContext(AuthContext)

    const [loginErr, setLoginErr] = useState({ type: null, message: null });

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await loginCall({ email: email.current.value, password: password.current.value }, dispatch)
        if (res?.type !== null) {
            setLoginErr(res);
        }
    }

    const clickHandler = (e) => {
        e.preventDefault()
        navigate("/register")
    }

    console.log(user)
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">OurSpace</h3>
                    <span className="loginDesc">Connect with your friends and world, make your own space on OurSpace. </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input type="email" required className="loginInput" placeholder="Email" ref={email} />
                        {(loginErr.type === 'LOGIN_ERR_NOUSER') && <span className="loginErrMsg">Invalid Email</span>}
                        <input type="password" required minLength='6' className="loginInput" placeholder="Password" ref={password} />
                        {(loginErr.type === 'LOGIN_ERR_WPASS') && <span className="loginErrMsg">Wrong Password</span>}
                        <button type="submit" disabled={isFetching} className="loginButton">{isFetching ? "Loading" : `Login`}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton" onClick={clickHandler} >Create a new Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login