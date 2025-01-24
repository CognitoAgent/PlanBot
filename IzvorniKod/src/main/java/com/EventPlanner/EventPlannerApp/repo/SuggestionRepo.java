package com.EventPlanner.EventPlannerApp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.EventPlanner.EventPlannerApp.domain.Suggestion;

@Repository
public interface SuggestionRepo extends JpaRepository<Suggestion, Long>{

}
