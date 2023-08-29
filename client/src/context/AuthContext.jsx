import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer"

let currUser = null;
if (localStorage.getItem('OurSpaceCurrentUser')) {
    const getUser = async () => {
        currUser = await JSON.parse(localStorage.getItem('OurSpaceCurrentUser'))
        console.log('FETCHED FROM THE LOCAL STORAGE , user: ')
        console.log(currUser)
    }
    getUser()
}

const INITIAL_STATE = {
    user: currUser,
    isFetching: false,
    error: false,
    darkTheme: localStorage.getItem("OurSpaceTheme") === "dark" ? true : false,
    overlay: false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    return (
        <AuthContext.Provider value={{ user: state.user, isFetching: state.isFetching, error: state.error, darkTheme: state.darkTheme, overlay: state.overlay, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}