import React from "react";

import {Route, Routes} from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";

import MainPage from "../pages/MainPage.jsx";
import ComicsPage from "../pages/ComicsPage.jsx";
import Page404 from "../pages/404.jsx";
import SingleComicPage from "../pages/SingleComicPage.jsx";

const App = () => {
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/comics" element={<ComicsPage/>}/>
                    <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </main>
        </div>
    )
}

export default App;