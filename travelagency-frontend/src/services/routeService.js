import API from "./api";

export const getAllRoutes = async() => {

    return await API.get("/route/all");
};

export const addRoute = async(data, token) => {

    return await API.post(
        "/route/add",
        data,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );
};