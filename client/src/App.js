import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {AuthContext} from './context/AuthContext'
import {useAuth} from "./hooks/auth.hook";


function App() {
    const {token, login, logout, userId} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <div className="App" id="root">
                <Router>
                    <div className="App-content">
                        {routes}
                    </div>
                </Router>
            </div>
        </AuthContext.Provider>
    )
}

export default App;
