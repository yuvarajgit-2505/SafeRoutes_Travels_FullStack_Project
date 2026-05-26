package com.example.travel.travelagency.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.travel.travelagency.entity.Booking;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking,Long>{
    List<Booking> findByCustomerEmail(String customerEmail);

List<Booking>
findByRouteIdAndTravelDateAndBusType(

        Long routeId,

        LocalDate travelDate,

        String busType
);

} 
