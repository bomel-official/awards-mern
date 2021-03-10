import React, {useContext, useEffect, useRef, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import {AccountButtons} from "./AccountButtons";

export const Header = () => {
    const auth = useContext(AuthContext)
    const [isMobileMenuActive, setIsMobileMenuActive] = useState(false)
    const wrapperRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (buttonRef.current.contains(event.target)) {
                setIsMobileMenuActive(!isMobileMenuActive)
            } else if ((wrapperRef.current && !wrapperRef.current.contains(event.target))) {
                setIsMobileMenuActive(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef, buttonRef, isMobileMenuActive]);

    return (
        <header className="header">
            <div className="container">
                <div className="flex-container">
                    <NavLink to="/" className="logo-block">
                        <i className="logo-letter">A</i>
                    </NavLink>
                    <nav className="menu-block">
                        <ul className="menu-list block-list flex-container">
                            <li className="menu-item"><NavLink to="/">Главная</NavLink></li>
                            <li className="menu-item"><NavLink to="/add-award">Разместить портфолио</NavLink></li>
                            <li className="menu-item"><NavLink to="/awards">Посмотреть портфолио</NavLink></li>
                            <li className={ 'mobile-menu-item menu-item' + (isMobileMenuActive ? ' active-block' : '')}>
                                <nav ref={wrapperRef} className="active-mobile-menu-block">
                                    <ul className="mobile-menu-list block-list flex-container">
                                        <li className="menu-item"><NavLink to="/">Главная</NavLink></li>
                                        <li className="menu-item"><NavLink to="/add-award">Разместить портфолио</NavLink></li>
                                        <li className="menu-item"><NavLink to="/awards">Посмотреть портфолио</NavLink></li>
                                    </ul>
                                </nav>
                                <button className="menu-icon-button" ref={buttonRef} >
                                    <span className="line"/>
                                    <span className="line"/>
                                    <span className="line"/>
                                </button>
                            </li>
                        </ul>
                    </nav>
                    <AccountButtons
                        isAuthenticated={auth.isAuthenticated}
                        logout={auth.logout}
                    />
                </div>
            </div>
        </header>
    )
}