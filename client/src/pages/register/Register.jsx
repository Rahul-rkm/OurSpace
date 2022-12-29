import axios from "axios"
import { useRef } from "react"
import { Navigate } from "react-router-dom"
import { useNavigate } from "react-router"
import "./register.css"

const Register = ({ userAuth }) => {
    if (userAuth) {
        return <Navigate to="/" />
    }

    const username = useRef()
    const email = useRef()
    const password = useRef()
    const passwordAgain = useRef()
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match")
        }
        else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                const res = await axios.post("/api/auth/register", user)
                console.log(password.current.value)
                navigate("/login")
            }
            catch (err) {
                console.log(err)
            }
        }
    }

    const clickHandler = (e) => {
        navigate("/login")
    }
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">OurSpace</h3>
                    <span className="loginDesc">Connect with your friends and world, make your own space on OurSpace. </span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input type="text" className="loginInput" required placeholder="Username" ref={username} />
                        <input type="email" className="loginInput" required placeholder="Email" ref={email} />
                        <input type="password" className="loginInput" required minLength='6' placeholder="Password" ref={password} />
                        <input type="password" className="loginInput" required placeholder="Confirm Password" ref={passwordAgain} />
                        <button className="loginButton" onClick={submitHandler}>SignUp</button>
                        <button className="loginRegisterButton" onClick={clickHandler}>Goto Login Page</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register