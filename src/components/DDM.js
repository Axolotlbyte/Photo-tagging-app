import React, { useEffect, useState }from 'react';
import '../styles/ddm.css'

const DDM = (props) => {
    const {characArr, display, hide, compare} = props
    const {x,y} = props.offset
    const [ddmArr, setArr] = useState([...characArr])

    useEffect(() => {
        const newArr = characArr.filter(character => character.borderColor === 'green')
        setArr([...newArr])
    }, [characArr])

    if(display && ddmArr.length !== 0){
    return (
        <div className='ddm-cont' style={{top: y+'%', left: x+'%',}} onClick={hide}>
            <ul className='ul-ddm'>
                {ddmArr.map( character => 
                    <li className='ddm-li' onClick={() => {compare(character.urlName,{x,y})}}>
                        <img src={character.img} className='ddm-img'/>
                        <span className='ddm-text'>{character.name}</span>
                    </li>
                )}
            </ul>
        </div>
    )
    }else{
        return null
    }
}

export default DDM