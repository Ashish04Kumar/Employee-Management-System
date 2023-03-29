package com.user.usermanagement.repository;

import com.user.usermanagement.model.TaskDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ITaskDetailsRepository extends JpaRepository<TaskDetails, Integer> {

    List<TaskDetails> findByAssignedTo(int id);

    List<TaskDetails> findByAssignedBy(int id);
}
