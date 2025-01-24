package com.EventPlanner.EventPlannerApp.repo;


import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.EventPlanner.EventPlannerApp.domain.User;
//class for fetching data from db
@Repository
public interface UserRepo extends JpaRepository<User, Long>{
	
	User findByUsername(String username);

	Optional<User> findById(Long id);

}