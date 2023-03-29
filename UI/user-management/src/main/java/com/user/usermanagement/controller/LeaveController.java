package com.user.usermanagement.controller;

import com.user.usermanagement.model.Leave;
import com.user.usermanagement.model.MessageResponse;
import com.user.usermanagement.service.LeaveServiceImpl;
import com.user.usermanagement.service.TaskDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/leaves")
public class LeaveController {

    @Autowired
    private LeaveServiceImpl leaveService;

    @Autowired
    private TaskDetailsServiceImpl taskDetailsService;

    @PostMapping("/apply")
    public ResponseEntity<?> applyForLeave(@RequestBody Leave leave){
        try{
            leave.setStatus("Applied");
            leaveService.add(leave);
            return ResponseEntity.ok().body(new MessageResponse("Leave application submitted successfully!"));
        } catch(Exception e){
            return ResponseEntity.badRequest().body(new MessageResponse("Error while applying for leave!"));
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<List<Leave>> getLeavesById(@PathVariable(name = "id")int id){
        Optional<List<Leave>> leaves = leaveService.findByAppliedBy(id);
        if(leaves.isPresent()){
            return new ResponseEntity<>(leaves.get(), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @GetMapping("/all/mgr/{id}")
    public ResponseEntity<?> getLeavesForSubordinates(@PathVariable(name = "id")int id,
                                                      @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader){
        List<Leave> leaves = leaveService.getLeavesForSubordinates(id, authHeader);
        if(!CollectionUtils.isEmpty(leaves)){
            return new ResponseEntity<>(leaves, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @PutMapping("/accept/{id}")
    public ResponseEntity<?> acceptLeave(@PathVariable(name = "id") int id){
        try{
            Optional<Leave> leave = leaveService.findByid(id);
            if(leave.isPresent()){
                leave.get().setStatus("Accepted");
                leaveService.add(leave.get());
                return ResponseEntity.ok().body(new MessageResponse("Leave application approved successfully!"));
            }

        } catch(Exception e){
            return ResponseEntity.badRequest().body(new MessageResponse("Error while approving leave!"));
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Error while accepting leave!"));
    }

    @PutMapping("/reject/{id}")
    public ResponseEntity<?> rejectLeave(@PathVariable(name = "id") int id){
        try{
            Optional<Leave> leave = leaveService.findByid(id);
            if(leave.isPresent()){
                leave.get().setStatus("Rejected");
                leaveService.add(leave.get());
                return ResponseEntity.ok().body(new MessageResponse("Leave application rejected successfully!"));
            }

        } catch(Exception e){
            return ResponseEntity.badRequest().body(new MessageResponse("Error while rejecting leave!"));
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Error while rejecting leave!"));
    }

}
