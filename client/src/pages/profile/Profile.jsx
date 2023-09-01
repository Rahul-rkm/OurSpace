import './profile.css'
import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback from '../../components/ErrorFallback/ErrorFallback'
import { AuthContext } from '../../context/AuthContext'
import { CameraAlt } from "@mui/icons-material"
import { Button, IconButton, Tooltip, Typography } from "@mui/material"

const Profile = () => {
    const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({}) // user : the user of username in the url => /profile/:username
    const username = useParams().username
    const { user: authenticatedUser, dispatch } = useContext(AuthContext);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(import.meta.env.VITE_APP_PROXY + `/api/users?username=${username}`)
            setUser(response.data)
        }
        fetchUser()
    }, [username])
    // for edit button
    const checkWindowSize = () => {
        console.log(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener("resize", checkWindowSize)
    }, [])
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <div className="profileCoverContainer" style={{ position: "relative" }}>
                                <img className='profileCoverImg' src={(user.coverPicture) ? PF + user.coverPicture : PF + "person/noCover.jpg"} alt="coverPicture" />
                                {
                                    authenticatedUser?.username === username &&
                                    <Button variant='contained' sx={{ position: "absolute", right: "10px", bottom: "10px", background: "#80808057", "&:hover": { background: "#80808070" } }}> <CameraAlt sx={{ marginRight: "10px" }} /> <Typography sx={{ display: { xs: "none", sm: "inline" } }} variant='string'> Edit Cover Image </Typography> </Button>
                                }
                            </div>
                            <div className='profilePictureContainer' style={{ position: "relative", marginTop: "-90px", width: "fit-content" }}>
                                <img className='profileUserImg' src={(user.profilePicture) ? PF + user.profilePicture : PF + "person/noAvatar.jpg"} alt="profilePicture" />
                                {
                                    authenticatedUser?.username === username &&
                                    <Tooltip title="Edit Profile Pic">
                                        <IconButton sx={{ position: "absolute", bottom: "10px", right: "10px", background: "#77777756", '&:hover': { background: "#777777b5" } }} >
                                            <CameraAlt sx={{ transform: "scale(0.8)" }} />
                                        </IconButton>
                                    </Tooltip>
                                }
                            </div>
                        </div>
                        <div className="profileInfo">
                            <div className='profileInfoName'>{user?.username}</div>
                            <span className='profileInfoDesc'>{user?.desc && `No bio`}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <ErrorBoundary fallback={<ErrorFallback />}>
                            <Feed username={username} />
                        </ErrorBoundary>
                        <ErrorBoundary fallback={<ErrorFallback />}>
                            <Rightbar user={user} />
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile