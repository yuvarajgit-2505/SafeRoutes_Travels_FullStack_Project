import React, {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import NavbarComponent
from "../components/NavbarComponent";

import "./Home.css";
import API from "../services/api";

import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";

import Autocomplete
from "@mui/material/Autocomplete";

import {
    LocalizationProvider
} from "@mui/x-date-pickers/LocalizationProvider";

import {
    AdapterDayjs
} from "@mui/x-date-pickers/AdapterDayjs";

import {
    DatePicker
} from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";

function Home(){

    const navigate =
        useNavigate();

    const [routes, setRoutes] =
        useState([]);

    const [locations, setLocations] =
        useState([]);

    const [source, setSource] =
        useState("");

    const [destination,
        setDestination] =
        useState("");

    const [travelDate,
        setTravelDate] =
        useState(dayjs());

    useEffect(() => {

        fetchRoutes();

    }, []);

    const fetchRoutes =
        async() => {

        try{

            const response =
                await API.get(
                    "/route/all"
                );

            setRoutes(
                response.data
            );

            const places =
                new Set();

            response.data.forEach(
                (route) => {

                places.add(
                    route.sourceLocation
                );

                places.add(
                    route.destinationLocation
                );
            });

            setLocations(
                [...places]
            );

        }catch(error){

            console.log(error);
        }
    };

    const handleSearch = () => {

        navigate("/routes", {

            state:{

                source,
                destination,

                travelDate:
                travelDate.format(
                    "YYYY-MM-DD"
                )
            }
        });
    };
    const checkLogin = () => {

    const token =
        localStorage.getItem(
            "token"
        );

    if(!token){

        navigate("/login");

        return false;
    }

    return true;
};

    return(

    <div>

        <NavbarComponent />

        <div

        className="home-background"

        >

            <div className="overlay container">

                <div className="search-wrapper">

                    <h2 className="search-title">

                        Book Your Journey

                    </h2>

                    <div
                    className="row g-4
                    align-items-center
                    justify-content-center">

                        {/* SOURCE */}

                        <div className="col-md-3">

                            <Autocomplete

                                options={locations}

                                onClick={() => {

                                    if(!checkLogin()) return;
                                }}

                                onChange={(e,value) =>
                                setSource(value)
                                }

                                renderInput={(params) => (

                                    <TextField

                                        {...params}

                                        label="Source"

                                        fullWidth
                                    />
                                )}
                            />

                        </div>

                        {/* DESTINATION */}

                        <div className="col-md-3">

                            <Autocomplete

                                options={locations}

                                onClick={() => {

                                    if(!checkLogin()) return;
                                }}

                                onChange={(e,value) =>
                                setDestination(value)
                                }

                                renderInput={(params) => (

                                    <TextField

                                        {...params}

                                        label="Destination"

                                        fullWidth
                                    />
                                )}
                            />

                        </div>

                        {/* DATE */}

                        <div className="col-md-3">

                            <LocalizationProvider
                            dateAdapter={AdapterDayjs}>

                                <DatePicker

                                    label="Travel Date"

                                    value={travelDate}

                                    onChange={(newValue) =>
                                    setTravelDate(newValue)
                                    }

                                    slotProps={{

                                        textField: {

                                            fullWidth: true
                                        }
                                    }}
                                />

                            </LocalizationProvider>

                        </div>

                        {/* BUTTON */}

                        <div className="col-md-2 d-grid">

                            <button

                                className=
                                "btn btn-danger w-100"

                                onClick={() => {

                                    const token =
                                    localStorage.getItem(
                                        "token"
                                    );

                                    if(!token){

                                        navigate("/login");

                                        return;
                                    }

                                    handleSearch();
                                }}>

                                Search Buses

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>
);
}

export default Home;