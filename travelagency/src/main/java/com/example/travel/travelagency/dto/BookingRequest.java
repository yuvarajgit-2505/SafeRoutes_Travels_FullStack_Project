package com.example.travel.travelagency.dto;

import lombok.Data;

@Data
public class BookingRequest {
    private String customerName;

    private String gender;

    private String travelDate;

    private String sourceLocation;

    private String destinationLocation;

    private int busChoice;

    private int paymentChoice;

    private String customerEmail;

    private String seatNumbers;

    private Long routeId;

    
}
