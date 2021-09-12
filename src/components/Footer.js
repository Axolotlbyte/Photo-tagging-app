import React from "react";

import github from '../images/github-logo.png'
import '../styles/footer.css'

const Footer = () => {
    return (
        <div className='footer-cont'>
            <a href='https://github.com/Axolotlbyte'>
                <ul className=''>
                    <li className='footer-list'>
                        <img src={github} className='github-img'/>
                    </li>
                    <li className='footer-text'>
                        @axolotbyte
                    </li>
                </ul>
            </a>
        </div>
    )
}

export default Footer