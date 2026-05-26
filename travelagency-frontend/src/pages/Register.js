import React, {
    useState
} from "react";

import {
    useNavigate,
    Link
} from "react-router-dom";

import {
    registerUser
} from "../services/authService";

import "./Login.css";

function Register(){

    const navigate =
        useNavigate();

    const [registerData,
        setRegisterData] =
        useState({

            name:"",
            email:"",
            password:"",
            mobile:""
        });

    const handleChange =
        (e) => {

        setRegisterData({

            ...registerData,

            [e.target.name]:
            e.target.value
        });
    };

    const handleSubmit =
    async(e) => {

        e.preventDefault();

        try{

            await registerUser(
                registerData
            );

            alert(
                "Registration Successful"
            );

            navigate("/login");

        }catch(error){

            alert(
                "Registration Failed"
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
                        Register
                    </h2>

                    <form
                    onSubmit=
                    {handleSubmit}>

                        <input

                        type="text"

                        name="name"

                        placeholder="Name"

                        className=
                        "login-input"

                        onChange=
                        {handleChange}

                        required
                        />

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

                        <input

                        type="text"

                        name="mobile"

                        placeholder="Mobile"

                        className=
                        "login-input"

                        onChange=
                        {handleChange}

                        required
                        />

                        <button
                        className=
                        "login-btn">

                            Register

                        </button>

                    </form>

                    <p
                    className=
                    "register-text">

                        Already have an account?

                        <Link to="/login">

                            Login

                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Register;