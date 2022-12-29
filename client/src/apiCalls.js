import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    let res;
    try {
        res = await axios.post("/api/auth/login", userCredential);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        sessionStorage.setItem("currentUser", JSON.stringify(res.data));
        return res.data;
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err });
        console.log('res : ', err?.response?.data?.message);
        return err?.response?.data;
    }
};