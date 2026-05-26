package com.example.travel.travelagency.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.travel.travelagency.dto.AuthResponse;
import com.example.travel.travelagency.dto.LoginRequest;
import com.example.travel.travelagency.dto.RegisterRequest;
import com.example.travel.travelagency.service.AuthService;


@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {
     @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String register(
            @RequestBody RegisterRequest request){

        return authService.register(request);
    }

    @PostMapping("/login")

public AuthResponse login(

        @RequestBody LoginRequest request){

    return authService.login(request);
}
}
