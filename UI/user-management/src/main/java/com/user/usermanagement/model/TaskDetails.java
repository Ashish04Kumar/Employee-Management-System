package com.user.usermanagement.model;

import com.fasterxml.jackson.annotation.JsonFormat;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity(name = "task_details")
public class TaskDetails {

    @Id
    @GeneratedValue
    private int taskId;
    private String taskName;
    private int assignedTo;
    private int assignedBy;

    private String status;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate updatedAt;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate createdAt;

	public int getTaskId() {
		return taskId;
	}

	public void setTaskId(int taskId) {
		this.taskId = taskId;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public int getAssignedTo() {
		return assignedTo;
	}

	public void setAssignedTo(int assignedTo) {
		this.assignedTo = assignedTo;
	}

	public int getAssignedBy() {
		return assignedBy;
	}

	public void setAssignedBy(int assignedBy) {
		this.assignedBy = assignedBy;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDate getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDate updatedAt) {
		this.updatedAt = updatedAt;
	}

	public LocalDate getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDate createdAt) {
		this.createdAt = createdAt;
	}
    
    
    
    
}
