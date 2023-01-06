import { useRef } from 'react';
import { useEffect, useState } from 'react'
import './dropdown.css'

const Dropdown = ({ dropList }) => {
    // const [listNum, setlistNum] = useState(0);
    // const [height, setHeight] = useState(null);
    const [viewList, setViewList] = useState({ listNum: 0, height: null, listType: 'MAIN' })
    const rightList = useRef();
    const mainList = useRef();
    useEffect(() => {
        // setHeight(rightList.current.offsetHeight)
        if (viewList?.listType === 'MAIN')
            setViewList((prev) => ({ ...prev, height: mainList.current.offsetHeight }))
        else
            setViewList((prev) => ({ ...prev, height: rightList.current.offsetHeight }))
    }, [viewList?.height])
    return (
        <div className='dropdown' style={viewList?.height && { height: `${viewList?.height}px` }}>
            <div className="dropdownWrapper">
                <ul ref={mainList} className="dropdownList mainList">
                    {dropList?.mainList.map((item, index) => {
                        return (
                            <li key={`mainList${index}`} className='dropdownItem'><span className='dropItemLeftIcon'>{item?.leftIcon}</span> {item?.text} <span className='dropItemRightIcon'>{item?.rightIcon}</span></li>
                        )

                    })}
                </ul>
                <ul ref={rightList} className="dropdownList rightList">
                    {
                        dropList?.rightLists[viewList?.listNum].map((item, index) => {
                            return (
                                <li key={`rightList${index}`} className='dropdownItem'><span className='dropItemLeftIcon'>{item?.leftIcon}</span> {item?.text} <span className='dropItemRightIcon'>{item?.rightIcon}</span></li>
                            )
                        })
                    }

                </ul>
            </div>
        </div>
    )
}

export default Dropdown