package com.example.travel.travelagency.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.*;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

import java.io.File;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendInvoiceEmail(
        String toEmail,
        String pdfPath){

    System.out.println(
            "EMAIL METHOD CALLED");

    try{

        MimeMessage message =
                mailSender.createMimeMessage();

        MimeMessageHelper helper =
                new MimeMessageHelper(
                        message,
                        true
                );

        helper.setTo(toEmail);

        helper.setSubject(
                "Travel Booking Invoice"
        );

        helper.setText(
                "Your booking invoice is attached."
        );

        System.out.println(
                "PDF PATH : " + pdfPath
        );

        FileSystemResource file =
                new FileSystemResource(
                        new File(pdfPath)
                );

        System.out.println(
                file.exists()
        );

        helper.addAttachment(
        file.getFilename(),
        file
);

        System.out.println(
                "BEFORE MAIL SEND"
        );

        mailSender.send(message);

        System.out.println(
                "MAIL SENT SUCCESSFULLY"
        );

    }catch(Exception e){

        e.printStackTrace();
    }
}
}