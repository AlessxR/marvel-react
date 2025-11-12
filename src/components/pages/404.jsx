import React from "react";

import ErrorMessage from "../errorMessage/ErrorMessage.jsx";

import {Link} from "react-router-dom";

const Page404 = () => {
    return (
        <div style={{"textAlign": "center"}}>
            <ErrorMessage />
            <p style={{"text-align": "center", "fontWeight": "bold", "font-size": "24px"}}>Page doesn't exist</p>
            <Link
                style={{"display": "block", "textAlign": "center", "fontWeight": "bold", "fontSize": "24px", "marginTop": "30px"}}
                to="/">Back to main page
            </Link>
        </div>
    );
}

export default Page404;