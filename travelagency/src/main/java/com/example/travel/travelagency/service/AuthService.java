package com.example.travel.travelagency.service;

import com.example.travel.travelagency.config.JwtUtil;
import com.example.travel.travelagency.dto.AuthResponse;
import com.example.travel.travelagency.dto.LoginRequest;
import com.example.travel.travelagency.dto.RegisterRequest;
import com.example.travel.travelagency.entity.Role;
import com.example.travel.travelagency.entity.User;
import com.example.travel.travelagency.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String register(
            RegisterRequest request){

        User user = new User();

        user.setName(request.getName());

        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()));

        user.setMobile(request.getMobile());

        user.setRole(Role.CUSTOMER);

        userRepository.save(user);

        return "User Registered Successfully";
    }

    public AuthResponse login(
            LoginRequest request){

        User user =
                userRepository.findByEmail(
                                request.getEmail())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User Not Found"));

        if(!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())){

            throw new RuntimeException(
                    "Invalid Password");
        }

        return new AuthResponse(
        jwtUtil.generateToken(
                user.getEmail()
        ),

        user.getRole().toString(),

        user.getName()
);
    }
}