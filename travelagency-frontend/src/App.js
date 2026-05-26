import React from "react";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Home from "./pages/Home";

import RoutesPage from "./pages/RoutesPage";

import BookingPage from "./pages/BookingPage";

import BookingHistory from "./pages/BookingHistory";

import AdminDashboard
from "./pages/AdminDashboard";

import CustomerDashboard
from "./pages/CustomerDashboard";

import SeatSelectionPage
from "./pages/SeatSelectionPage";

import RoutesManagement
from "./pages/RoutesManagement";

function App(){

    return(

        <BrowserRouter>

            <Routes>

                <Route
                    path="/routes-management"
                    element={<RoutesManagement />}
                />

                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/home"
                    element={<Home />}
                />
                 <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/routes"
                    element={<RoutesPage />}
                />

                <Route
                    path="/booking"
                    element={<BookingPage />}
                />

                <Route
                    path="/history"
                    element={<BookingHistory />}
                />

                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/customer"
                    element={<CustomerDashboard />}
                />

                <Route
                    path="/seat-selection"
                    element={<SeatSelectionPage />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;