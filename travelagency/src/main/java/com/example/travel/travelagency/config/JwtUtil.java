package com.example.travel.travelagency.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;

import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String SECRET;

    private SecretKey getSecretKey(){

        return Keys.hmacShaKeyFor(
                SECRET.getBytes());
    }

    public String generateToken(
            String email){

        return Jwts.builder()

                .setSubject(email)

                .setIssuedAt(
                        new Date())

                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 1000 * 60 * 60 * 10))

                .signWith(
                        getSecretKey(),
                        SignatureAlgorithm.HS256)

                .compact();
    }

    public String extractEmail(
            String token){

        Claims claims =

                Jwts.parserBuilder()

                        .setSigningKey(
                                getSecretKey())

                        .build()

                        .parseClaimsJws(token)

                        .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(
            String token){

        try{

            Jwts.parserBuilder()

                    .setSigningKey(
                            getSecretKey())

                    .build()

                    .parseClaimsJws(token);

            return true;

        }catch (Exception e){

            return false;
        }
    }
}