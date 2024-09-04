package com.evms.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import com.evms.model.Event;
import com.evms.model.Registration;
import com.evms.model.RegistrationDTO;
import com.evms.service.EventService;
import com.evms.service.RegistrationService;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private RegistrationService registrationService;

    @Autowired
    private JavaMailSender mailSender;

    // Retrieve all events
    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    // Retrieve a specific event by ID
    @GetMapping("/{id}")
    public Event getEventById(@PathVariable Long id) {
        return eventService.getEventById(id);
    }

    // Create a new event
    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventService.saveEvent(event);
    }

    // Update an existing event by ID
    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event event) {
        event.setId(id);
        return eventService.saveEvent(event);
    }

    // Delete an event by ID
    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
    }

    // Register for an event and send a confirmation email
    @PostMapping("/{id}/register")
    public String registerForEvent(@PathVariable Long id, @RequestBody RegistrationDTO registrationDTO) {
        Event event = eventService.getEventById(id);
        if (event != null) {
            // Create and save the registration
            Registration registration = new Registration();
            registration.setEvent(event);
            registration.setName(registrationDTO.getName());
            registration.setEmail(registrationDTO.getEmail());
            registration.setRegistrationTime(LocalDateTime.now());
            registrationService.saveRegistration(registration);

            // Send confirmation mail
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(registration.getEmail());
            message.setSubject("Registration Confirmation");
            message.setText("Dear " + registration.getName() + ",\n\nThank you for registering for the event: " + event.getTitle() + "\n\nEvent Details:\n" + event.getDescription() + "\n\nDate: " + event.getEventDate() + "\n\nCategory: " + event.getCategory() + "\n\nBest regards,\nEvent Management Team");
            mailSender.send(message);

            return "Registration successful!";
        }
        return "Event not found!";
    }

    // Get registered users for a specific event
    @GetMapping("/{id}/registrations")
    public List<Registration> getRegistrationsForEvent(@PathVariable Long id) {
        return registrationService.getRegistrationsByEventId(id);
    }
}
