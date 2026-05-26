import API from "./api";

export const createBooking = async(data, token) => {

    return await API.post(
        "/booking/book",
        data,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );
};

export const getBookingHistory = async(name, token) => {

    return await API.get(
        `/booking/history/${name}`,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );
};