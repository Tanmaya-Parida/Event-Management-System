package com.evms.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.evms.model.Registration;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    List<Registration> findByEventId(Long eventId);
}
