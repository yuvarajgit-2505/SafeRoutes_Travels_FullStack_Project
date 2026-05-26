package com.example.travel.travelagency.controller;

import com.example.travel.travelagency.entity.Route;
import com.example.travel.travelagency.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/route")
@CrossOrigin("*")
public class RouteController {

    @Autowired
    private RouteService routeService;

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public Route addRoute(
            @RequestBody Route route){

        return routeService.addRoute(route);
    }

    @GetMapping("/all")
    public List<Route> getAllRoutes(){

        return routeService.getAllRoutes();
    }
}