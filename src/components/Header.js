import React, { useState, useEffect } from "react";
import Marvel from '../images/Marvel-logo.webp'
import '../styles/header.css'

const Header = (props) => {
    const {characArr} = props

    return (
        <div className='header'>
            <ul className='ul-list'>
            {characArr.map(character => {return (
                <li className='list' key={character.id}> 
                    <img src={character.img} className='charac-img' style={{'border-color': character.borderColor}}/> 
                    <br/>
                    <span className='text'>{character.name}</span> 
                </li>)}
                )}
                <li id='logo'><img src={Marvel} className='logo-img' /></li>
            </ul>
        </div>
    )
}

export default Header