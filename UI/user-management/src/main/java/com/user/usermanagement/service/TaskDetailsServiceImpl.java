package com.user.usermanagement.service;

import com.user.usermanagement.model.Leave;
import com.user.usermanagement.model.TaskDetails;
import com.user.usermanagement.model.User;
import com.user.usermanagement.repository.ITaskDetailsRepository;
import com.user.usermanagement.util.RestTemplateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskDetailsServiceImpl {

    @Autowired
    private ITaskDetailsRepository taskDetailsRepository;


    public void add(TaskDetails task) {
        taskDetailsRepository.save(task);
    }

    public List<TaskDetails> findByAssignedTo(int id) {
        return taskDetailsRepository.findByAssignedTo(id);
    }

    public List<TaskDetails> findByAssignedBy(int id) {
        return taskDetailsRepository.findByAssignedBy(id);
    }

    public Optional<TaskDetails> findById(int id) {
        return taskDetailsRepository.findById(id);
    }
}
