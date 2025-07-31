package com.hrmanual.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class Payslip {
    private String id;
    private String userId;
    private String userName;
    private String employeeId;
    private String department;
    private String designation;
    
    // Pay period
    private LocalDate payPeriodStart;
    private LocalDate payPeriodEnd;
    private String payrollMonth; // Format: "2024-01"
    
    // Salary components
    private Double basicSalary;
    private Double hra; // House Rent Allowance
    private Double da; // Dearness Allowance
    private Double medicalAllowance;
    private Double transportAllowance;
    private Double specialAllowance;
    private Double overtimeAmount;
    private Double bonusAmount;
    
    // Deductions
    private Double providentFund; // PF
    private Double esi; // Employee State Insurance
    private Double professionalTax;
    private Double incomeTax; // TDS
    private Double lwpDeduction; // Leave Without Pay deduction
    private Double advanceDeduction;
    private Double otherDeductions;
    
    // Calculated amounts
    private Double grossSalary;
    private Double totalDeductions;
    private Double netSalary;
    
    // Leave information
    private Integer casualLeavesTaken;
    private Integer sickLeavesTaken;
    private Integer earnedLeavesTaken;
    private Integer lwpDays;
    private Integer workingDays;
    private Integer presentDays;
    
    // Status and metadata
    private PayslipStatus status;
    private String generatedBy;
    private LocalDateTime generatedAt;
    private LocalDateTime processedAt;
    private String pdfUrl;
    private String remarks;
    
    public enum PayslipStatus {
        DRAFT("Draft"),
        PROCESSED("Processed"),
        PAID("Paid"),
        CANCELLED("Cancelled");
        
        private final String displayName;
        
        PayslipStatus(String displayName) {
            this.displayName = displayName;
        }
        
        public String getDisplayName() {
            return displayName;
        }
    }
    
    // Constructors
    public Payslip() {
        this.generatedAt = LocalDateTime.now();
        this.status = PayslipStatus.DRAFT;
    }
    
    public Payslip(String userId, String payrollMonth) {
        this();
        this.userId = userId;
        this.payrollMonth = payrollMonth;
        // Set pay period based on month
        String[] parts = payrollMonth.split("-");
        int year = Integer.parseInt(parts[0]);
        int month = Integer.parseInt(parts[1]);
        this.payPeriodStart = LocalDate.of(year, month, 1);
        this.payPeriodEnd = payPeriodStart.withDayOfMonth(payPeriodStart.lengthOfMonth());
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    
    public String getEmployeeId() { return employeeId; }
    public void setEmployeeId(String employeeId) { this.employeeId = employeeId; }
    
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    
    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }
    
    public LocalDate getPayPeriodStart() { return payPeriodStart; }
    public void setPayPeriodStart(LocalDate payPeriodStart) { this.payPeriodStart = payPeriodStart; }
    
    public LocalDate getPayPeriodEnd() { return payPeriodEnd; }
    public void setPayPeriodEnd(LocalDate payPeriodEnd) { this.payPeriodEnd = payPeriodEnd; }
    
    public String getPayrollMonth() { return payrollMonth; }
    public void setPayrollMonth(String payrollMonth) { this.payrollMonth = payrollMonth; }
    
    // Salary component getters and setters
    public Double getBasicSalary() { return basicSalary != null ? basicSalary : 0.0; }
    public void setBasicSalary(Double basicSalary) { 
        this.basicSalary = basicSalary;
        calculateGrossSalary();
    }
    
    public Double getHra() { return hra != null ? hra : 0.0; }
    public void setHra(Double hra) { 
        this.hra = hra;
        calculateGrossSalary();
    }
    
    public Double getDa() { return da != null ? da : 0.0; }
    public void setDa(Double da) { 
        this.da = da;
        calculateGrossSalary();
    }
    
    public Double getMedicalAllowance() { return medicalAllowance != null ? medicalAllowance : 0.0; }
    public void setMedicalAllowance(Double medicalAllowance) { 
        this.medicalAllowance = medicalAllowance;
        calculateGrossSalary();
    }
    
    public Double getTransportAllowance() { return transportAllowance != null ? transportAllowance : 0.0; }
    public void setTransportAllowance(Double transportAllowance) { 
        this.transportAllowance = transportAllowance;
        calculateGrossSalary();
    }
    
    public Double getSpecialAllowance() { return specialAllowance != null ? specialAllowance : 0.0; }
    public void setSpecialAllowance(Double specialAllowance) { 
        this.specialAllowance = specialAllowance;
        calculateGrossSalary();
    }
    
    public Double getOvertimeAmount() { return overtimeAmount != null ? overtimeAmount : 0.0; }
    public void setOvertimeAmount(Double overtimeAmount) { 
        this.overtimeAmount = overtimeAmount;
        calculateGrossSalary();
    }
    
    public Double getBonusAmount() { return bonusAmount != null ? bonusAmount : 0.0; }
    public void setBonusAmount(Double bonusAmount) { 
        this.bonusAmount = bonusAmount;
        calculateGrossSalary();
    }
    
    // Deduction getters and setters
    public Double getProvidentFund() { return providentFund != null ? providentFund : 0.0; }
    public void setProvidentFund(Double providentFund) { 
        this.providentFund = providentFund;
        calculateNetSalary();
    }
    
    public Double getEsi() { return esi != null ? esi : 0.0; }
    public void setEsi(Double esi) { 
        this.esi = esi;
        calculateNetSalary();
    }
    
    public Double getProfessionalTax() { return professionalTax != null ? professionalTax : 0.0; }
    public void setProfessionalTax(Double professionalTax) { 
        this.professionalTax = professionalTax;
        calculateNetSalary();
    }
    
    public Double getIncomeTax() { return incomeTax != null ? incomeTax : 0.0; }
    public void setIncomeTax(Double incomeTax) { 
        this.incomeTax = incomeTax;
        calculateNetSalary();
    }
    
    public Double getLwpDeduction() { return lwpDeduction != null ? lwpDeduction : 0.0; }
    public void setLwpDeduction(Double lwpDeduction) { 
        this.lwpDeduction = lwpDeduction;
        calculateNetSalary();
    }
    
    public Double getAdvanceDeduction() { return advanceDeduction != null ? advanceDeduction : 0.0; }
    public void setAdvanceDeduction(Double advanceDeduction) { 
        this.advanceDeduction = advanceDeduction;
        calculateNetSalary();
    }
    
    public Double getOtherDeductions() { return otherDeductions != null ? otherDeductions : 0.0; }
    public void setOtherDeductions(Double otherDeductions) { 
        this.otherDeductions = otherDeductions;
        calculateNetSalary();
    }
    
    // Calculated amounts
    public Double getGrossSalary() { return grossSalary != null ? grossSalary : 0.0; }
    public void setGrossSalary(Double grossSalary) { this.grossSalary = grossSalary; }
    
    public Double getTotalDeductions() { return totalDeductions != null ? totalDeductions : 0.0; }
    public void setTotalDeductions(Double totalDeductions) { this.totalDeductions = totalDeductions; }
    
    public Double getNetSalary() { return netSalary != null ? netSalary : 0.0; }
    public void setNetSalary(Double netSalary) { this.netSalary = netSalary; }
    
    // Leave information getters and setters
    public Integer getCasualLeavesTaken() { return casualLeavesTaken != null ? casualLeavesTaken : 0; }
    public void setCasualLeavesTaken(Integer casualLeavesTaken) { this.casualLeavesTaken = casualLeavesTaken; }
    
    public Integer getSickLeavesTaken() { return sickLeavesTaken != null ? sickLeavesTaken : 0; }
    public void setSickLeavesTaken(Integer sickLeavesTaken) { this.sickLeavesTaken = sickLeavesTaken; }
    
    public Integer getEarnedLeavesTaken() { return earnedLeavesTaken != null ? earnedLeavesTaken : 0; }
    public void setEarnedLeavesTaken(Integer earnedLeavesTaken) { this.earnedLeavesTaken = earnedLeavesTaken; }
    
    public Integer getLwpDays() { return lwpDays != null ? lwpDays : 0; }
    public void setLwpDays(Integer lwpDays) { this.lwpDays = lwpDays; }
    
    public Integer getWorkingDays() { return workingDays != null ? workingDays : 0; }
    public void setWorkingDays(Integer workingDays) { this.workingDays = workingDays; }
    
    public Integer getPresentDays() { return presentDays != null ? presentDays : 0; }
    public void setPresentDays(Integer presentDays) { this.presentDays = presentDays; }
    
    // Status and metadata
    public PayslipStatus getStatus() { return status; }
    public void setStatus(PayslipStatus status) { 
        this.status = status;
        if (status == PayslipStatus.PROCESSED && processedAt == null) {
            this.processedAt = LocalDateTime.now();
        }
    }
    
    public String getGeneratedBy() { return generatedBy; }
    public void setGeneratedBy(String generatedBy) { this.generatedBy = generatedBy; }
    
    public LocalDateTime getGeneratedAt() { return generatedAt; }
    public void setGeneratedAt(LocalDateTime generatedAt) { this.generatedAt = generatedAt; }
    
    public LocalDateTime getProcessedAt() { return processedAt; }
    public void setProcessedAt(LocalDateTime processedAt) { this.processedAt = processedAt; }
    
    public String getPdfUrl() { return pdfUrl; }
    public void setPdfUrl(String pdfUrl) { this.pdfUrl = pdfUrl; }
    
    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
    
    // Utility methods
    private void calculateGrossSalary() {
        this.grossSalary = getBasicSalary() + getHra() + getDa() + getMedicalAllowance() + 
                          getTransportAllowance() + getSpecialAllowance() + getOvertimeAmount() + getBonusAmount();
        calculateNetSalary();
    }
    
    private void calculateNetSalary() {
        this.totalDeductions = getProvidentFund() + getEsi() + getProfessionalTax() + getIncomeTax() + 
                              getLwpDeduction() + getAdvanceDeduction() + getOtherDeductions();
        this.netSalary = getGrossSalary() - getTotalDeductions();
    }
    
    public void calculateSalary() {
        calculateGrossSalary();
        calculateNetSalary();
    }
    
    public boolean isDraft() { return status == PayslipStatus.DRAFT; }
    public boolean isProcessed() { return status == PayslipStatus.PROCESSED; }
    public boolean isPaid() { return status == PayslipStatus.PAID; }
    public boolean canBeModified() { return status == PayslipStatus.DRAFT; }
} 
