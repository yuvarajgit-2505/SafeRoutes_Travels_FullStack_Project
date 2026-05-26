package com.example.travel.travelagency.controller;

import com.example.travel.travelagency.dto.BookingRequest;
import com.example.travel.travelagency.entity.Booking;
import com.example.travel.travelagency.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booking")
@CrossOrigin("*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/book")
@PreAuthorize("hasRole('CUSTOMER')")
    public Booking bookTicket(
            @RequestBody BookingRequest request){

        return bookingService.bookTicket(request);
    }

    @GetMapping("/history/{customerName}")
    public List<Booking> getBookings(
            @PathVariable String customerName){

        return bookingService
                .getCustomerBookings(customerName);
    }

    @PutMapping("/cancel/{bookingId}")
    public String cancelBooking(
            @PathVariable Long bookingId){

        return bookingService
                .cancelBooking(bookingId);
    }
   @GetMapping("/booked-seats/{routeId}/{date}/{busType}")

public List<String> getBookedSeats(

        @PathVariable Long routeId,

        @PathVariable String date,

        @PathVariable String busType){

    return bookingService
            .getBookedSeats(
                    routeId,
                    date,
                    busType
            );
}
}