package com.hrmanual.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;
import java.util.List;

public class User {
    private String id;
    private String email;
    
    @JsonIgnore
    private String password;
    
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String employeeId;
    private String department;
    private String designation;
    private Role role;
    private UserStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime lastLoginAt;
    
    // Salary information for payroll
    private Double basicSalary;
    private Double hra; // House Rent Allowance
    private Double da; // Dearness Allowance
    private Double medicalAllowance;
    private Double transportAllowance;
    private Double specialAllowance;
    
    // Leave balance
    private Integer casualLeaveBalance;
    private Integer sickLeaveBalance;
    private Integer earnedLeaveBalance;
    private Integer compensatoryLeaveBalance;
    
    // Reporting structure
    private String managerId;
    private List<String> subordinateIds;
    
    public enum Role {
        EMPLOYEE, HR, MANAGER, ADMIN
    }
    
    public enum UserStatus {
        ACTIVE, INACTIVE, SUSPENDED, TERMINATED
    }
    
    // Constructors
    public User() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.status = UserStatus.ACTIVE;
        this.role = Role.EMPLOYEE;
        // Default leave balances
        this.casualLeaveBalance = 12;
        this.sickLeaveBalance = 12;
        this.earnedLeaveBalance = 21;
        this.compensatoryLeaveBalance = 0;
    }
    
    public User(String email, String password, String firstName, String lastName) {
        this();
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    @JsonIgnore
    public String getPassword() {
        return password;
    }
    
    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getFirstName() {
        return firstName;
    }
    
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    public String getLastName() {
        return lastName;
    }
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public String getFullName() {
        return firstName + " " + lastName;
    }
    
    public String getPhoneNumber() {
        return phoneNumber;
    }
    
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    
    public String getEmployeeId() {
        return employeeId;
    }
    
    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }
    
    public String getDepartment() {
        return department;
    }
    
    public void setDepartment(String department) {
        this.department = department;
    }
    
    public String getDesignation() {
        return designation;
    }
    
    public void setDesignation(String designation) {
        this.designation = designation;
    }
    
    public Role getRole() {
        return role;
    }
    
    public void setRole(Role role) {
        this.role = role;
    }
    
    public UserStatus getStatus() {
        return status;
    }
    
    public void setStatus(UserStatus status) {
        this.status = status;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public LocalDateTime getLastLoginAt() {
        return lastLoginAt;
    }
    
    public void setLastLoginAt(LocalDateTime lastLoginAt) {
        this.lastLoginAt = lastLoginAt;
    }
    
    // Salary getters and setters
    public Double getBasicSalary() {
        return basicSalary;
    }
    
    public void setBasicSalary(Double basicSalary) {
        this.basicSalary = basicSalary;
    }
    
    public Double getHra() {
        return hra;
    }
    
    public void setHra(Double hra) {
        this.hra = hra;
    }
    
    public Double getDa() {
        return da;
    }
    
    public void setDa(Double da) {
        this.da = da;
    }
    
    public Double getMedicalAllowance() {
        return medicalAllowance;
    }
    
    public void setMedicalAllowance(Double medicalAllowance) {
        this.medicalAllowance = medicalAllowance;
    }
    
    public Double getTransportAllowance() {
        return transportAllowance;
    }
    
    public void setTransportAllowance(Double transportAllowance) {
        this.transportAllowance = transportAllowance;
    }
    
    public Double getSpecialAllowance() {
        return specialAllowance;
    }
    
    public void setSpecialAllowance(Double specialAllowance) {
        this.specialAllowance = specialAllowance;
    }
    
    public Double getGrossSalary() {
        double gross = (basicSalary != null ? basicSalary : 0.0) +
                      (hra != null ? hra : 0.0) +
                      (da != null ? da : 0.0) +
                      (medicalAllowance != null ? medicalAllowance : 0.0) +
                      (transportAllowance != null ? transportAllowance : 0.0) +
                      (specialAllowance != null ? specialAllowance : 0.0);
        return gross;
    }
    
    // Leave balance getters and setters
    public Integer getCasualLeaveBalance() {
        return casualLeaveBalance;
    }
    
    public void setCasualLeaveBalance(Integer casualLeaveBalance) {
        this.casualLeaveBalance = casualLeaveBalance;
    }
    
    public Integer getSickLeaveBalance() {
        return sickLeaveBalance;
    }
    
    public void setSickLeaveBalance(Integer sickLeaveBalance) {
        this.sickLeaveBalance = sickLeaveBalance;
    }
    
    public Integer getEarnedLeaveBalance() {
        return earnedLeaveBalance;
    }
    
    public void setEarnedLeaveBalance(Integer earnedLeaveBalance) {
        this.earnedLeaveBalance = earnedLeaveBalance;
    }
    
    public Integer getCompensatoryLeaveBalance() {
        return compensatoryLeaveBalance;
    }
    
    public void setCompensatoryLeaveBalance(Integer compensatoryLeaveBalance) {
        this.compensatoryLeaveBalance = compensatoryLeaveBalance;
    }
    
    public String getManagerId() {
        return managerId;
    }
    
    public void setManagerId(String managerId) {
        this.managerId = managerId;
    }
    
    public List<String> getSubordinateIds() {
        return subordinateIds;
    }
    
    public void setSubordinateIds(List<String> subordinateIds) {
        this.subordinateIds = subordinateIds;
    }
    
    // Utility methods
    public boolean isManager() {
        return role == Role.MANAGER || role == Role.HR || role == Role.ADMIN;
    }
    
    public boolean isHrOrAdmin() {
        return role == Role.HR || role == Role.ADMIN;
    }
    
    public boolean canApproveLeave() {
        return isManager();
    }
    
    public boolean canProcessPayroll() {
        return isHrOrAdmin();
    }
} 