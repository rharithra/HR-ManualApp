package com.hrmanual.model;

import java.time.LocalDateTime;
import java.util.List;

public class HRPolicy {
    private String id;
    private String title;
    private String description;
    private String content;
    private PolicyCategory category;
    private PolicyStatus status;
    private String createdBy;
    private String lastModifiedBy;
    private LocalDateTime createdAt;
    private LocalDateTime lastModifiedAt;
    private LocalDateTime publishedAt;
    private String version;
    private List<String> attachmentUrls;
    private List<String> tags;
    private boolean isSearchable;
    private int viewCount;
    
    public enum PolicyCategory {
        COMPANY_INTRODUCTION("Company Introduction"),
        CODE_OF_CONDUCT("Code of Conduct"),
        LEAVE_POLICY("Leave Policy"),
        ATTENDANCE_RULES("Attendance Rules"),
        SALARY_APPRAISAL("Salary & Appraisal Guidelines"),
        REMOTE_WORK("Work-from-Home / Remote Work Policy"),
        HEALTH_SAFETY("Health & Safety Guidelines"),
        EXIT_TERMINATION("Exit/Termination Process"),
        BENEFITS("Employee Benefits"),
        TRAINING_DEVELOPMENT("Training & Development"),
        GRIEVANCE("Grievance Policy"),
        IT_POLICY("IT Policy"),
        TRAVEL_POLICY("Travel Policy"),
        OTHER("Other");
        
        private final String displayName;
        
        PolicyCategory(String displayName) {
            this.displayName = displayName;
        }
        
        public String getDisplayName() {
            return displayName;
        }
    }
    
    public enum PolicyStatus {
        DRAFT("Draft"),
        UNDER_REVIEW("Under Review"),
        PUBLISHED("Published"),
        ARCHIVED("Archived"),
        OBSOLETE("Obsolete");
        
        private final String displayName;
        
        PolicyStatus(String displayName) {
            this.displayName = displayName;
        }
        
        public String getDisplayName() {
            return displayName;
        }
    }
    
    // Constructors
    public HRPolicy() {
        this.createdAt = LocalDateTime.now();
        this.lastModifiedAt = LocalDateTime.now();
        this.status = PolicyStatus.DRAFT;
        this.version = "1.0";
        this.isSearchable = true;
        this.viewCount = 0;
    }
    
    public HRPolicy(String title, String description, PolicyCategory category) {
        this();
        this.title = title;
        this.description = description;
        this.category = category;
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getContent() {
        return content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }
    
    public PolicyCategory getCategory() {
        return category;
    }
    
    public void setCategory(PolicyCategory category) {
        this.category = category;
    }
    
    public PolicyStatus getStatus() {
        return status;
    }
    
    public void setStatus(PolicyStatus status) {
        this.status = status;
        if (status == PolicyStatus.PUBLISHED && publishedAt == null) {
            this.publishedAt = LocalDateTime.now();
        }
    }
    
    public String getCreatedBy() {
        return createdBy;
    }
    
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
    
    public String getLastModifiedBy() {
        return lastModifiedBy;
    }
    
    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
        this.lastModifiedAt = LocalDateTime.now();
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getLastModifiedAt() {
        return lastModifiedAt;
    }
    
    public void setLastModifiedAt(LocalDateTime lastModifiedAt) {
        this.lastModifiedAt = lastModifiedAt;
    }
    
    public LocalDateTime getPublishedAt() {
        return publishedAt;
    }
    
    public void setPublishedAt(LocalDateTime publishedAt) {
        this.publishedAt = publishedAt;
    }
    
    public String getVersion() {
        return version;
    }
    
    public void setVersion(String version) {
        this.version = version;
    }
    
    public List<String> getAttachmentUrls() {
        return attachmentUrls;
    }
    
    public void setAttachmentUrls(List<String> attachmentUrls) {
        this.attachmentUrls = attachmentUrls;
    }
    
    public List<String> getTags() {
        return tags;
    }
    
    public void setTags(List<String> tags) {
        this.tags = tags;
    }
    
    public boolean isSearchable() {
        return isSearchable;
    }
    
    public void setSearchable(boolean searchable) {
        isSearchable = searchable;
    }
    
    public int getViewCount() {
        return viewCount;
    }
    
    public void setViewCount(int viewCount) {
        this.viewCount = viewCount;
    }
    
    // Utility methods
    public void incrementViewCount() {
        this.viewCount++;
    }
    
    public boolean isPublished() {
        return status == PolicyStatus.PUBLISHED;
    }
    
    public boolean isDraft() {
        return status == PolicyStatus.DRAFT;
    }
    
    public boolean canBeEdited() {
        return status == PolicyStatus.DRAFT || status == PolicyStatus.UNDER_REVIEW;
    }
    
    public boolean canBePublished() {
        return status == PolicyStatus.DRAFT || status == PolicyStatus.UNDER_REVIEW;
    }
    
    public void publish() {
        this.status = PolicyStatus.PUBLISHED;
        this.publishedAt = LocalDateTime.now();
    }
    
    public void archive() {
        this.status = PolicyStatus.ARCHIVED;
    }
} 