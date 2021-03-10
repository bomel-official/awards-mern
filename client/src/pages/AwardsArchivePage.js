import React from 'react'
import {AwardsList} from "../components/AwardsList";

export const AwardsArchivePage = () => {
    return (
        <div className="awards-list-block">
            <div className="container">
                <h2 className="section-heading">Последние размещенные награды</h2>
                <AwardsList
                    options={{
                        userId: 'none'
                    }}
                />
            </div>
        </div>
    )
}
