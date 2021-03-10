import React from 'react'
import {NavLink} from "react-router-dom";

export const Student = (props) => {
    return (
        <div className="student-card" key={props.student.id}>
            <div className="top-image-container">
                <div className="absolute-image" style={{backgroundImage: `url(${ props.student.avatarPath.split('\\').join('/') })`}}/>
            </div>
            <div className="bottom-text">
                <div className="student-name">{props.student.name} {props.student.surname}</div>
                <div className="awards-count">Наград: {props.student.awardsLength}</div>
                <div className="student-location">г.{props.student.city}, {props.student.school}, {props.student.classNumber}({props.student.classLetter})</div>
                <div className="buttons-block close">
                    <NavLink to={`/userawards/${props.student._id}`}
                             className="small-line-button">К наградам</NavLink>
                    <NavLink to={`/profile/${props.student._id}`}
                       className="small-fill-button">К ученику</NavLink>
                </div>
            </div>
        </div>
    )
}