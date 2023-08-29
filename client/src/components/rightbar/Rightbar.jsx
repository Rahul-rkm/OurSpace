import "./rightbar.css"
import OnlineFriend from "../onlineFriend/OnlineFriend"
import { Users } from "../../dummyData"
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from '@mui/icons-material'

const Rightbar = ({ user }) => {  // 👈 this user is the user whose profile is viewed by logged in user
    const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([])
    const { user: currentUser, dispatch } = useContext(AuthContext)

    const [followed, setFollowed] = useState(currentUser?.followings?.includes(user?._id))

    useEffect(() => {
        setFollowed(currentUser?.followings?.includes(user?._id));
    }, [currentUser, user?._id])

    useEffect(() => {
        if (user) {
            const getFriends = async () => {
                try {
                    const friendList = await axios.get(import.meta.env.VITE_APP_PROXY + `/api/users/friends/` + user._id);
                    setFriends(friendList.data);
                }
                catch (err) {
                    console.log('Error here 💻', err)
                }
            }
            getFriends();
        }
    }, [user?._id])

    const handleFollow = async () => {
        try {
            if (followed) {
                await axios.put(import.meta.env.VITE_APP_PROXY + "/api/users/" + user?._id + "/unfollow", { userId: currentUser._id })
                dispatch({ type: "UNFOLLOW", payload: user._id })
                setFollowed(!followed)
            }
            else {
                await axios.put(import.meta.env.VITE_APP_PROXY + "/api/users/" + user?._id + "/follow", { userId: currentUser._id })
                dispatch({ type: "FOLLOW", payload: user._id })
                setFollowed(!followed)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src="/assets/gift.png" alt="birthday" />
                    <span className="birthdayText">
                        <b>Jane Foster</b> and <b>2 other friends</b> have birthday today.
                    </span>
                </div>
                <img className="rightbarAdImg" src="/assets/ad.png" alt="adImg" />
                <h3 className="rightbarTitle">Online Friends</h3>
                <ul className="rightbarFriendsList">
                    {Users.map(user => {
                        return (
                            <OnlineFriend key={user?.id + user?.username} user={user} />
                        )
                    })}
                </ul>
            </>
        )
    }
    const ProfileRightbar = () => {
        return (
            <>{user?.username !== currentUser?.username && (
                <button className="followButton" onClick={handleFollow}>{followed ? "Unfollow" : "Follow"} {followed ? <Remove /> : <Add />} </button>
            )}
                <h4 className="rightbarTitle">User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user?.city || 'NA'}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Homecity:</span>
                        <span className="rightbarInfoValue">{user?.from || 'NA'}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">{user?.relationship || 'NA'}</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User Followings</h4>
                <div className="rightbarFollowings">
                    {
                        // console.log(Users);
                        friends.map((friend, index) => {
                            return (
                                <Link key={`friend${index}`} className="friendLink" to={`/profile/${friend.username}`} >
                                    <div className="rightbarFollowing">
                                        <img src={PF + friend?.profilePicture} alt="userImg" className="rightbarFollowingImg" />
                                        <span className="rightbarFollowingName">{friend?.username.split(' ')[0]}</span>
                                    </div>
                                </Link>
                            )
                        })}
                </div>
            </>
        )
    }
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {
                    user ? <ProfileRightbar /> : <HomeRightbar />
                }
            </div>
        </div>
    )
}

export default Rightbar