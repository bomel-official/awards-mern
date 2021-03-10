import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Award} from "./AwardCard";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {CLoader} from "./Loader";

export const AwardsList = (props) => {
    const options = props.options
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [awards, setAwards] = useState(null)

    const fetchAwards = useCallback(async () => {
        try {
            const fetched = await request(`/api/award/list/${options.userId}/${options.limit}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setAwards(fetched)
        } catch (e) {}
    }, [token, request, options.limit, options.userId])

    useEffect(() => {
        fetchAwards()
    }, [fetchAwards])

    if (loading) {
        return (
            <CLoader/>
        )
    }

    return (
        <>
            { !loading && awards && <div className="flex-wrap-container flex-container">
                {awards.map((value) => {
                    return <Award award={value} key={value._id}/>
                })}
            </div> }
        </>
    )
}