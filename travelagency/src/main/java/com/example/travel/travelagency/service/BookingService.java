package com.example.travel.travelagency.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.travel.travelagency.dto.BookingRequest;
import com.example.travel.travelagency.entity.Booking;
import com.example.travel.travelagency.entity.Route;
import com.example.travel.travelagency.repository.BookingRepository;
import com.example.travel.travelagency.repository.RouteRepository;

@Service
public class BookingService {

     @Autowired
     private EmailService emailService;   
    
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private PdfService pdfService;

    @Autowired
    private WhatsappService whatsappService;

    public Booking bookTicket(BookingRequest request){
        System.out.println(request);
        

        Route route =
        routeRepository.findById(
                request.getRouteId()
        )
        .orElseThrow(() ->

                new RuntimeException(
                        "Invalid Route"
                )
        );

LocalDate travelDate =
        LocalDate.parse(
                request.getTravelDate()
        );

        boolean weekend =
                travelDate.getDayOfWeek() == DayOfWeek.SATURDAY
                        ||
                        travelDate.getDayOfWeek() == DayOfWeek.SUNDAY;

        double amount = calculateFare(
                route,
                request.getBusChoice(),
                weekend
        );

        if(request.getGender()
                .equalsIgnoreCase("female")){

            amount = amount * 0.7;
        }

        Booking booking = new Booking();

        booking.setCustomerName(
                request.getCustomerName());

        booking.setGender(
                request.getGender());

        booking.setSourceLocation(
                request.getSourceLocation());

        booking.setDestinationLocation(
                request.getDestinationLocation());

        booking.setTravelDate(travelDate);

        booking.setBusType(
                getBusType(request.getBusChoice()));

        booking.setAmount(amount);

        booking.setBookingStatus("CONFIRMED");

        if(request.getPaymentChoice() == 1){
            booking.setPaymentMethod("Bank Transfer");
        }
        else{
            booking.setPaymentMethod("Google Pay");
        }

        booking.setPaymentStatus("SUCCESS");

booking.setSeatNumbers(
    request.getSeatNumbers());
    System.out.println(
    request.getSeatNumbers()
);

System.out.println("Before Save");

booking.setRouteId(
    request.getRouteId());

Booking savedBooking =
        bookingRepository.save(booking);
                System.out.println("After Save");

                savedBooking.setCustomerEmail(
    request.getCustomerEmail());

savedBooking.setSeatNumbers(
    request.getSeatNumbers());

savedBooking =
    bookingRepository.save(savedBooking);

String pdfPath =
        pdfService.generateInvoice(savedBooking);

savedBooking.setInvoicePath(pdfPath);

System.out.println(pdfPath);

try{

    emailService.sendInvoiceEmail(
        request.getCustomerEmail(),
        pdfPath
    );

    System.out.println(
        "EMAIL SENT"
    );

}catch(Exception e){

    System.out.println(
        "EMAIL FAILED"
    );

    e.printStackTrace();
}

System.out.println("Before Save");

savedBooking =
    bookingRepository.save(savedBooking);

whatsappService.sendWhatsappMessage(
        "Booking Confirmed");

return savedBooking;
    }

    private double calculateFare(
            Route route,
            int busChoice,
            boolean weekend){

        if(busChoice == 1){

            return weekend
                    ? route.getWeekendAcFare()
                    : route.getWeekdayAcFare();
        }

        else if(busChoice == 2){

            return weekend
                    ? route.getWeekendSleeperFare()
                    : route.getWeekdaySleeperFare();
        }

        else if(busChoice == 3){

            return weekend
                    ? route.getWeekendSeaterFare()
                    : route.getWeekdaySeaterFare();
        }

        throw new RuntimeException(
                "Invalid Bus Type");
    }

    private String getBusType(int choice){

        return switch (choice){

            case 1 -> "AC Sleeper";
            case 2 -> "Sleeper";
            case 3 -> "Seater";
            default -> "Unknown";
        };
    }

    public List<Booking> getCustomerBookings(
            String customerName){

        return bookingRepository
                .findByCustomerEmail(customerName);
    }

    public String cancelBooking(Long bookingId){

        Booking booking =
                bookingRepository.findById(bookingId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Booking Not Found"));

        booking.setBookingStatus("CANCELLED");

        bookingRepository.save(booking);

        return "Booking Cancelled Successfully";
    }

    public List<String> getBookedSeats(
        Long routeId,
        String date,
        String busType){
                System.out.println(routeId);

System.out.println(date);

    LocalDate travelDate =
            LocalDate.parse(date);

    List<Booking> bookings =
            bookingRepository
           .findByRouteIdAndTravelDateAndBusType(
        routeId,
        travelDate,
        busType
);

    return bookings.stream()

            .flatMap(booking ->

                List.of(
                    booking
                    .getSeatNumbers()
                    .split(",")
                ).stream()
            )

            .toList();
}
}