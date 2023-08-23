import "./feed.css"
import Share from "../share/Share";
import Post from "../post/Post";
import axios from 'axios'
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Feed = ({ username }) => {
    // const proxy = import.meta.env.VITE_APP_PROXY;
    const [reloads, setReloads] = useState(0)
    const [posts, setPosts] = useState([])
    const { user } = useContext(AuthContext);
    const BACKEND_PROXY = import.meta.env.VITE_APP_PROXY;
    useEffect(() => {
        const fetchPosts = async () => {
            const urlWithProxy = BACKEND_PROXY + `/api/posts/timeline/${user._id}`
            console.log('BEFORE Fetching posts')
            const response = (username) ? await axios.get(BACKEND_PROXY + `/api/posts/profile/${username}`) : await axios.get(urlWithProxy);
            console.log(`%cResponse`, 'color: green; font-size: larger')
            console.log('RESPONSE =============')
            console.log(response)
            console.log(response.data)
            setPosts(response?.data?.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }))
            console.log(posts)
        }
        fetchPosts()
    }, [username, user._id, reloads])

    const updateReload = () => {
        setReloads(prev => prev + 1)
    }

    const deletePost = async (postItem) => {
        console.log(posts)
        console.log(postItem)
        const deleteUrl = import.meta.env.VITE_APP_PROXY + `/api/posts/${postItem._id}`
        try {
            // await axios.delete(deleteUrl, data: details);
            await axios({
                method: 'delete',
                url: deleteUrl,
                data: { userId: user._id, desc: 'Deleting the post' }
            });
            // window.location.reload()
            updateReload()
        }
        catch (err) {
            alert(err);
        }
    }

    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share reloadFunc={updateReload} />}
                {posts.map((p) => {
                    return <Post key={p._id} id={p._id} post={p}
                        myProfile={username === user.username && true}
                        postDelete={username === user.username && deletePost} />
                })}
            </div>
        </div>
    )
}

export default Feed