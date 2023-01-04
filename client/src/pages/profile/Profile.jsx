import './profile.css'
import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

const Profile = () => {
    const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({})
    const username = useParams().username

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`/api/users?username=${username}`)
            // console.log(response)
            setUser(response.data)
        }
        fetchUser()
    }, [username])

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className='profileCoverImg' src={(user.coverPicture) ? PF + user.coverPicture : PF + "person/noCover.jpg"} alt="coverPicture" />
                            <img className='profileUserImg' src={(user.profilePicture) ? PF + user.profilePicture : PF + "person/noAvatar.jpg"} alt="profilePicture" />
                        </div>
                        <div className="profileInfo">
                            <div className='profileInfoName'>{user?.username}</div>
                            <span className='profileInfoDesc'>{user?.desc && `No bio`}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile