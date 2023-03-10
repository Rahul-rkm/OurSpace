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
    useEffect(() => {
        const fetchPosts = async () => {
            const urlWithProxy = `/api/posts/timeline/${user._id}`
            const response = (username) ? await axios.get(`/api/posts/profile/${username}`) : await axios.get(urlWithProxy);
            setPosts(response.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }))
        }
        fetchPosts()
    }, [username, user._id, reloads])

    const updateReload = () => {
        setReloads(prev => prev + 1)
    }

    const deletePost = async (postItem) => {
        console.log(posts)
        console.log(postItem)
        const deleteUrl = `/api/posts/${postItem._id}`
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