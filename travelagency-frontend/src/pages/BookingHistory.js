import React, {
    useState
} from "react";

import "./Home.css";

import NavbarComponent
from "../components/NavbarComponent";

import {
    getBookingHistory
} from "../services/bookingService";

function BookingHistory(){

    const [email, setEmail] =
        useState("");

    const [history, setHistory] =
        useState([]);

    const token =
        localStorage.getItem("token");

    const fetchHistory = async() => {

        try{
             const response =
                await getBookingHistory(
                    email,
                    token
                );

            setHistory(response.data);

        }catch(error){

            console.log(error);
        }
    };

    return(

        <div >

            <NavbarComponent />

            <div className="container mt-5">

                <h2>
                    Booking History
                </h2>

                <input
                    type="email"
                    placeholder="Enter Customer Email"
                    className="form-control mb-3"
                    onChange={(e) =>
                        setEmail(e.target.value)}
                />
                <button
                    className="btn btn-primary mb-3"
                    onClick={fetchHistory}>

                    Get History

                </button>

                {
                    history.map((booking) => (

                        <div
                            className="card p-3 mb-3"
                            key={booking.id}>

                            <h5>
                                {booking.customerEmail}
                            </h5>

                            <p>
                                {booking.sourceLocation}
                                →
                                {booking.destinationLocation}
                            </p>

                            <p>
                                ₹{booking.amount}
                            </p>

                            <p>
                                {booking.bookingStatus}
                            </p>
                             </div>
                    ))
                }

            </div>

        </div>
    );
}

export default BookingHistory;
