import React, {Component} from 'react';
import {Link} from "react-router-dom";
import NavLinks from "./NavLinks"

const Navbar = () => {
    return (
        <header>

            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to='/'>Test app</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                            aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <NavLinks />
                    </div>
                </div>
            </nav>

        </header>
    )
}

export default Navbar;