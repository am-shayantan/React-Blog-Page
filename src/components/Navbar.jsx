import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <nav>
            <NavLink to='/'>Baby</NavLink>
            <NavLink to='/mom'>Mom</NavLink>
            <NavLink to='/dad'>Dad</NavLink>
            <NavLink to='/about'>About</NavLink>
        </nav>
    )
}

export default Navbar