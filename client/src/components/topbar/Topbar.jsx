import './topbar.css'
import { Search, Person, Chat, Notifications } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Dropdown from '../dropdown/Dropdown'
const Topbar = () => {
    const { user } = useContext(AuthContext)
    const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;

    const dropdown = {
        mainList: [
            { leftIcon: '😎', text: 'Profile', rightIcon: '' },
            { leftIcon: '🔨', text: 'Settings', rightIcon: '👉' },
            { leftIcon: '❓', text: 'Settings', rightIcon: '👉' },
        ],
        rightLists: [
            [
                { leftIcon: '👈', text: 'Go Back', rightIcon: '' },
                { leftIcon: '🔨', text: 'General Settings', rightIcon: '' },
                { leftIcon: '🔏', text: 'Privacy Settings', rightIcon: '' },
                { leftIcon: '📜', text: 'Privacy Log', rightIcon: '' },
            ],
            [
                { leftIcon: '👈', text: 'Go Back', rightIcon: '' },
                { leftIcon: '❔', text: 'Help center', rightIcon: '' },
                { leftIcon: '📩', text: 'Support Box', rightIcon: '' },
                { leftIcon: '📝', text: 'Report Problem', rightIcon: '' },
            ],
        ]
    }
    return (
        <div className='topbarContainer'>
            <div className="topbarLeft">
                <Link to='/' style={{ textDecoration: 'none' }} >
                    <span className="logo">OurSpace</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className='searchIcon' />
                    <input placeholder='Search for people, posts, trends ...' className='searchInput' />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">8</span>
                    </div>
                </div>
                <img src={(user?.profilePicture) ? PF + user?.profilePicture : PF + `person/noAvatar.jpg`} alt="profilePic" className="profilePicture" />
                <Dropdown dropList={dropdown} />
                {/* <Link to={`/profile/${user.username}`}>
                </Link> */}
            </div>
        </div>
    )
}

export default Topbar