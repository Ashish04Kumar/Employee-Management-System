package com.user.usermanagement.service;

import com.user.usermanagement.model.Leave;
import com.user.usermanagement.repository.ILeaveRepository;
import com.user.usermanagement.util.RestTemplateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Optional;

@Service
public class LeaveServiceImpl {

    @Autowired
    private ILeaveRepository leaveRepository;

    @Autowired
    private RestTemplateUtil restTemplateUtil;

    public Leave add(Leave leave) {
        return leaveRepository.save(leave);
    }

    public Optional<List<Leave>> findByAppliedBy(int id) {
        return leaveRepository.findByAppliedBy(id);
    }


    public Optional<Leave> findByid(int id) {
        return leaveRepository.findById(id);
    }

    public List<Leave> getLeavesForSubordinates(int id, String authHeader) {
        List<Integer> subordinateIds = restTemplateUtil.getSubordinateIds(id, authHeader);
        if(CollectionUtils.isEmpty(subordinateIds)){
            return null;
        }
        List<Leave> leaves = leaveRepository.findByAppliedByIn(subordinateIds);
        return leaves;
    }
}
