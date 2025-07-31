# HR Manual App - Deployment Guide

## 🚀 Quick Start

This guide will help you deploy the HR Manual App with all three integrated modules: HR Manual, Leave Management, and Payroll Management.

## 📋 Prerequisites

### Development Environment
- **Java 17+** - For Spring Boot backend
- **Node.js 16+** - For React frontend
- **Maven 3.6+** - For backend build management
- **Git** - For version control

### External Services
- **Firebase Account** - For Firestore database and authentication
- **AWS Account** - For S3 file storage (optional, can use local storage)
- **Email Service** - For notifications (Gmail SMTP or other)

## 🛠️ Backend Setup (Spring Boot)

### 1. Environment Configuration

Create a `.env` file in the `backend` directory:

```env
# Firebase Configuration
FIREBASE_CONFIG_PATH=src/main/resources/firebase-config.json

# AWS S3 Configuration (Optional)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=hr-manual-documents

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_secure

# Email Configuration
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend-domain.com
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Generate a service account key:
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Save as `firebase-config.json` in `backend/src/main/resources/`

### 3. Database Collections

The app will automatically create these Firestore collections:
- `users` - User profiles and authentication
- `hr_policies` - HR policy documents
- `leave_requests` - Leave applications
- `payslips` - Payroll data
- `holidays` - Company holidays

### 4. Build and Run Backend

```bash
cd backend

# Install dependencies and compile
./mvnw clean install

# Run the application
./mvnw spring-boot:run

# Or build JAR for production
./mvnw clean package
java -jar target/hr-manual-app-1.0.0.jar
```

The backend will start on `http://localhost:8080`

## 🎨 Frontend Setup (React)

### 1. Environment Configuration

Create a `.env` file in the `frontend` directory:

```env
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:8080/api

# Firebase Configuration (for frontend)
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# App Configuration
REACT_APP_APP_NAME=HR Manual App
REACT_APP_VERSION=1.0.0
```

### 2. Install Dependencies and Run

```bash
cd frontend

# Install dependencies
npm install

# Add Tailwind CSS plugins
npm install @tailwindcss/forms @tailwindcss/typography

# Start development server
npm start

# Build for production
npm run build
```

The frontend will start on `http://localhost:3000`

## 🚀 Production Deployment

### Option 1: Railway (Recommended)

#### Backend Deployment
1. Connect your GitHub repository to Railway
2. Create a new service and select your repository
3. Set the root directory to `backend`
4. Add environment variables in Railway dashboard
5. Railway will automatically detect Spring Boot and deploy

#### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy the `build` folder to Firebase Hosting:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Option 2: Render

#### Backend Deployment
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set build command: `cd backend && ./mvnw clean package`
4. Set start command: `cd backend && java -jar target/hr-manual-app-1.0.0.jar`
5. Add environment variables

#### Frontend Deployment
1. Create a new Static Site on Render
2. Set build command: `cd frontend && npm install && npm run build`
3. Set publish directory: `frontend/build`

### Option 3: Docker Deployment

Create `Dockerfile` for backend:
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/hr-manual-app-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

Create `Dockerfile` for frontend:
```dockerfile
FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔐 Initial Setup

### 1. Create Admin User

After deployment, create the first admin user by making a POST request:

```bash
curl -X POST http://your-backend-url/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@company.com",
    "password": "SecurePassword123!",
    "firstName": "Admin",
    "lastName": "User",
    "role": "ADMIN"
  }'
```

### 2. Configure Default Settings

1. Login as admin
2. Go to Admin → System Settings
3. Configure:
   - Company information
   - Leave types and balances
   - Holiday calendar
   - Email templates
   - Payroll settings

## 📊 Features Verification

### HR Manual Module
- ✅ Create and edit HR policies
- ✅ Search and filter policies
- ✅ Document upload and viewing
- ✅ Version control

### Leave Management Module
- ✅ Apply for leave
- ✅ View leave balance
- ✅ Leave approval workflow
- ✅ Holiday calendar
- ✅ Email notifications

### Payroll Module
- ✅ Generate payslips
- ✅ View salary structure
- ✅ Download PDF payslips
- ✅ Payroll processing

## 🔧 Maintenance

### Database Backup
```bash
# Export Firestore data
gcloud firestore export gs://your-backup-bucket/backup-folder
```

### Monitoring
- Set up application monitoring with tools like New Relic or Datadog
- Monitor API endpoints and database performance
- Set up error logging and alerts

### Updates
1. Test changes in development environment
2. Update environment variables if needed
3. Deploy backend first, then frontend
4. Run database migrations if required

## 🆘 Troubleshooting

### Common Issues

**Backend won't start:**
- Check Java version: `java --version`
- Verify Firebase config file exists
- Check environment variables

**Frontend build fails:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version`
- Verify all environment variables are set

**Database connection issues:**
- Verify Firebase service account permissions
- Check Firestore security rules
- Confirm project ID is correct

### Support
- Create an issue in the repository
- Check logs for detailed error messages
- Verify all dependencies are correctly installed

## 📝 License

This project is licensed under the MIT License. See the LICENSE file for details. 