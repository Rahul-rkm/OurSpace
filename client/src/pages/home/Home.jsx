import "./home.css"
import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import { Navigate } from "react-router-dom"

const Home = ({ user }) => {
    if (!user) {
        // console.log("there is no user")
        return <Navigate to="/login" />
    }

    return (
        <>
            <Topbar />
            <div className="homeMainContainer">
                <Sidebar />
                <Feed />
                <Rightbar />
            </div>
        </>
    )
}

export default Home