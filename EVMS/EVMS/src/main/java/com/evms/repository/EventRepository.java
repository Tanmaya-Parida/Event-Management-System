package com.evms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.evms.model.Event;

public interface EventRepository extends JpaRepository<Event, Long>{

	List<Event> findAll();

}
