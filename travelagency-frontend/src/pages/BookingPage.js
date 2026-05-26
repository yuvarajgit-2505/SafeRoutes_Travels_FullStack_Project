import React, {
    useState
} from "react";

import "./Home.css";

import { useLocation }
from "react-router-dom";

import NavbarComponent
from "../components/NavbarComponent";

import {
    createBooking
} from "../services/bookingService";

import {
    createOrder,
    verifyPayment
} from "../services/paymentService";

function BookingPage(){

    const location = useLocation();

    const route = location.state;
    console.log(route);

    const token =
        localStorage.getItem("token");

    const [booking, setBooking] =
    useState({

        customerName:"",

        gender:"",

        sourceLocation:
            route.sourceLocation,

        destinationLocation:
            route.destinationLocation,

        seatNumbers:
             route.seatNumbers,

             totalSeats:
                route.totalSeats,

                routeId:
               route.routeId,

        customerEmail:"",

        busChoice:1,

        paymentChoice:2,

        travelDate:
         route.travelDate,
    });
    

    const handleChange = (e) => {

        setBooking({

            ...booking,

            [e.target.name]:
                e.target.value
        });
    };

    const getTicketFare = () => {

    const isWeekend =
        new Date(
            route.travelDate
        ).getDay() === 0 ||

        new Date(
            route.travelDate
        ).getDay() === 6;

    if(route.busChoice === 1){

        return isWeekend

        ?

        route.weekendAcFare

        :

        route.weekdayAcFare;
    }

    if(route.busChoice === 2){

        return isWeekend

        ?

        route.weekendSleeperFare

        :

        route.weekdaySleeperFare;
    }

    return isWeekend

    ?

    route.weekendSeaterFare

    :

    route.weekdaySeaterFare;
};

    const handlePayment = async() => {

        try{

            const orderResponse =
                await createOrder(
    getTicketFare() *
    booking.totalSeats
);

            const order =
                orderResponse.data;

            const options = {

                key:
                "rzp_test_SoR39U6XoDjQFr",

                amount:
                order.amount,

                currency:
                order.currency,

                name:
                "Travel Agency",

                description:
                "Bus Ticket Booking",

                order_id:
                order.id,

               handler: async function(response){

    try{

        console.log("PAYMENT SUCCESS");

        console.log(response);

        const verifyResponse =
            await verifyPayment({

            paymentId:
            response.razorpay_payment_id,

            orderId:
            response.razorpay_order_id,

            signature:
            response.razorpay_signature

        }, token);

        console.log(
            "VERIFY SUCCESS"
        );

        console.log(
            verifyResponse.data
        );

        console.log(
            "CALLING BOOKING API"
        );

console.log(booking);
        const bookingResponse =
            await createBooking(
                booking,
                token
            );

        console.log(
            "BOOKING SUCCESS"
        );

        console.log(
            bookingResponse.data
        );

        alert(
            "Payment & Booking Successful"
        );

    }catch(error){

        console.log(
            "BOOKING ERROR"
        );

        console.log(error);

        if(error.response){

            console.log(
                error.response.data
            );
        }

        alert(
            "Booking Failed"
        );
    }
},
prefill:{

    name:
    booking.customerName
},

theme:{
    color:"#3399cc"
}

};

const razorpay =
    new window.Razorpay(
        options
    );

razorpay.open();

}catch(error){

    console.log(error);

    alert(
        "Payment Failed"
    );
}
};

    return(

        <div>

            <NavbarComponent />

            <div className="container mt-5">

                <h2>
                    Booking Page
                </h2>
                <h5 className="mb-3">

    Selected Seats:

    {booking.seatNumbers}

</h5>

                <form
                onSubmit={(e) => {

                    e.preventDefault();

                    handlePayment();
                }}>

                    <input
                        type="text"
                        name="customerName"
                        placeholder="Customer Name"
                        className="form-control mb-3"
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="gender"
                        placeholder="Gender"
                        className="form-control mb-3"
                        onChange={handleChange}
                    />
                    <input
    type="email"
    name="customerEmail"
    placeholder="Email"
    className="form-control mb-3"
    onChange={handleChange}
/>

                    <button
                        className="btn btn-success">

                        Pay & Confirm Booking

                    </button>

                </form>

            </div>

        </div>
    );
}

export default BookingPage;