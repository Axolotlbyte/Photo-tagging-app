import React from "react";
import '../styles/fbscreen.css'

const FbScreen = (props) => {

    const {characName} = props

    if(characName !== false){
        return (
            <div className='fb-cont'>
                {`FOUND ${characName}`}
            </div>
        )
    }else{
        return (
            null
        )
    }
}

export default FbScreen