package com.user.usermanagement.controller;

import com.user.usermanagement.model.Leave;
import com.user.usermanagement.model.MessageResponse;
import com.user.usermanagement.model.TaskDetails;
import com.user.usermanagement.service.LeaveServiceImpl;
import com.user.usermanagement.service.TaskDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    private LeaveServiceImpl bookService;

    @Autowired
    private TaskDetailsServiceImpl taskDetailsService;

    @PostMapping("/add")
    public ResponseEntity<?> addTask(@RequestBody TaskDetails task){
        try{
            task.setStatus("Assigned");
            task.setCreatedAt(LocalDate.now());
            taskDetailsService.add(task);
            return ResponseEntity.ok().body(new MessageResponse("Leave application submitted successfully!"));
        } catch(Exception e){
            return ResponseEntity.badRequest().body(new MessageResponse("Error while applying for leave!"));
        }
    }

    @GetMapping("/get/emp/{id}")
    public ResponseEntity<?> getTasksForEmployee(@PathVariable(name = "id") int id){
        List<TaskDetails> tasks = taskDetailsService.findByAssignedTo(id);
        if(!CollectionUtils.isEmpty(tasks)){
            return ResponseEntity.ok(tasks);
        }
        return ResponseEntity.ok().body(new MessageResponse("No tasks found!"));
    }

    @GetMapping("/get/mgr/{id}")
    public ResponseEntity<?> getTasksByManager(@PathVariable(name = "id") int id){
        List<TaskDetails> tasks = taskDetailsService.findByAssignedBy(id);
        if(!CollectionUtils.isEmpty(tasks)){
            return ResponseEntity.ok(tasks);
        }
        return ResponseEntity.ok().body(new MessageResponse("No tasks assigned by you!"));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateTaskStatus(@PathVariable(name = "id")int id, @RequestParam("status")String status){
        Optional<TaskDetails> task = taskDetailsService.findById(id);
        if(task.isPresent()){
            task.get().setUpdatedAt(LocalDate.now());
            task.get().setStatus(status);
            taskDetailsService.add(task.get());
            return ResponseEntity.ok().body(new MessageResponse("Task updated successfully!"));
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Error while updating task!"));
    }
}
