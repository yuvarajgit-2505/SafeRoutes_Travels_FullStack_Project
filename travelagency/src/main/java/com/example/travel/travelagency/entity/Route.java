package com.example.travel.travelagency.entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;
@Entity
@Data
@Table(name = "routes")
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sourceLocation;

    private String destinationLocation;

    private double weekdayAcFare;

    private double weekendAcFare;

    private double weekdaySleeperFare;

    private double weekendSleeperFare;

    private double weekdaySeaterFare;

    private double weekendSeaterFare;

    private String startTime;

    private String arrivalTime;

    private LocalDate travelDate;
}
