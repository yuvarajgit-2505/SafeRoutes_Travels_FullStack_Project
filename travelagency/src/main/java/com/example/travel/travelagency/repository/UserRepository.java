package com.example.travel.travelagency.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.travel.travelagency.entity.User;

public interface UserRepository extends JpaRepository<User,Long> {


    Optional<User> findByEmail(String email);
} 
