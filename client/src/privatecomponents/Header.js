import React from 'react'
import { NavLink } from 'react-router-dom'
import bgvjit from "./bgvjit.jpeg"


const Header = () => {
    return (
        <nav className="navbar bg-dark justify-content-center" style={{backgroundColor:"grey"}}>

<img src={bgvjit}  width="13%" height="89%" alt="vjit" style={{marginRight :"20%",marginLeft:"-24%"}} />


            <li className="nav-link ">
                <NavLink to="/dashboard" className="nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })}>
                    Dashboard
                </NavLink>
            </li>


            <li className="nav-link ">
                <NavLink to="/allstocks" className="nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })}>
                    Complete info
                </NavLink>
            </li>

            <li className="nav-link ">
                <NavLink to="/login" className="nav-link" onClick={()=>localStorage.clear()} style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })}>
                    Logout
                </NavLink>
            </li>

            
          

        </nav>
    )
}

export default Header
