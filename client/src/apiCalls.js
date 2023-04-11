import axios from "axios";
import {loginApi} from "./axios"
// const loginApi = axios.create({
//     baseURL: 'https://ourspace-bsx8.onrender.com'
// })
export const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    let res;
    try {
        console.log("Before Login request");
        // res = await axios.post("/api/auth/login", userCredential);
        res = await loginApi.post("/api/auth/login", userCredential);
        console.log("After Login request");
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        sessionStorage.setItem("currentUser", JSON.stringify(res.data));
        return res.data;
    } catch (err) {
        console.log('res ERR : ', err);
        dispatch({ type: "LOGIN_FAILURE", payload: err });
        console.log('res : ', err?.response?.data?.message);
        return err?.response?.data;
    }
};