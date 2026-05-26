package com.example.travel.travelagency.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.travel.travelagency.entity.Route;

public interface RouteRepository extends JpaRepository<Route,Long> {
    
     Optional<Route> findBySourceLocationAndDestinationLocation(
            String sourceLocation,
            String destinationLocation
    );
}
