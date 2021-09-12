import React, { useState, useEffect }  from "react";
import DDM from "./DDM";
import wheresMarvel from '../images/WheresMarvel.jpg'
import '../styles/gameboard.css'
import FbScreen from "./FbScreen";
import Footer from "./Footer";

const GameBoard = (props) => {

    const { characArr, gameBoardRef, getOffset, location, compare, characName} = props

    const [display, setDisplay] = useState(false)

    let timer;

    const handleDisplay = () => {
        if(timer){
            clearTimeout(timer)
        }
        setDisplay(true)
        timer = setTimeout(() => {setDisplay(false)}, 3000)
    }

    const hideDisplay = () => {
        console.log('working')
        clearTimeout(timer)
        setDisplay(false)
        console.log(display)
    }

    useEffect(() => {
        handleDisplay()
    }, [location])

    return (
        <div className='game-board' onClick={getOffset} ref={gameBoardRef} >
            <FbScreen characName={characName}/>
            <img src={wheresMarvel} className='game-img'/>
            <DDM characArr={characArr} 
                offset={location} 
                display={display} 
                hide={hideDisplay}
                compare={compare}
            />
            <Footer/>
        </div>
    )
}

export default GameBoard