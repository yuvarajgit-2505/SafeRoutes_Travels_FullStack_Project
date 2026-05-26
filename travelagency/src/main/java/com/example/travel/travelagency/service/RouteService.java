package com.example.travel.travelagency.service;

import com.example.travel.travelagency.entity.Route;
import com.example.travel.travelagency.repository.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RouteService {

    @Autowired
    private RouteRepository routeRepository;

    public Route addRoute(Route route){

        return routeRepository.save(route);
    }

    public List<Route> getAllRoutes(){

        return routeRepository.findAll();
    }
}