package com.example.travel.travelagency.service;

import com.example.travel.travelagency.entity.Payment;
import com.example.travel.travelagency.repository.PaymentRepository;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;

import org.springframework.beans.factory.annotation.Value;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;
     
    @Value("${razorpay.key.id}")
    private String KEY ;

    @Value("${razorpay.key.secret}")
    private String SECRET;

    public String createOrder(double amount){

        try{

            RazorpayClient razorpay =
                    new RazorpayClient(KEY, SECRET);

            JSONObject orderRequest =
                    new JSONObject();

            orderRequest.put(
                    "amount",
                    amount * 100);

            orderRequest.put(
                    "currency",
                    "INR");

            orderRequest.put(
                    "receipt",
                    "txn_123456");

            Order order =
                    razorpay.orders.create(orderRequest);

            Payment payment = new Payment();

            payment.setRazorpayOrderId(
                    order.get("id"));

            payment.setAmount(amount);

            payment.setStatus("CREATED");

            paymentRepository.save(payment);

            return order.toString();

        }catch (Exception e){

            throw new RuntimeException(
                    "Payment Order Failed");
        }
        
    }
    public String verifyPayment(
        String razorpayPaymentId,
        String razorpayOrderId){

    Payment payment =
            paymentRepository.findAll()
                    .stream()

                    .filter(p ->
                            p.getRazorpayOrderId()
                                    .equals(razorpayOrderId))

                    .findFirst()

                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Payment Not Found"));

    payment.setRazorpayPaymentId(
            razorpayPaymentId);

    payment.setStatus("SUCCESS");

    payment.setBookingStatus("CONFIRMED");

    paymentRepository.save(payment);

    return "Payment Verified Successfully";
}
}