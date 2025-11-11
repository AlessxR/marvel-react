import React from "react";
import {createRoot} from 'react-dom/client'
import './index.css';
import App from './components/app/App';

import './style/style.scss';
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)
