import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {AwardsList} from "../components/AwardsList";
import {CLoader} from "../components/Loader";

export const AwardPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [award, setAward] = useState(null)
    const awardId = useParams().id

    const getAward = useCallback(async () => {
        try {
            const fetched = await request(`/api/award/d/${awardId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setAward(fetched)
        } catch (e) {}
    }, [token, awardId, request])

    useEffect(() => {
        getAward()
    }, [getAward])

    if (loading) {
        return (
            <CLoader/>
        )
    }

    return (
        <>
            { !loading && award && <main className="single-content">
                <div className="single-info-block">
                    <div className="container">
                        <div className="block-content">
                            <div className="left-image">
                                <img src={award.imagePath} alt="post preview"
                                     className="image"/>
                            </div>
                            <div className="right-info">
                                <div className="center-block">
                                    <h3 className="main-info">{award.contestPlace}</h3>
                                    <div className="fields">
                                        <div className="field">
                                            <label htmlFor="" className="field-name">Ученик</label>
                                            <div className="field-info">{award.ownerFullname}</div>
                                        </div>
                                        <div className="field">
                                            <label htmlFor="" className="field-name">Город проведения</label>
                                            <div className="field-info">{award.contestCity}</div>
                                        </div>
                                        <div className="field">
                                            <label htmlFor="" className="field-name">Дата проведения</label>
                                            <div className="field-info">{award.contestDate.split('T')[0]}</div>
                                        </div>
                                        <div className="field">
                                            <label htmlFor="" className="field-name">Конкурс</label>
                                            <div className="field-info">{award.contestName}</div>
                                        </div>
                                        <div className="field">
                                            <label htmlFor="" className="field-name">Класс ученика</label>
                                            <div className="field-info">{award.ownerClass}</div>
                                        </div>

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
                            options={{
                                userId: award.owner
                            }}
                        />
                    </div>
                </div>
            </main> }
        </>
    )
}
