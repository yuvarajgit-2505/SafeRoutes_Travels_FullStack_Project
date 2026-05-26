import API from "./api";

export const createOrder =
    async(amount) => {

    return await API.post(
        `/payment/create-order/${amount}`
    );
};

export const verifyPayment =
    async(paymentData) => {

    return await API.post(
        "/payment/verify",
        paymentData
    );
};