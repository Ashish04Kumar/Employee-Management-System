package com.user.usermanagement.repository;


import com.user.usermanagement.model.Leave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ILeaveRepository extends JpaRepository<Leave, Integer> {

    Optional<List<Leave>> findByAppliedBy(int id);

    List<Leave> findByAppliedByIn(List<Integer> subordinateIds);
}
