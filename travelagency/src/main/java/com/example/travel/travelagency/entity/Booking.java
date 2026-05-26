package com.example.travel.travelagency.entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;

    private String gender;

    private String sourceLocation;

    private String destinationLocation;

    private String busType;

    private double amount;

    private String paymentMethod;

    private String paymentStatus;

    private String invoicePath;
     
    private LocalDate travelDate;

    private String bookingStatus;

    private String seatNumbers;

    private String customerEmail;

    private Long routeId;
    
}
