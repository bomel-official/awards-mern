import React from 'react'
import {AwardsList} from "../components/AwardsList";
import {useParams} from "react-router-dom";

export const UserAwardsPage = () => {
    const userId = useParams().id

    return (
        <div className="awards-list-block">
            <div className="container">
                <h2 className="section-heading">Награды ученика</h2>
                <AwardsList
                    options={{
                        userId: userId
                    }}
                />
            </div>
        </div>
    )
}
