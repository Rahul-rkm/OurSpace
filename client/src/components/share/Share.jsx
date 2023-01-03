import "./share.css"
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@mui/icons-material"
import { useContext, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from 'axios'

const Share = () => {
    const { user: currentUser } = useContext(AuthContext)
    const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;
    const desc = useRef()
    const [file, setFile] = useState(null)
    const submitHandler = async (e) => {
        e.preventDefault();
        if (!desc.current.value && !file) {
            alert("Your post can't be empty. ❌")
            return;
        }
        const newPost = {
            userId: currentUser._id,
            desc: desc.current.value,
        }
        if (file) {
            const data = new FormData()
            const fileName = file.name;
            data.append("file", file)
            data.append("name", fileName)

            try {
                const res = await axios.post("/api/upload", data)
                newPost.img = res.data.img;
            }
            catch (err) {
                console.log('Error in uploading -> ', err)
            }
        }
        try {
            await axios.post("/api/posts", newPost)
            window.location.reload()
        }
        catch (err) {
            console.log('error in posting -> ', err)
        }
    }
    return (
        <div className="share">
            <form className="shareWrapper" onSubmit={submitHandler}>
                <div className="shareTop">
                    <img className="shareProfilePicture" src={currentUser.profilePicture ? PF + currentUser.profilePicture : PF + `person/noAvatar.jpg`} alt="profile pic" />
                    <textarea required placeholder={`What's in your mind ${currentUser.username}? `} ref={desc} className="shareInput" />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                        <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                    </div>
                )}
                <div className="shareBottom">
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                            <input style={{ display: "none" }} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText">Mood</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </div>
            </form>
        </div>
    )
}

export default Share