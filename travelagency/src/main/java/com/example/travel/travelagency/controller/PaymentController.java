package com.example.travel.travelagency.controller;

import com.example.travel.travelagency.dto.PaymentVerificationRequest;
import com.example.travel.travelagency.service.PaymentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@CrossOrigin("*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-order/{amount}")
    public String createOrder(
            @PathVariable double amount){

        return paymentService
                .createOrder(amount);
    }

    @PostMapping("/verify")
public String verifyPayment(

        @RequestBody
        PaymentVerificationRequest request){

    return paymentService.verifyPayment(

            request.getPaymentId(),

            request.getOrderId()
    );
}
}