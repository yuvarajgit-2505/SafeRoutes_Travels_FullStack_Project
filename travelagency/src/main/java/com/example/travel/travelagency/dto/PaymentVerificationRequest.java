package com.example.travel.travelagency.dto;

import lombok.Data;

@Data
public class PaymentVerificationRequest {

    private String paymentId;

    private String orderId;

    private String signature;
}