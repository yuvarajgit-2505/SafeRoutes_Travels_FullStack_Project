import React from "react";

import {
    useNavigate
} from "react-router-dom";

import "./Home.css";

import NavbarComponent
from "../components/NavbarComponent";

function AdminDashboard(){

    const navigate =
        useNavigate();

    return(

        <div>

            <NavbarComponent />

            <div
            className=
            "container mt-5">

                <h2>
                    Admin Dashboard
                </h2>

                <div
                className=
                "row mt-4">

                    <div
                    className=
                    "col-md-4">

                        <div
                        className=
                        "card p-4 shadow">

                            <h4>
                                Manage Routes
                            </h4>

                            <button

                            className=
                            "btn btn-primary mt-3"

                            onClick={() =>
                            navigate(
                            "/routes-management"
                            )}>

                                Open

                            </button>

                        </div>

                    </div>

                    <div
                    className=
                    "col-md-4">

                        <div
                        className=
                        "card p-4 shadow">

                            <h4>
                                Book Tickets
                            </h4>

                            <button

                            className=
                            "btn btn-success mt-3"

                            onClick={() =>
                            navigate("/")
                            }>

                                Open

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;