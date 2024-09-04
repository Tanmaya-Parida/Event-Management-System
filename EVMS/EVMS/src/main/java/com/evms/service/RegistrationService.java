package com.evms.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.evms.model.Registration;
import com.evms.repository.RegistrationRepository;

@Service
public class RegistrationService {

    @Autowired
    private RegistrationRepository registrationRepository;

    public List<Registration> getRegistrationsByEventId(Long eventId) {
        return registrationRepository.findByEventId(eventId);
    }

    public Registration saveRegistration(Registration registration) {
        return registrationRepository.save(registration);
    }
}
