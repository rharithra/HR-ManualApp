# HR Manual App

A comprehensive HR management system with three integrated modules: HR Manual, Leave Management, and Payroll Management.

## 🚀 Features

### 📚 HR Manual Module
- Digital policy repository (Company Introduction, Code of Conduct, Leave Policy, etc.)
- Search and filter functionality
- Document viewer for PDFs and Word documents
- Version control and change logs

### 📝 Leave Management Module
- Employee leave applications
- Leave balance tracking
- Approval workflow for managers/HR
- Holiday calendar integration
- Email/in-app notifications

### 💰 Payroll Management Module
- Monthly payslip generation and viewing
- Salary structure breakdown
- Payment history tracking
- Deductions management (PF, ESI, Tax, LWP)
- Bulk payroll processing for HR

## 🛠️ Tech Stack

### Backend
- **Framework**: Java Spring Boot
- **Database**: Firebase Firestore
- **Authentication**: JWT with role-based access control
- **File Storage**: AWS S3
- **PDF Generation**: iText
- **API**: RESTful services

### Frontend
- **Framework**: React.js
- **Styling**: Tailwind CSS
- **State Management**: Context API + useReducer
- **HTTP Client**: Axios
- **PDF Viewer**: react-pdf

### Deployment
- **Backend**: Railway/Render
- **Frontend**: Firebase Hosting
- **Database**: Firebase Firestore

## 👥 User Roles

- **Employee**: View policies, apply for leave, view payslips
- **HR/Manager**: Approve leave requests, manage payroll, view reports
- **Admin**: Full access to all modules, policy management, system configuration

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 16+
- Firebase account
- AWS account (for S3)

### Backend Setup
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 📁 Project Structure

```
hr-manual-app/
├── backend/                 # Spring Boot application
│   ├── src/main/java/
│   ├── src/main/resources/
│   └── pom.xml
├── frontend/               # React application
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

## 🔐 Environment Variables

### Backend (.env)
```
FIREBASE_CONFIG_PATH=path/to/firebase-config.json
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=your_s3_bucket_name
JWT_SECRET=your_jwt_secret
```

### Frontend (.env)
```
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_FIREBASE_CONFIG=your_firebase_config
```

## 📄 License

This project is licensed under the MIT License. 