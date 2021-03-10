import React from 'react'
import {AwardsList} from "../components/AwardsList";
import {NavLink} from "react-router-dom";
import {StudentsList} from "../components/StudentsList";
import vectorMainImage from '../static/images/undraw_maker_launch_crhe.svg'

export const HomePage = () => {
    return (
        <main className="index-content big-h1">
            <div className="first">
                <div className="container">
                    <div className="flex-container">
                        <div className="left">
                            <div className="round-background"/>
                            <div className="block-content">
                                <h1 className="block-heading">Разместите ваше портфолио на&nbsp;<span
                                    className="orange">Awards!</span></h1>
                                <div className="buttons-block">
                                    <NavLink to="/add-award"
                                             className="fill-button">Разместить портфолио</NavLink>
                                    <NavLink to="/awards"
                                             className="link-button">Посмотреть другие портфолио</NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div className="image-container" style={{backgroundImage: 'url(' + vectorMainImage + ')'}}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="awards-list-block">
                <div className="container">
                    <h2 className="section-heading">Последние размещенные награды</h2>
                    <AwardsList
                        options={{
                            userId: 'none',
                            limit: 4
                        }}
                    />
                </div>
            </div>
            <div className="best-students">
                <div className="container">
                    <h2 className="section-heading">Лучшие из лучших</h2>
                    <StudentsList
                        options={{
                            sort: '-awardsLength'
                        }}
                    />
                </div>
            </div>
        </main>
    )
}
