import React, {
    useEffect,
    useState
} from "react";

import API from "../services/api";

import NavbarComponent
from "../components/NavbarComponent";

function RoutesManagement(){

    const [routes,
        setRoutes] =
        useState([]);

    const [routeData,
    setRouteData] =
    useState({

        sourceLocation:"",
        destinationLocation:"",
        startTime:"",
        arrivalTime:"",

        weekdaySeaterFare:"",
        weekendSeaterFare:"",

        weekdaySleeperFare:"",
        weekendSleeperFare:"",

        weekdayAcFare:"",
        weekendAcFare:""
});

    const [editingId,
        setEditingId] =
        useState(null);

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

        }catch(error){

            console.log(error);
        }
    };

    const handleChange =
    (e) => {

        setRouteData({

            ...routeData,

            [e.target.name]:
            e.target.value
        });
    };

    const handleSubmit =
    async(e) => {

        e.preventDefault();

        try{

            if(editingId){

                await API.put(

                    `/route/update/${editingId}`,

                    routeData
                );

                alert(
                    "Route Updated"
                );

            }else{

                await API.post(

                    "/route/add",

                    routeData
                );

                alert(
                    "Route Added"
                );
            }

            setRouteData({

                sourceLocation:"",
                destinationLocation:"",
                startTime:"",
                arrivalTime:""
            });

            setEditingId(null);

            fetchRoutes();

        }catch(error){

            console.log(error);
        }
    };

    const handleDelete =
    async(id) => {

        try{

            await API.delete(
                `/route/delete/${id}`
            );

            alert(
                "Route Deleted"
            );

            fetchRoutes();

        }catch(error){

            console.log(error);
        }
    };

    const handleEdit =
(route) => {

    setEditingId(
        route.id
    );

    setRouteData({

        sourceLocation:
        route.sourceLocation || "",

        destinationLocation:
        route.destinationLocation || "",

        startTime:
        route.startTime || "",

        arrivalTime:
        route.arrivalTime || "",

        weekdaySeaterFare:
        route.weekdaySeaterFare || "",

        weekendSeaterFare:
        route.weekendSeaterFare || "",

        weekdaySleeperFare:
        route.weekdaySleeperFare || "",

        weekendSleeperFare:
        route.weekendSleeperFare || "",

        weekdayAcFare:
        route.weekdayAcFare || "",

        weekendAcFare:
        route.weekendAcFare || ""
    });
};

    return(

        <div>

            <NavbarComponent />

            <div
            className=
            "container mt-5">

                <h2>
                    Route Management
                </h2>

                <form
                onSubmit=
                {handleSubmit}

                className=
                "mt-4">

                    <div
                    className=
                    "row">

                        <div
                        className=
                        "col-md-6 mb-3">

                            <input

                            type="text"

                            name=
                            "sourceLocation"

                            placeholder=
                            "Source"

                            className=
                            "form-control"

                            value=
                            {routeData.sourceLocation}

                            onChange=
                            {handleChange}

                            required
                            />

                        </div>

                        <div
                        className=
                        "col-md-6 mb-3">

                            <input

                            type="text"

                            name=
                            "destinationLocation"

                            placeholder=
                            "Destination"

                            className=
                            "form-control"

                            value=
                            {routeData.destinationLocation}

                            onChange=
                            {handleChange}

                            required
                            />

                        </div>

                        <div
                        className=
                        "col-md-6 mb-3">

                            <input

                            type="text"

                            name=
                            "startTime"

                            placeholder=
                            "Departure Time"

                            className=
                            "form-control"

                            value=
                            {routeData.startTime}

                            onChange=
                            {handleChange}

                            required
                            />

                        </div>

                        <div
                        className=
                        "col-md-6 mb-3">

                            <input

                            type="text"

                            name=
                            "arrivalTime"

                            placeholder=
                            "Arrival Time"

                            className=
                            "form-control"

                            value=
                            {routeData.arrivalTime}

                            onChange=
                            {handleChange}

                            required
                            />

                        </div>
                        <div className="col-md-4 mb-3">

    <input

    type="number"

    name="weekdaySeaterFare"

    placeholder="Weekday Seater Fare"

    className="form-control"

    value={routeData.weekdaySeaterFare}

    onChange={handleChange}

    required
    />

</div>

<div className="col-md-4 mb-3">

    <input

    type="number"

    name="weekendSeaterFare"

    placeholder="Weekend Seater Fare"

    className="form-control"

    value={routeData.weekendSeaterFare}

    onChange={handleChange}

    required
    />

</div>

<div className="col-md-4 mb-3">

    <input

    type="number"

    name="weekdaySleeperFare"

    placeholder="Weekday Sleeper Fare"

    className="form-control"

    value={routeData.weekdaySleeperFare}

    onChange={handleChange}

    required
    />

</div>

<div className="col-md-4 mb-3">

    <input

    type="number"

    name="weekendSleeperFare"

    placeholder="Weekend Sleeper Fare"

    className="form-control"

    value={routeData.weekendSleeperFare}

    onChange={handleChange}

    required
    />

</div>

<div className="col-md-4 mb-3">

    <input

    type="number"

    name="weekdayAcFare"

    placeholder="Weekday AC Fare"

    className="form-control"

    value={routeData.weekdayAcFare}

    onChange={handleChange}

    required
    />

</div>

<div className="col-md-4 mb-3">

    <input

    type="number"

    name="weekendAcFare"

    placeholder="Weekend AC Fare"

    className="form-control"

    value={routeData.weekendAcFare}

    onChange={handleChange}

    required
    />

</div>

                    </div>

                    <button

                    className=
                    "btn btn-primary">

                        {
                        editingId
                        ?
                        "Update Route"
                        :
                        "Add Route"
                        }

                    </button>

                </form>

                <hr className="my-5" />

                <h3>
                    Available Routes
                </h3>

                <table
                className=
                "table table-bordered mt-4">

                    <thead>

                        <tr>

                            <th>
                                Source
                            </th>

                            <th>
                                Destination
                            </th>

                            <th>
                                Departure
                            </th>

                            <th>
                                Arrival
                            </th>

                            <th>
                                Seater Fare
                            </th>

                            <th>
                                Sleeper Fare
                            </th>

                            <th>
                                AC Fare
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                        routes.map(
                        (route) => (

                        <tr
                        key=
                        {`${route.id}-${route.startTime}`}>

                            <td>
                                {route.sourceLocation}
                            </td>

                            <td>
                                {route.destinationLocation}
                            </td>

                            <td>
                                {route.startTime}
                            </td>

                            <td>
                                {route.arrivalTime}
                            </td>

                            <td>
                                ₹{route.weekdaySeaterFare}
                            </td>

                            <td>
                                ₹{route.weekdaySleeperFare}
                            </td>

                            <td>
                                ₹{route.weekdayAcFare}
                            </td>

                            <td>

                                <button

                                className=
                                "btn btn-warning btn-sm me-2"

                                onClick={() =>
                                handleEdit(route)
                                }>

                                    Update

                                </button>

                                <button

                                className=
                                "btn btn-danger btn-sm"

                                onClick={() =>
                                handleDelete(
                                route.id
                                )
                                }>

                                    Delete

                                </button>

                            </td>

                        </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default RoutesManagement;