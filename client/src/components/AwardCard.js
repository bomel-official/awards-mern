import React from 'react'
import {NavLink} from "react-router-dom";

export const Award = (props) => {
    return (
        <div className="award-card" key={props.award._id}>
            <div className="left-image-container">
                <div className="absolute-image scaleble"
                     style={{backgroundImage: `url(${ props.award.imagePath.split('\\').join('/') })`}}
                />
            </div>
            <div className="right-text">
                <NavLink to={`/profile/${props.award.owner}`} className="author-name">{props.award.ownerFullname}</NavLink>
                <div className="award-info">
                    <div className="award-place">{props.award.contestPlace}</div>
                    <div className="award-description">{props.award.contestName}</div>
                    <div className="year-and-city"><span
                        className="city">{props.award.contestCity}, </span>{props.award.contestDate.split('-')[0]} год
                    </div>
                </div>
                <div className="buttons-block close">
                    <NavLink to={`/award/${props.award._id}`} className="small-line-button">Посмотреть</NavLink>
                    <NavLink to={`/profile/${props.award.owner}`}
                             className="small-fill-button">К ученику</NavLink>
                </div>
            </div>
        </div>
    )
}