import "./sidebar.css"
import { Feed, OndemandVideo, Groups, Work, Bookmarks, Event, Help } from "@mui/icons-material"
import { Users } from "../../dummyData"
const Sidebar = () => {
    const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Feed className="sidebarIcon" />
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <OndemandVideo className="sidebarIcon" />
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <Groups className="sidebarIcon" />
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmarks className="sidebarIcon" />
                        <span className="sidebarListItemText">Saved Posts</span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className="sidebarIcon" />
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <Work className="sidebarIcon" />
                        <span className="sidebarListItemText">Remote Work</span>
                    </li>
                    <li className="sidebarListItem">
                        <Help className="sidebarIcon" />
                        <span className="sidebarListItemText">Ask for help</span>
                    </li>
                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendsList">
                    {Users.map(user => {
                        return (
                            <li key={user.id} className="sidebarFriend">
                                <img className="sidebarFriendImg" src={PF + `${user?.profilePicture}`} alt="friendImg" />
                                <span className="sidebarFriendName">{user?.username}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar