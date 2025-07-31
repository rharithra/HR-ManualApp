package com.hrmanual.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class LeaveRequest {
    private String id;
    private String userId;
    private String userName;
    private String userEmail;
    private LeaveType leaveType;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer numberOfDays;
    private String reason;
    private LeaveStatus status;
    private String approvedBy;
    private String approverComments;
    private LocalDateTime appliedAt;
    private LocalDateTime approvedAt;
    private boolean isHalfDay;
    
    public enum LeaveType {
        CASUAL("Casual Leave", 12),
        SICK("Sick Leave", 12),
        EARNED("Earned Leave", 21),
        COMPENSATORY("Compensatory Leave", 0),
        MATERNITY("Maternity Leave", 182),
        PATERNITY("Paternity Leave", 15),
        LWP("Leave Without Pay", 0);
        
        private final String displayName;
        private final int defaultBalance;
        
        LeaveType(String displayName, int defaultBalance) {
            this.displayName = displayName;
            this.defaultBalance = defaultBalance;
        }
        
        public String getDisplayName() { return displayName; }
        public int getDefaultBalance() { return defaultBalance; }
    }
    
    public enum LeaveStatus {
        PENDING("Pending Approval"),
        APPROVED("Approved"),
        REJECTED("Rejected"),
        CANCELLED("Cancelled");
        
        private final String displayName;
        
        LeaveStatus(String displayName) {
            this.displayName = displayName;
        }
        
        public String getDisplayName() { return displayName; }
    }
    
    // Constructors
    public LeaveRequest() {
        this.appliedAt = LocalDateTime.now();
        this.status = LeaveStatus.PENDING;
        this.isHalfDay = false;
    }
    
    public LeaveRequest(String userId, LeaveType leaveType, LocalDate startDate, LocalDate endDate, String reason) {
        this();
        this.userId = userId;
        this.leaveType = leaveType;
        this.startDate = startDate;
        this.endDate = endDate;
        this.reason = reason;
        this.numberOfDays = calculateNumberOfDays();
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    
    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    
    public LeaveType getLeaveType() { return leaveType; }
    public void setLeaveType(LeaveType leaveType) { this.leaveType = leaveType; }
    
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { 
        this.startDate = startDate;
        this.numberOfDays = calculateNumberOfDays();
    }
    
    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { 
        this.endDate = endDate;
        this.numberOfDays = calculateNumberOfDays();
    }
    
    public Integer getNumberOfDays() { return numberOfDays; }
    public void setNumberOfDays(Integer numberOfDays) { this.numberOfDays = numberOfDays; }
    
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
    
    public LeaveStatus getStatus() { return status; }
    public void setStatus(LeaveStatus status) { this.status = status; }
    
    public String getApprovedBy() { return approvedBy; }
    public void setApprovedBy(String approvedBy) { this.approvedBy = approvedBy; }
    
    public String getApproverComments() { return approverComments; }
    public void setApproverComments(String approverComments) { this.approverComments = approverComments; }
    
    public LocalDateTime getAppliedAt() { return appliedAt; }
    public void setAppliedAt(LocalDateTime appliedAt) { this.appliedAt = appliedAt; }
    
    public LocalDateTime getApprovedAt() { return approvedAt; }
    public void setApprovedAt(LocalDateTime approvedAt) { this.approvedAt = approvedAt; }
    
    public boolean isHalfDay() { return isHalfDay; }
    public void setHalfDay(boolean halfDay) { 
        isHalfDay = halfDay;
        if (halfDay) {
            this.numberOfDays = 1;
        } else {
            this.numberOfDays = calculateNumberOfDays();
        }
    }
    
    // Utility methods
    private Integer calculateNumberOfDays() {
        if (startDate == null || endDate == null) {
            return 0;
        }
        
        if (isHalfDay) {
            return 1;
        }
        
        // Calculate business days (excluding weekends)
        LocalDate current = startDate;
        int days = 0;
        
        while (!current.isAfter(endDate)) {
            // Skip weekends (Saturday = 6, Sunday = 7)
            if (current.getDayOfWeek().getValue() < 6) {
                days++;
            }
            current = current.plusDays(1);
        }
        
        return days;
    }
    
    public boolean isPending() { return status == LeaveStatus.PENDING; }
    public boolean isApproved() { return status == LeaveStatus.APPROVED; }
    public boolean isRejected() { return status == LeaveStatus.REJECTED; }
    public boolean isCancelled() { return status == LeaveStatus.CANCELLED; }
    public boolean canBeModified() { return status == LeaveStatus.PENDING; }
    public boolean canBeCancelled() { return status == LeaveStatus.PENDING || status == LeaveStatus.APPROVED; }
}
