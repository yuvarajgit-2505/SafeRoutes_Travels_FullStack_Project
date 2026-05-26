package com.example.travel.travelagency.controller;

import com.example.travel.travelagency.entity.Booking;
import com.example.travel.travelagency.repository.BookingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.*;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.nio.file.*;

@RestController
@RequestMapping("/invoice")
@CrossOrigin("*")
public class InvoiceController {

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping("/download/{bookingId}")
    public ResponseEntity<Resource> downloadInvoice(
            @PathVariable Long bookingId)
            throws Exception {

        Booking booking =
                bookingRepository.findById(bookingId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Booking Not Found"));

        Path path =
                Paths.get(
                        booking.getInvoicePath());

        Resource resource =
                new UrlResource(
                        path.toUri());

        return ResponseEntity.ok()

                .contentType(
                        MediaType.APPLICATION_PDF)

                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=invoice.pdf")

                .body(resource);
    }
}