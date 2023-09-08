import React from 'react'
import './Header.css'

function Header({ protagonist }) {
    return (
        <div className="jumbotron bg-cover text-white">
            <div className="container py-5 text-center" id='header' style={{backgroundImage: `url("/images/${protagonist}-header.jpg")`}} >
            </div>
        </div>
    )
}

export default Header