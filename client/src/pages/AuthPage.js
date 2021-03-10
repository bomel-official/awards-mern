import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {NavLink} from "react-router-dom";
import {Message} from "../components/Message";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = (props) => {
    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const [messageOptions, setMessageOptions] = useState({
        status: '', text: ''
    })
    const [form, setForm] = useState({
        email: '', password: '', rememberMe: false
    })

    const changeHandler = event => {
        if (event.target.name === 'rememberme') {
            setForm({ ...form, rememberMe: !!event.target.checked })
        } else {
            setForm({ ...form, [event.target.name]: event.target.value })
        }
    }

    useEffect(() => {
        setMessageOptions({
            status: 'neg', text: error
        })
    }, [error])

    const registerHandler = async () => {
        clearError()
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }
    const loginHandler = async () => {
        clearError()
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return (
        <div id="login" style={{margin: '0 auto'}}>
            <h1><a href="https://awards-project.fun">Awards</a></h1>
            <form>
                <Message options={messageOptions} />
                <p>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" onChange={changeHandler}
                           disabled={loading} aria-describedby="login_error" className="input" size="20" autoCapitalize="off"/>
                </p>

                <div className="user-pass-wrap">
                    <label htmlFor="user_pass">Пароль</label>
                    <div className="wp-pwd">
                        <input type="password" name="password" id="user_pass" aria-describedby="login_error"
                               className="input password-input" size="20" onChange={changeHandler}
                               disabled={loading}/>
                        <button type="button" className="button button-secondary wp-hide-pw hide-if-no-js"
                                data-toggle="0" aria-label="Показать пароль">
                            <span className="dashicons dashicons-visibility" aria-hidden="true"/>
                        </button>
                    </div>
                </div>
                <p className="forgetmenot" style={{display: 'flex', alignItems: 'center'}}>
                    <input name="rememberme"
                           type="checkbox"
                           id="rememberme"
                           onChange={changeHandler}
                    />
                    <label htmlFor="rememberme">Запомнить меня</label>
                </p>
                <p className="submit">
                    <input type="submit" name="wp-submit" id="wp-submit" className="button button-primary button-large"
                           value={props.isLogin ? 'Войти' : 'Регистрация'}
                           onClick={props.isLogin ? loginHandler : registerHandler }
                           disabled={loading}/>
                </p>
            </form>

            <p id="nav">
                <NavLink to={props.isLogin ? '/register' : '/login'}>{props.isLogin ? 'Регистрация' : 'Войти' }</NavLink>
            </p>
            <p id="backtoblog"><NavLink to="/">
                ← Назад к сайту «Awards» </NavLink></p>
        </div>
    )
}
