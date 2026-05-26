package com.example.travel.travelagency.service;

import com.example.travel.travelagency.entity.Booking;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;

@Service
public class PdfService {

    public String generateInvoice(
            Booking booking){

        try{

            new File("invoices").mkdirs();

            String pdfPath =
                    "invoice_"
                    + booking.getId()
                    + ".pdf";

            Document document =
                    new Document();

            PdfWriter.getInstance(
                    document,
                    new FileOutputStream(pdfPath)
            );

            document.open();

            Image logo = Image.getInstance(
                    "src/main/resources/static/logo1.jpeg"
            );

            logo.scaleToFit(140, 140);

            logo.setAlignment(
                    Element.ALIGN_CENTER
            );

            document.add(logo);

            Font titleFont =
                    new Font(
                            Font.FontFamily.HELVETICA,
                            24,
                            Font.BOLD,
                            BaseColor.BLUE
                    );

            Paragraph title =
                    new Paragraph(
                            "SafeRoutes Travels",
                            titleFont
                    );

            title.setAlignment(
                    Element.ALIGN_CENTER
            );

            document.add(title);

            Paragraph subtitle =
                    new Paragraph(
                            "Bus Ticket Confirmation"
                    );

            subtitle.setAlignment(
                    Element.ALIGN_CENTER
            );

            subtitle.setSpacingAfter(25);

            document.add(subtitle);

            PdfPTable table =
                    new PdfPTable(2);

            table.setWidthPercentage(100);

            table.setSpacingBefore(10);

            table.setSpacingAfter(20);

            addRow(
                    table,
                    "Passenger Name",
                    booking.getCustomerName()
            );

            addRow(
                    table,
                    "Email",
                    booking.getCustomerEmail()
            );

            addRow(
                    table,
                    "Source",
                    booking.getSourceLocation()
            );

            addRow(
                    table,
                    "Destination",
                    booking.getDestinationLocation()
            );

            addRow(
                    table,
                    "Travel Date",
                    booking.getTravelDate().toString()
            );

            addRow(
                    table,
                    "Bus Type",
                    booking.getBusType()
            );

            addRow(
                    table,
                    "Seats",
                    booking.getSeatNumbers()
            );

            addRow(
                    table,
                    "Booking Status",
                    booking.getBookingStatus()
            );

            addRow(
                    table,
                    "Payment Status",
                    booking.getPaymentStatus()
            );

            addRow(
                    table,
                    "Amount Paid",
                    "₹ " + booking.getAmount()
            );

            document.add(table);

            Font thankFont =
                    new Font(
                            Font.FontFamily.HELVETICA,
                            16,
                            Font.BOLD,
                            BaseColor.DARK_GRAY
                    );

            Paragraph thankYou =
                    new Paragraph(
                            "Thank you for choosing SafeRoutes Travels!",
                            thankFont
                    );

            thankYou.setAlignment(
                    Element.ALIGN_CENTER
            );

            thankYou.setSpacingBefore(20);

            document.add(thankYou);

            Paragraph footer =
                    new Paragraph(
                            "Have a safe and comfortable journey."
                    );

            footer.setAlignment(
                    Element.ALIGN_CENTER
            );

            document.add(footer);

            document.close();

            return pdfPath;

        }catch(Exception e){

            e.printStackTrace();

            throw new RuntimeException(
                    "PDF Generation Failed"
            );
        }
    }

    private void addRow(
            PdfPTable table,
            String key,
            String value){

        PdfPCell cell1 =
                new PdfPCell(
                        new Phrase(key)
                );

        PdfPCell cell2 =
                new PdfPCell(
                        new Phrase(
                                value != null
                                ? value
                                : "N/A"
                        )
                );

        cell1.setPadding(10);

        cell2.setPadding(10);

        cell1.setBackgroundColor(
                BaseColor.LIGHT_GRAY
        );

        table.addCell(cell1);

        table.addCell(cell2);
    }
}