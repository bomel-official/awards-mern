import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {HomePage} from "./pages/HomePage";
import {AwardsArchivePage} from "./pages/AwardsArchivePage";
import {AccountPage} from "./pages/AccountPage";
import {ProfilePage} from "./pages/ProfilePage";
import {AuthPage} from "./pages/AuthPage";
import {AddAwardPage} from "./pages/AddAwardPage";
import {AwardPage} from "./pages/AwardPage";
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import {UserAwardsPage} from "./pages/UserAwardsPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/" exact>
                    <Header />
                    <HomePage/>
                    <Footer/>
                </Route>
                <Route path="/awards" exact>
                    <Header />
                    <AwardsArchivePage/>
                    <Footer/>
                </Route>
                <Route path="/userawards/:id" exact>
                    <Header />
                    <UserAwardsPage/>
                    <Footer/>
                </Route>
                <Route path="/account" exact>
                    <Header />
                    <AccountPage/>
                    <Footer/>
                </Route>
                <Route path="/profile/:id" exact>
                    <Header />
                    <ProfilePage/>
                    <Footer/>
                </Route>
                <Route path="/add-award" exact>
                    <Header />
                    <AddAwardPage/>
                    <Footer/>
                </Route>
                <Route path="/award/:id" exact>
                    <Header />
                    <AwardPage/>
                    <Footer/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <Header />
                <HomePage/>
                <Footer/>
            </Route>
            <Route path="/awards" exact>
                <Header />
                <AwardsArchivePage/>
                <Footer/>
            </Route>
            <Route path="/userawards/:id" exact>
                <Header />
                <UserAwardsPage/>
                <Footer/>
            </Route>
            <Route path="/login" exact>
                <AuthPage isLogin={true}/>
            </Route>
            <Route path="/profile/:id" exact>
                <Header />
                <ProfilePage/>
                <Footer/>
            </Route>
            <Route path="/register" exact>
                <AuthPage isLogin={false}/>
            </Route>
            <Route path="/award/:id" exact>
                <Header />
                <AwardPage/>
                <Footer/>
            </Route>
            <Route path="/add-award" exact>
                <AuthPage isLogin={false}/>
            </Route>
            <Redirect to="/register"/>
        </Switch>
    )
}
