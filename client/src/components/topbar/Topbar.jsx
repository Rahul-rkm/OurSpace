import './topbar.css'
import axios from 'axios'
import { Search, Person, Chat, Notifications, ChevronLeft, ChevronRight, Help, Settings, Logout, DarkMode, AppSettingsAlt, Security } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useContext, useState, useRef, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Dropdown from '../dropdown/Dropdown'


const Topbar = () => {
    const { user, overlay, dispatch } = useContext(AuthContext)
    const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchRes, setSearchRes] = useState(null)
    const dropdown = {
        mainList: [
            {
                leftIcon: <img src={(user?.profilePicture) ?
                    PF + user?.profilePicture :
                    PF + `person/noAvatar.jpg`} alt="profilePic"
                    onClick={() => { setShowDropdown(prev => !prev) }}
                    className="profilePicture" />, text: 'Profile', rightIcon: ''
            },
            { leftIcon: <Settings />, text: 'Settings', rightIcon: <ChevronRight />, rightList: 0 },
            { leftIcon: <Help />, text: 'Help', rightIcon: <ChevronRight />, rightList: 1 },
            { leftIcon: <DarkMode />, text: 'DarkMode', rightIcon: '' },
            { leftIcon: <Logout />, text: 'Logout', rightIcon: '' },
        ],
        rightLists: [
            [
                { leftIcon: <ChevronLeft />, text: 'Go Back', rightIcon: '', backBtn: true },
                { leftIcon: <AppSettingsAlt />, text: 'General Settings', rightIcon: '' },
                { leftIcon: <Security />, text: 'Privacy Settings', rightIcon: '' },
                { leftIcon: '📜', text: 'Privacy Log', rightIcon: '' },
            ],
            [
                { leftIcon: <ChevronLeft />, text: 'Go Back', rightIcon: '', backBtn: true },
                { leftIcon: '❔', text: 'Help center', rightIcon: '' },
                { leftIcon: '📩', text: 'Support Box', rightIcon: '' },
                { leftIcon: '📝', text: 'Report Problem', rightIcon: '' },
                { leftIcon: '📩', text: 'Support Box', rightIcon: '' },
                { leftIcon: '📝', text: 'Report Problem', rightIcon: '' },
            ],
        ]
    }

    useEffect(() => {
        if (!overlay) {
            setShowDropdown(false);
            setSearchRes(null)
        }
    }, [overlay])

    const searchTerm = useRef()
    const searchHandler = async (e) => {
        e.preventDefault()
        console.log("👉")
        const userId = searchTerm.current.value;
        const res = await axios.get(`/api/users/search/${userId}`)
        if (res.data.type === "SUCCESS") {
            setSearchRes(res.data.user)
        }
        // OVERLAY
        dispatch({ type: "OVERLAY_ON" });
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
                    <Link to={`/profile/${searchRes?.username}`} onClick={() => { overlay ? dispatch({ type: "OVERLAY_OFF" }) : dispatch({ type: "OVERLAY_ON" }) }}>
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
                    onClick={() => { setShowDropdown(prev => !prev); overlay ? dispatch({ type: "OVERLAY_OFF" }) : dispatch({ type: "OVERLAY_ON" }) }}
                    className="profilePicture" />
                {
                    showDropdown &&
                    <Dropdown dropList={dropdown} />}
            </div>
        </div>
    )
}

export default Topbar