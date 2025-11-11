import React from "react";

import {Route, Switch} from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";

import MainPage from "../pages/MainPage.jsx";
import ComicsPage from "../pages/ComicsPage.jsx";

const App = () => {

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <Switch>
                    <Route exact path="/">
                        <MainPage/>
                    </Route>
                    <Route exact path="/comics">
                        <ComicsPage/>
                    </Route>
                </Switch>
            </main>
        </div>
    )
}

export default App;