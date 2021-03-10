import React from 'react'
import {NavLink} from 'react-router-dom'

export const AccountButtons = (props) => {
    if (props.isAuthenticated) {
        return (
            <div className="account-buttons">
                <span className="link-button" onClick={props.logout}>Выйти</span>
                <NavLink to="/account" className="small-fill-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none">
                        <path
                            d="M15 15.75V14.25C15 13.4544 14.6839 12.6913 14.1213 12.1287C13.5587 11.5661 12.7956 11.25 12 11.25H6C5.20435 11.25 4.44129 11.5661 3.87868 12.1287C3.31607 12.6913 3 13.4544 3 14.25V15.75"
                            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path
                            d="M9 8.25C10.6569 8.25 12 6.90685 12 5.25C12 3.59315 10.6569 2.25 9 2.25C7.34315 2.25 6 3.59315 6 5.25C6 6.90685 7.34315 8.25 9 8.25Z"
                            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <i className="button-text">Личный кабинет</i>
                </NavLink>
            </div>
        )
    }
    
    return (
        <div className="account-buttons">
            <NavLink to="/register" className="link-button">Зарегистрироваться</NavLink>
            <NavLink to="/login" className="small-fill-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none">
                    <path
                        d="M15 15.75V14.25C15 13.4544 14.6839 12.6913 14.1213 12.1287C13.5587 11.5661 12.7956 11.25 12 11.25H6C5.20435 11.25 4.44129 11.5661 3.87868 12.1287C3.31607 12.6913 3 13.4544 3 14.25V15.75"
                        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path
                        d="M9 8.25C10.6569 8.25 12 6.90685 12 5.25C12 3.59315 10.6569 2.25 9 2.25C7.34315 2.25 6 3.59315 6 5.25C6 6.90685 7.34315 8.25 9 8.25Z"
                        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <i className="button-text">Войти</i>
            </NavLink>
        </div>
    )
}