import React, { useState } from "react";

import AccountCircleIcon
from '@mui/icons-material/AccountCircle';

import {
    Link,
    useNavigate
} from "react-router-dom";
import "./navbar.css";

function NavbarComponent(){

    const navigate =
        useNavigate();

        const [showMenu, setShowMenu] =
    useState(false);
        

    const role =
        localStorage.getItem(
            "role"
        );
        console.log(role)

    return(

    <nav className="navbar navbar-dark navbar-expand-lg custom-navbar">

        <div className="container-fluid">

            <Link
    className="navbar-brand fw-bold"
    to="/"

    style={{

        fontSize:"32px",

        letterSpacing:"1px",

        fontFamily:"Poppins, sans-serif",

        color:"white",

        textShadow:
        "2px 2px 8px rgba(0,0,0,0.4)"
    }}>

    SafeRoutes Travels

</Link>

            <div
            style={{
                position:"relative"
            }}>

                <div

                onClick={() =>
                    setShowMenu(
                        !showMenu
                    )
                }

                style={{
                    cursor:"pointer",
                    color:"white"
                }}>

                    <AccountCircleIcon
style={{
    fontSize:"42px"
}}
/>
{
localStorage.getItem("customerName") ? (


<div
style={{

    color:"white",

    fontSize:"14px",

    fontWeight:"bold",

    marginTop:"4px",

    textAlign:"center"
}}>

    Hi,{localStorage.getItem("customerName")}

</div>
) : null
}

                </div>

                {
                showMenu && (

                <div

                style={{

                    position:"absolute",

                    right:"0",

                    top:"55px",

                    background:"#5b2d82",

                    padding:"15px",

                    borderRadius:"12px",

                    minWidth:"170px",

                    zIndex:"999",

                    boxShadow:
                    "0px 4px 15px rgba(0,0,0,0.3)"
                }}>

                    <Link
                        to="/history"
                        className=
                        "btn btn-warning w-100 mb-2">

                        History

                    </Link>

                    {
                    role === "ADMIN" && (

                    <button

                    className=
                    "btn btn-dark w-100 mb-2"

                    onClick={() =>
                    navigate("/admin")
                    }>

                        Admin

                    </button>

                    )}

                    {
!localStorage.getItem("token") ? (

<Link
    to="/login"
    className="btn btn-primary w-100">

    Login

</Link>

) : (

<button
className=
"btn btn-success w-100"

onClick={() => {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    navigate("/login");

    window.location.reload();
}}>

    Logout

</button>

)}

                </div>
            )}

            </div>

        </div>

    </nav>
);
}

export default NavbarComponent;