package com.user.usermanagement.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;
import java.time.LocalDate;
import java.util.List;

@Entity(name = "leaves")

@JsonIgnoreProperties (ignoreUnknown = true)
public class Leave {

    @Id
    @GeneratedValue
    private int leaveId;

    private int appliedBy;
    private String status;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dateOfAbsence;

	public int getLeaveId() {
		return leaveId;
	}

	public void setLeaveId(int leaveId) {
		this.leaveId = leaveId;
	}

	public int getAppliedBy() {
		return appliedBy;
	}

	public void setAppliedBy(int appliedBy) {
		this.appliedBy = appliedBy;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDate getDateOfAbsence() {
		return dateOfAbsence;
	}

	public void setDateOfAbsence(LocalDate dateOfAbsence) {
		this.dateOfAbsence = dateOfAbsence;
	}
    
    
    

}
