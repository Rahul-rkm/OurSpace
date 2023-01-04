import "./post.css"
import { MoreHoriz, Delete, Bookmark } from "@mui/icons-material"
import { useState, useEffect, useContext } from "react"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { format } from 'timeago.js'
import { AuthContext } from "../../context/AuthContext"
const Post = ({ post, myProfile, postDelete }) => {
    const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext)
    const [likes, setLikes] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({})
    const [optionsActive, setOptionsActive] = useState(false);

    const deletePost = (e) => {
        if (window.confirm("Do you really want to delete this post. (This can't be undone) 🔴"))
            postDelete(post);
    }
    useEffect(() => {
        const fetchUser = async () => {
            const urlWithProxy = `/api/users?userId=${post?.userId}`
            // const response = await axios.get("/api/posts/timeline/637db9adbc2b3915dfd1a4bc");
            // const response = await fetch(urlWithProxy)
            // const data = await response.json()
            // console.log(data)
            // setUser(data)
            const response = await axios.get(urlWithProxy)
            // console.log(response)
            setUser(response.data)
        }
        fetchUser()
    }, [post?.userId])

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes])

    const likeHandler = async (e) => {
        try {
            const res = await axios.put("/api/posts/" + post._id + "/like", { userId: currentUser._id })
            console.log(res.data)
        }
        catch (err) {
            console.log(err)
        }
        setLikes(prev => isLiked ? prev - 1 : prev + 1);
        setIsLiked(prev => !prev);
    }

    const toggleOptions = () => {
        setOptionsActive(!optionsActive);
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user?.username}`} >
                            <img className="postProfilePicture" src={(user?.profilePicture) ? PF + user?.profilePicture : PF + 'person/noAvatar.jpg'} alt="ProfilePic" />
                        </Link>
                        <span className="postUsername">{user?.username}</span>
                        <span className="postTiming">{format(post?.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreHoriz className="postOptionsIcon" onClick={toggleOptions} />
                        <div className={`postOptions ${optionsActive && 'active'}`}>
                            <div className="postOptionsList">
                                {
                                    myProfile && <div onClick={deletePost} className="postOptionItem"><Delete /> Delete</div>
                                }
                                <div className="postOptionItem"><Bookmark /> Save</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    {
                        post?.img &&
                        <img className="postImg" src={`${PF + post?.img}`} alt="postImg" />
                    }
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img onClick={likeHandler} className="likeIcon" src="/assets/like.png" alt="Like" />
                        <img onClick={likeHandler} className="likeIcon" src="/assets/heart.png" alt="Love" />
                        <div className="postLikeCounter">{likes} likes</div>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentCounter">{post?.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post