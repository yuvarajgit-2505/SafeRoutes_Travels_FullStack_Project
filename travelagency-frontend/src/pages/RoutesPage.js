import React, {
    useEffect,
    useState
} from "react";

import {
    useLocation,
    useNavigate
} from "react-router-dom";

import NavbarComponent
from "../components/NavbarComponent";

import API from "../services/api";

function RoutesPage(){

    const location =
        useLocation();

    const navigate =
        useNavigate();

    const {
        source,
        destination,
        travelDate
    } = location.state || {};

    const [routes, setRoutes] =
        useState([]);

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
                console.log(response.data);

            const filteredRoutes =
                response.data.filter(
                    (route) =>

                    route.sourceLocation
                    === source

                    &&

                    route.destinationLocation
                    === destination
                );

            setRoutes(
                filteredRoutes
            );

        }catch(error){

            console.log(error);
        }
    };

    const isWeekend =
        () => {

        const selectedDate =
            new Date(travelDate);

        const day =
            selectedDate.getDay();

        return day === 0
            ||
            day === 6;
    };

    const handleBooking =
(route, busChoice) => {

    const token =
        localStorage.getItem(
            "token"
        );

    if(!token){

        alert(
            "Please login first"
        );

        navigate("/login");

        return;
    }

    let busType = "";

    if(busChoice === 1){

        busType =
        "AC Sleeper";

    }else if(busChoice === 2){

        busType =
        "Sleeper";

    }else{

        busType =
        "Seater";
    }

    navigate("/seat-selection", {

        state:{

            ...route,

            routeId:
            route.id,

            busChoice,

            busType,

            travelDate
        }
    });
};

    return(

        <div>

            <NavbarComponent />

            <div
            className="container mt-5">

                <h3 className="mb-4">

                    Available Buses

                </h3>

                {
                    routes.length === 0 ?

                    (

                        <h5>
                            No Routes Found
                        </h5>

                    )

                    :

                    (

                        routes.map(
                            (route) => (

                            <div

                            key={route.id}

                            className=
                            "card p-4 mb-4 shadow">

                                <h4>

                                    {
                                    route.sourceLocation
                                    }

                                    {" → "}

                                    {
                                    route.destinationLocation
                                    }

                                </h4>

                                <p>

                                    Departure:

                                    <b>
                                    {" "}
                                    {
                                    route.startTime
                                    }
                                    </b>

                                </p>

                                <p>

                                    Arrival:

                                    <b>
                                    {" "}
                                    {
                                    route.arrivalTime
                                    }
                                    </b>

                                </p>

                                <p>

                                    Travel Date:

                                    <b>
                                    {" "}
                                    {
                                    travelDate
                                    }
                                    </b>

                                </p>

                                <div
                                className=
                                "d-flex gap-3flex-wrap mt-3">

                                    <button

                                    className=
                                    "btn btn-primary"

                                    onClick={() =>
                                    handleBooking(
                                        route,
                                        1
                                    )
                                    }>

                                        AC Sleeper₹

                                        {
                                        isWeekend()

                                        ?

                                        route.weekendAcFare

                                        :

                                        route.weekdayAcFare
                                        }

                                    </button>

                                    <button

                                    className=
                                    "btn btn-success"

                                    onClick={() =>
                                    handleBooking(
                                        route,
                                        2
                                    )
                                    }>

                                        Sleeper ₹

                                        {
                                        isWeekend()

                                        ?

                                        route.weekendSleeperFare

                                        :

                                        route.weekdaySleeperFare
                                        }

                                    </button>

                                    <button

                                    className=
                                    "btn btn-dark"

                                    onClick={() =>
                                    handleBooking(
                                        route,
                                        3
                                    )
                                    }>

                                        Seater ₹

                                        {
                                        isWeekend()

                                        ?

                                        route.weekendSeaterFare

                                        :

                                        route.weekdaySeaterFare
                                        }

                                    </button>

                                </div>

                            </div>
                        ))
                    )
                }

            </div>

        </div>
    );
}

export default RoutesPage;