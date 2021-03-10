import React from 'react'
import {NavLink} from "react-router-dom";

export const SmallAward = (props) => {
    return (
        <div className="award-card" key={props.award.id}>
            <div className="left-image-container">
                <div className="absolute-image scaleble"
                     style={{backgroundImage: `url(${ props.award.imagePath.split('\\').join('/') })`}}/>
            </div>
            <div className="right-text">
                <div className="award-info">
                    <div className="award-place">{props.award.contestPlace}</div>
                    <div className="award-description">{props.award.contestName}</div>
                </div>
                <div className="buttons-block close">
                    <NavLink to={`/award/${props.award._id}`} className="ultrasmall-fill-button">Посмотреть</NavLink>
                    <button className="ultrasmall-fill-button danger-color">Удалить</button>
                </div>
            </div>
        </div>
    )
}