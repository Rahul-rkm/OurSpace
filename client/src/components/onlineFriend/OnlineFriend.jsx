import "./onlineFriend.css"

const OnlineFriend = ({ user }) => {
    const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;
    return (
        <li className="rightbarFriend">
            <div className="rightbarProfilePictureContainer">
                <img className="rightbarProfilePicture" src={`${PF + user.profilePicture}`} alt="friendImg" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user?.username}</span>
        </li>
    )
}

export default OnlineFriend