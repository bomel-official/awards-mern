import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Student} from "./StudentCard";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {CLoader} from "./Loader";

export const StudentsList = (props) => {
    const options = props.options
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [users, setUsers] = useState(null)

    const fetchUsers = useCallback(async () => {
        try {
            const fetched = await request(`/api/auth/list/${options.sort}/${options.limit}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUsers(fetched)
        } catch (e) {}
    }, [token, request, options.limit, options.sort])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    if (loading) {
        return (
            <CLoader/>
        )
    }

    return (
        <>
            { !loading && users && <div className="students-flex-container flex-container">
                {users.map((value, index) => {
                    return <Student student={value} key={index}/>
                })}
            </div> }
        </>
    )
}