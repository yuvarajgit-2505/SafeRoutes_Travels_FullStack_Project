package com.example.travel.travelagency.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http)
            throws Exception {

        http
        .cors(cors -> {})
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth

                        .requestMatchers(
                                "/auth/**")
                        .permitAll()

                        .requestMatchers(
                                "/payment/**")
                        .permitAll()

                        .requestMatchers(
        "/route/all")
.permitAll()

.requestMatchers(
        "/route/add",
        "/route/update/**",
        "/route/delete/**")
.hasRole("ADMIN")

                        .requestMatchers(
                                "/booking/**")
                        .hasAnyRole("CUSTOMER","ADMIN")

                        .anyRequest()
                        .authenticated()
                )

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS))

                .addFilterBefore(
                        jwtFilter,
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){

        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config)
            throws Exception {

        return config.getAuthenticationManager();
    }
    @Bean
public org.springframework.web.cors.CorsConfigurationSource
corsConfigurationSource(){

    org.springframework.web.cors.CorsConfiguration
            configuration =
            new org.springframework.web.cors.CorsConfiguration();

    configuration.addAllowedOrigin("*");

    configuration.addAllowedMethod("*");

    configuration.addAllowedHeader("*");

    org.springframework.web.cors.UrlBasedCorsConfigurationSource
            source =
            new org.springframework.web.cors.UrlBasedCorsConfigurationSource();

    source.registerCorsConfiguration(
            "/**",
            configuration
    );

    return source;
}
}