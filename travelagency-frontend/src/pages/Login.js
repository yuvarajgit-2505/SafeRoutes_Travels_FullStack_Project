import React, {
    useState
} from "react";

import {
    useNavigate,
    Link
} from "react-router-dom";

import {
    loginUser
} from "../services/authService";

import "./Login.css";

function Login(){

    const navigate =
        useNavigate();   

    const [loginData,
        setLoginData] =
        useState({

            email:"",
            password:""
        });

    const handleChange =
        (e) => {

        setLoginData({

            ...loginData,

            [e.target.name]:
            e.target.value
        });
    };

    const handleSubmit =
    async(e) => {

        e.preventDefault();

        try{

            const response =
                await loginUser(
                    loginData
                );
                console.log(response.data);

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "role",
                response.data.role
            );
            localStorage.setItem(
    "customerName",
    response.data.customerName
);

            if(
                response.data.role
                === "ROLE_ADMIN"
            ){

                navigate("/admin");

            }else{

                navigate("/home");
            }

        }catch(error){

            alert(
                "Invalid Credentials"
            );
        }
    };

    return(

        <div className="login-page">

            <div className="login-left">

                <h1>
                    SafeRoutes Travels
                </h1>

                <p className="tagline">

                    Smart • Safe • Comfortable

                </p>

                <div className="feature-box">

                    <h4>
                        ✓ Real-time Seat Booking
                    </h4>

                    <h4>
                        ✓ Secure Online Payments
                    </h4>

                    <h4>
                        ✓ Instant PDF Tickets
                    </h4>

                    <h4>
                        ✓ Live Seat Availability
                    </h4>

                    <h4>
                        ✓ Comfortable Bus Travel
                    </h4>

                </div>

            </div>

            <div className="login-right">

                <div className="login-card">

                    <h2>
                        Sign In
                    </h2>

                    <form
                    onSubmit=
                    {handleSubmit}>

                        <input

                        type="email"

                        name="email"

                        placeholder="Email"

                        className=
                        "login-input"

                        onChange=
                        {handleChange}

                        required
                        />

                        <input

                        type="password"

                        name="password"

                        placeholder="Password"

                        className=
                        "login-input"

                        onChange=
                        {handleChange}

                        required
                        />

                        <button
                        className=
                        "login-btn">

                            Sign In

                        </button>

                    </form>

                    <p
                    className=
                    "register-text">

                        Don't have an account?

                        <Link to="/register">

                            Register

                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;