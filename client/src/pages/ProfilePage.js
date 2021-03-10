import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/AuthContext";
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {CLoader} from "../components/Loader";
import {AwardsList} from "../components/AwardsList";

export const ProfilePage = () => {
    const {token} = useContext(AuthContext)
    const [user, setUser] = useState(null)
    const {request, loading} = useHttp()
    const userId = useParams().id

    const fetchUser = useCallback(async () => {
        try {
            const fetched = await request(`/api/auth/d/${userId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUser(fetched)
        } catch (e) {}
    }, [token, request, userId])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    if (loading) {
        return (
            <main className="single-content">
                <div className="single-info-block">
                    <div className="container">
                        <CLoader/>
                    </div>
                </div>
                <div className="awards-list-block">
                    <div className="container">
                        <h2 className="section-heading">Награды этого ученика</h2>
                        <CLoader/>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <>
            { !loading && user && <main className="single-content">
                <div className="single-info-block">
                    <div className="container">
                        <h1 className="section-heading">{user.name} {user.surname}</h1>
                        <div className="block-content">
                            <div className="left-image">
                                <img src={user.avatarPath} alt="Profile avatar" className="image"/>
                            </div>
                            <div className="right-info">
                                <div className="center-block">
                                    <h3 className="main-info">Наград: {user.awardsLength}</h3>
                                    <div className="fields">
                                        {user.city && <div className="field">
                                                <label className="field-name">Город</label>
                                                    <div className="field-info">{user.city}</div>
                                            </div>
                                        }
                                        {user.school && <div className="field">
                                            <label className="field-name">Школа</label>
                                            <div className="field-info">{user.school}</div>
                                        </div>
                                        }
                                        {user.classNumber && <div className="field">
                                            <label className="field-name">Класс</label>
                                            <div className="field-info">{user.classNumber + ' ' + user.classLetter + ' (' + user.classProfile + ')'}</div>
                                        </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="awards-list-block">
                    <div className="container">
                        <h2 className="section-heading">Награды этого ученика</h2>
                        <AwardsList
                            options={{ userId }}
                        />
                    </div>
                </div>
            </main> }
        </>
    )
}
