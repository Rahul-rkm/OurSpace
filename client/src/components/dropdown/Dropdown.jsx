import { useEffect, useState, useRef, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import './dropdown.css'

const Dropdown = ({ dropList }) => {
    const { user, darkTheme, dispatch } = useContext(AuthContext)
    const dropdown = useRef()
    const dropdownWrapper = useRef()
    const mainDroplist = useRef();
    const settingSublist = useRef();
    const helpSublist = useRef();
    const settingsClickHandler = () => {
        mainDroplist.current.style.display = 'none'
        helpSublist.current.style.display = 'none'
        settingSublist.current.style.display = 'flex'
        dropdown.current.style.height = dropdownWrapper.current.offsetHeight + 'px'
        mainDroplist.current.style.display = 'flex'
        dropdownWrapper.current.style.translate = '-200px'
    }

    const helpClickHandler = () => {
        mainDroplist.current.style.display = 'none'
        helpSublist.current.style.display = 'flex'
        settingSublist.current.style.display = 'none'
        dropdown.current.style.height = dropdownWrapper.current.offsetHeight + 'px'
        mainDroplist.current.style.display = 'flex'
        dropdownWrapper.current.style.translate = '-200px'
    }

    const backClickHandler = () => {
        mainDroplist.current.style.display = 'flex'
        helpSublist.current.style.display = 'none'
        settingSublist.current.style.display = 'none'
        dropdown.current.style.height = dropdownWrapper.current.offsetHeight + 'px'
        settingSublist.current.style.display = 'flex'
        dropdownWrapper.current.style.translate = '0px'

    }
    const darkSwitcher = () => {
        dispatch({ type: "THEME_SWITCH" })
    }

    const logoutHandler = () => {
        dispatch({ type: "LOGOUT" })
    }

    return (
        <div ref={dropdown} className='dropdown'>
            <div ref={dropdownWrapper} className="dropdownWrapper">
                <ul ref={mainDroplist} className="dropdownList mainList">
                    {dropList?.mainList.map((item, index) => {
                        return (
                            item?.text !== "Profile" ?
                                <li key={`mainList${index}`} className='dropdownItem'
                                    onClick={() => {
                                        if (item?.text === 'Settings')
                                            settingsClickHandler();
                                        else if (item?.text === 'Help')
                                            helpClickHandler()
                                        else if (item?.text === 'DarkMode')
                                            darkSwitcher()
                                        else if (item?.text === 'Logout')
                                            logoutHandler()
                                    }}
                                ><span className='dropItemLeftIcon'>{item?.leftIcon}</span> {item?.text} <span className='dropItemRightIcon'>{item?.rightIcon}</span></li>
                                :
                                <Link to={`/profile/${user.username}`} style={{ textDecoration: 'none' }} >
                                    <li key={`mainList${index}`} className='dropdownItem'
                                    ><span className='dropItemLeftIcon'>{item?.leftIcon}</span> {item?.text} <span className='dropItemRightIcon'>{item?.rightIcon}</span></li>
                                </Link>
                        )

                    })}
                </ul>
                <ul ref={settingSublist} className="dropdownList rightList">
                    {
                        dropList?.rightLists[0].map((item, index) => {
                            return (
                                <li key={`rightList${index}`} className='dropdownItem' onClick={() => {
                                    if (item?.text === 'Go Back')
                                        backClickHandler()
                                }} ><span className='dropItemLeftIcon'>{item?.leftIcon}</span> {item?.text} <span className='dropItemRightIcon'>{item?.rightIcon}</span></li>
                            )
                        })
                    }
                </ul>
                <ul ref={helpSublist} className="dropdownList rightList">
                    {
                        dropList?.rightLists[1].map((item, index) => {
                            return (
                                <li key={`rightList${index}`} className='dropdownItem' onClick={() => {
                                    if (item?.text === 'Go Back')
                                        backClickHandler()
                                }} ><span className='dropItemLeftIcon'>{item?.leftIcon}</span> {item?.text} <span className='dropItemRightIcon'>{item?.rightIcon}</span></li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Dropdown