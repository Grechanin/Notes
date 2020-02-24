import React from 'react';
import {Link} from "react-router-dom";

const NavLinks = () => {
    return (
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/">Notes list</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/create_note">Create new note</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/choose_provider">Settings</Link>
            </li>
        </ul>
    )
}

export default NavLinks;