import React, {useCallback, useContext, useEffect, useState} from 'react'
import {NavLink, useHistory} from "react-router-dom";
import {SmallAwardsList} from "../components/SmallAwardsList";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {Message} from "../components/Message";
import {CLoader} from "../components/Loader";

export const AccountPage = () => {
    const {token, userId} = useContext(AuthContext)
    const history = useHistory()
    const [filename, setFilename] = useState('')
    const {loading, request, error, clearError} = useHttp()
    const [user, setUser] = useState(null)
    const [readyToDisplay, setReadyToDisplay] = useState(false)
    const [messageOptions, setMessageOptions] = useState({
        status: '', text: ''
    })
    const [form, setForm] = useState({})

    const formData = new FormData()

    useEffect(() => {
        setMessageOptions({
            status: 'neg', text: error
        })
    }, [error])

    useEffect(() => {
        if (user) {
            setForm({
                email: user.email || '',
                avatarPath: user.avatarPath || '',
                classLetter: user.classLetter || 'А',
                classProfile: user.classProfile || 'Универсальный',
                classNumber: user.classNumber || 1,
                name: user.name || '',
                surname: user.surname || '',
                city: user.city || '',
                school: user.school || ''
            })
            setReadyToDisplay(true)
        }
    }, [user])

    const changeHandler = event => {
        if (event.target.name === 'avatar') {
            setForm({ ...form, avatar: event.target.files[0]})
            setFilename(event.target.files[0].name)
        } else {
            setForm({ ...form, [event.target.name]: event.target.value})
        }
    }

    const submitHandler = async event => {
        event.preventDefault()
        clearError()
        try {
            for (let key in form) {
                if (form.hasOwnProperty(key)) {
                    formData.set(key, form[key])
                }
            } // add data to formData from form state

            const data = await request(
                '/api/auth/edit',
                'POST',
                formData,
                {Authorization: `Bearer ${token}`},
                false
            )
            history.push(`/profile/${data.userId}`)
        } catch (e) {}
    }

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
            <main className="my-account-content">
                <div className="my-acoount-form">
                    <div className="container">
                        <nav className="my-cabinet-nav">
                            <ul className="my-cabinet-menu-list">
                                <li className="menu-item current-menu-item"><NavLink
                                    to="/account">Профиль</NavLink></li>
                                <li className="menu-item"><NavLink
                                    to="/add-award">Добавить
                                    награду</NavLink></li>
                            </ul>
                        </nav>
                        <div className="bg-outer">
                            <div className="center-container">
                                <CLoader/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-account-awards">
                    <div className="my-account-awards-list-block">
                        <div className="container">
                            <h2 className="section-heading">Последние размещенные награды</h2>
                            <CLoader/>
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <>
            { !loading && user && readyToDisplay && <main className="my-account-content">
                <div className="my-acoount-form">
                    <div className="container">
                        <nav className="my-cabinet-nav">
                            <ul className="my-cabinet-menu-list">
                                <li className="menu-item current-menu-item"><NavLink
                                    to="/account">Профиль</NavLink></li>
                                <li className="menu-item"><NavLink
                                    to="/add-award">Добавить
                                        награду</NavLink></li>
                            </ul>
                        </nav>
                        <div className="bg-outer">
                            <div className="center-container">
                                <form onSubmit={submitHandler}>
                                    <Message options={messageOptions} />
                                    <div className="field">
                                        <label htmlFor="user_avatar_full_image">Изображение профиля</label>
                                        <br/>
                                        <label htmlFor="user_avatar_full_image" className="file-uploader-label"><span className="file-button">{(filename || form.avatarPath) ? "Изменить" : "Добавить"} изображение</span> {filename}</label>
                                        <br/>
                                        <input type="file"
                                               name="avatar"
                                               disabled={loading}
                                               id="user_avatar_full_image"
                                               onChange={changeHandler}
                                               accept="image/jpeg,.jpg,.jpeg,image/gif,.gif,image/png,.png,image/bmp,.bmp"/>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="user_email">E-mail</label>
                                        <input id="user_email"
                                               type="email"
                                               name="email"
                                               value={form.email}
                                               required={true}
                                               disabled={loading}
                                               onChange={changeHandler}
                                               size="40"/>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="user_firstname">Имя</label>
                                        <input id="user_firstname"
                                               type="text"
                                               name="name"
                                               required={true}
                                               disabled={loading}
                                               onChange={changeHandler}
                                               value={form.name}
                                               size="40"/>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="user_surname">Фамилия</label>
                                        <input id="user_surname"
                                               type="text"
                                               name="surname"
                                               required={true}
                                               disabled={loading}
                                               onChange={changeHandler}
                                               value={form.surname}
                                               size="40"/>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="user_city">Город</label>
                                        <input id="user_city"
                                               type="text"
                                               name="city"
                                               required={true}
                                               disabled={loading}
                                               onChange={changeHandler}
                                               value={form.city}
                                               size="40"/>
                                        <span>Например: Красноуральск</span>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="user_school">Школа</label>
                                        <input  type="text"
                                                id="user_school"
                                                name="school"
                                                required={true}
                                                disabled={loading}
                                                onChange={changeHandler}
                                                value={form.school}
                                                size="40"/>
                                        <span>Например: МАОУ СОШ №8</span>
                                    </div>
                                    <div className="field wpuf-el user_class">
                                        <label htmlFor="user_class">Класс</label>
                                        <input type="number"
                                               id="user_class"
                                               min="1"
                                               max="11"
                                               step="1"
                                               name="classNumber"
                                               required={true}
                                               disabled={loading}
                                               onChange={changeHandler}
                                               value={form.classNumber}
                                               size="2"/>
                                    </div>
                                    <div className="field wpuf-el user_class_letter">
                                        <label htmlFor="user_class_letter">Буква</label>
                                        <select id="user_class_letter"
                                                required={true}
                                                disabled={loading}
                                                onChange={changeHandler}
                                                value={form.classLetter}
                                                name="classLetter">
                                            <option value="А">А</option>
                                            <option value="Б">Б</option>
                                            <option value="В">В</option>
                                            <option value="Г">Г</option>
                                            <option value="Д">Д</option>
                                        </select>
                                    </div>
                                    <div className="field wpuf-el user_class_profile">
                                        <label htmlFor="user_class_profile">Профиль класса</label>
                                        <select id="user_class_profile"
                                                required={true}
                                                disabled={loading}
                                                onChange={changeHandler}
                                                value={form.classProfile}
                                                name="classProfile">
                                            <option value="Универсальный">Универсальный</option>
                                            <option value="Физико-математический">Физико-математический</option>
                                            <option value="Естественно-научный">Естественно-научный</option>
                                            <option value="Гуманитарный">Гуманитарный</option>
                                            <option value="Социально-экономический">Социально-экономический</option>
                                            <option value="Технологический">Технологический</option>
                                        </select>
                                    </div>
                                    <input type="submit" name="submit" value="Сохранить"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-account-awards">
                    <div className="my-account-awards-list-block">
                        <div className="container">
                            <h2 className="section-heading">Последние размещенные награды</h2>
                            <SmallAwardsList
                                options={{ userId }}
                            />
                        </div>
                    </div>
                </div>
            </main> }
        </>
    )
}
