import React, {
    useState,
    useEffect
} from "react";

import {
    useLocation,
    useNavigate
} from "react-router-dom";

import {
    FaBus
} from "react-icons/fa";

import API
from "../services/api";

import NavbarComponent
from "../components/NavbarComponent";

import "./SeatSelection.css";

function SeatSelectionPage(){

    const location =
        useLocation();

    const navigate =
        useNavigate();

    const route =
        location.state;

    const [selectedSeats,
        setSelectedSeats] =
        useState([]);

    const [bookedSeats,
        setBookedSeats] =
        useState([]);

    useEffect(() => {

        fetchBookedSeats();

    }, []);

    const fetchBookedSeats =
    async() => {

        try{

            const token =
                localStorage.getItem(
                    "token"
                );

            const response =
                await API.get(

`/booking/booked-seats/${route.routeId}/${route.travelDate}/${route.busType}`,

{
    headers:{
        Authorization:
        `Bearer ${token}`
    }
}

                );

            setBookedSeats(
                response.data
            );

        }catch(error){

            console.log(error);
        }
    };

    const seats = [];

    const totalSeats =

    route.busType ===
    "Seater"

    ? 40

    : 20;

    for(let i = 1;
        i <= totalSeats;
        i++){

        seats.push(`S${i}`);
    }

    const handleSeatClick =
    (seat) => {

        if(bookedSeats.includes(seat)){

            return;
        }

        if(selectedSeats.includes(seat)){

            setSelectedSeats(

                selectedSeats.filter(
                    (s) => s !== seat
                )
            );

        }else{

            setSelectedSeats([
                ...selectedSeats,
                seat
            ]);
        }
    };

    const handleProceed =
    () => {

        navigate("/booking", {

            state:{

                ...route,

                seatNumbers:
                selectedSeats.join(","),

                totalSeats:
                selectedSeats.length
            }
        });
    };

    return(

        <div>

            <NavbarComponent />

            <div
            className=
            "container mt-5">

                <div
                className=
                "seat-layout-card">

                    <div
                    className=
                    "d-flex justify-content-between align-items-center mb-4">

                        <h2>

                            {
                            route.busType
                            }

                            Seats

                        </h2>

                        <FaBus
                        size={40}
                        color="#0d6efd" />

                    </div>

                    <div
                    className=
                    "driver-section">

                        Driver

                    </div>

                    <div
                    className=
                    "bus-layout">

                        {
                            seats.map(
                                (seat) => {

                                const isBooked =
                                    bookedSeats
                                    .includes(seat);

                                const isSelected =
                                    selectedSeats
                                    .includes(seat);

                                return(

                                    <div

                                    key={seat}

                                    className={

                                     `seat

                                   ${route.busType !==
                                   "Seater"

                                   ? "sleeper-seat"

                                      : ""}

                                    ${isBooked
                                     ?

                                      "booked"

                                       :

                                    ""}

                                    ${isSelected
                                      ?

                                     "selected"

                                      :

               ""}`
                                    }

                                    onClick={() =>
                                    handleSeatClick(
                                        seat
                                    )
                                    }>

                                        {seat}

                                    </div>
                                );
                            })
                        }

                    </div>

                    <div
                    className=
                    "seat-info">

                        <div
                        className=
                        "info-box">

                            <div
                            className=
                            "seat-demo available">

                            </div>

                            Available

                        </div>

                        <div
                        className=
                        "info-box">

                            <div
                            className=
                            "seat-demo selected">

                            </div>

                            Selected

                        </div>

                        <div
                        className=
                        "info-box">

                            <div
                            className=
                            "seat-demo booked">

                            </div>

                            Booked

                        </div>

                    </div>

                    <h5
                    className="mt-4">

                        Selected Seats:

                        {" "}

                        {
                        selectedSeats.join(
                            ", "
                        )
                        }

                    </h5>

                    <button

                    className=
                    "btn btn-primary mt-3"

                    disabled={
                    selectedSeats.length === 0
                    }

                    onClick=
                    {handleProceed}>

                        Proceed to Booking

                    </button>

                </div>

            </div>

        </div>
    );
}

export default SeatSelectionPage;