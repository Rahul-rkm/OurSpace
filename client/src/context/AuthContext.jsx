import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer"

let currUser = null;
if (sessionStorage.getItem('currentUser')) {
    currUser = await JSON.parse(sessionStorage.getItem('currentUser'))
    console.log('FETCHED FROM THE SESSION STORAGE , user: ')
    console.log(currUser)
}

const INITIAL_STATE = {
    user: currUser,
    isFetching: false,
    error: false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    return (
        <AuthContext.Provider value={{ user: state.user, isFetching: state.isFetching, error: state.error, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}