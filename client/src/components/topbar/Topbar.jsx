import './topbar.css'
import { Search, Person, Chat, Notifications } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useContext, useState, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Dropdown from '../dropdown/Dropdown'
import axios from 'axios'
const Topbar = () => {
    const { user } = useContext(AuthContext)
    const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchRes, setSearchRes] = useState(null)
    const dropdown = {
        mainList: [
            { leftIcon: '😎', text: 'Profile', rightIcon: '' },
            { leftIcon: '🔨', text: 'Settings', rightIcon: '👉', rightList: 0 },
            { leftIcon: '❓', text: 'Help', rightIcon: '👉', rightList: 1 },
            { leftIcon: '🌙', text: 'DarkMode', rightIcon: '' },
            { leftIcon: '📤', text: 'Logout', rightIcon: '' },
        ],
        rightLists: [
            [
                { leftIcon: '👈', text: 'Go Back', rightIcon: '', backBtn: true },
                { leftIcon: '🔨', text: 'General Settings', rightIcon: '' },
                { leftIcon: '🔏', text: 'Privacy Settings', rightIcon: '' },
                { leftIcon: '📜', text: 'Privacy Log', rightIcon: '' },
            ],
            [
                { leftIcon: '👈', text: 'Go Back', rightIcon: '', backBtn: true },
                { leftIcon: '❔', text: 'Help center', rightIcon: '' },
                { leftIcon: '📩', text: 'Support Box', rightIcon: '' },
                { leftIcon: '📝', text: 'Report Problem', rightIcon: '' },
                { leftIcon: '📩', text: 'Support Box', rightIcon: '' },
                { leftIcon: '📝', text: 'Report Problem', rightIcon: '' },
            ],
        ]
    }

    const searchTerm = useRef()
    const searchHandler = async (e) => {
        e.preventDefault()
        console.log("👉")
        const userId = searchTerm.current.value;
        const res = await axios.get(`/api/users/search/${userId}`)
        if (res.data.type === "SUCCESS") {
            setSearchRes(res.data.user)
        }
    }
    return (
        <div className='topbarContainer'>
            <div className="topbarLeft">
                <Link to='/' style={{ textDecoration: 'none' }} >
                    <span className="logo">OurSpace</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <form onSubmit={searchHandler} className="searchbar">
                    <Search className='searchIcon' />
                    <input ref={searchTerm} placeholder='Search for people, posts, trends ...' className='searchInput' />
                </form>
                <div className='searchList' style={searchRes ? { display: 'block' } : { display: 'none' }}>
                    <Link to={`/profile/${searchRes?.username}`} >
                        <div className="searchResItem">
                            <img className='searchResItemImg' src={PF + searchRes?.profilePicture} alt="profileImg" />
                            <div className='searchResItemUsername'>{searchRes?.username}</div>
                        </div>
                    </Link>
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
                <img src={(user?.profilePicture) ?
                    PF + user?.profilePicture :
                    PF + `person/noAvatar.jpg`} alt="profilePic"
                    onClick={() => { setShowDropdown(prev => !prev) }}
                    className="profilePicture" />
                {
                    showDropdown &&
                    <Dropdown dropList={dropdown} />}
                {/* <Link to={`/profile/${user.username}`}>
                </Link> */}
            </div>
        </div>
    )
}

export default Topbar