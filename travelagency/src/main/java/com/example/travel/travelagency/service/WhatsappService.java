package com.example.travel.travelagency.service;

import org.springframework.stereotype.Service;

@Service
public class WhatsappService {
     public void sendWhatsappMessage(String message){

        System.out.println(
                "WhatsApp Message Sent : "
                        + message);
    }
}
