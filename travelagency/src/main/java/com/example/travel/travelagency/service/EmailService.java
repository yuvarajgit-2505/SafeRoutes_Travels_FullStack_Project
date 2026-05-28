package com.example.travel.travelagency.service;

import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.file.Files;
import java.util.Base64;

@Service
public class EmailService {

    @Value("${BREVO_API_KEY}")
    private String apiKey;

    public void sendInvoiceEmail(
            String toEmail,
            String pdfPath) {

        System.out.println(
                "EMAIL METHOD CALLED");

        try {

            System.out.println(
                    "PDF PATH : " + pdfPath
            );

            File file = new File(pdfPath);

            System.out.println(
                    file.exists()
            );

            byte[] fileBytes =
                    Files.readAllBytes(
                            file.toPath()
                    );

            String encodedFile =
                    Base64.getEncoder()
                            .encodeToString(fileBytes);

            OkHttpClient client =
                    new OkHttpClient();

            String json = """
{
  "sender": {
    "name": "SafeRoutes Travels",
    "email": "yuvaraj25525@gmail.com"
  },
  "to": [{
    "email": "%s"
  }],
  "subject": "Travel Booking Invoice",
  "textContent": "Your booking invoice is attached.",
  "attachment": [{
    "content": "%s",
    "name": "%s"
  }]
}
""".formatted(
                    toEmail,
                    encodedFile,
                    file.getName()
            );

            RequestBody body =
                    RequestBody.create(
                            json,
                            MediaType.parse(
                                    "application/json")
                    );

            Request request =
                    new Request.Builder()
                            .url(
                                    "https://api.brevo.com/v3/smtp/email"
                            )
                            .post(body)
                            .addHeader(
                                    "accept",
                                    "application/json"
                            )
                            .addHeader(
                                    "api-key",
                                    apiKey
                            )
                            .addHeader(
                                    "content-type",
                                    "application/json"
                            )
                            .build();

            System.out.println(
                    "BEFORE MAIL SEND"
            );

            Response response =
                    client.newCall(request)
                            .execute();

            System.out.println(
                    response.body().string()
            );

            System.out.println(
                    "MAIL SENT SUCCESSFULLY"
            );

        } catch (Exception e) {

            e.printStackTrace();
        }
    }
}