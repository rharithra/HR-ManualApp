import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

// Context providers
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Layout components
import DashboardLayout from './components/layout/DashboardLayout';
import AuthLayout from './components/layout/AuthLayout';

// Auth components
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';

// Dashboard components
import Dashboard from './pages/Dashboard';

// HR Manual module
import HRPolicies from './pages/hr-manual/HRPolicies';
import PolicyDetails from './pages/hr-manual/PolicyDetails';
import PolicyEditor from './pages/hr-manual/PolicyEditor';

// Leave Management module
import LeaveRequests from './pages/leave/LeaveRequests';
import ApplyLeave from './pages/leave/ApplyLeave';
import LeaveHistory from './pages/leave/LeaveHistory';
import LeaveApproval from './pages/leave/LeaveApproval';
import HolidayCalendar from './pages/leave/HolidayCalendar';

// Payroll module
import Payslips from './pages/payroll/Payslips';
import PayslipDetails from './pages/payroll/PayslipDetails';
import PayrollManagement from './pages/payroll/PayrollManagement';
import SalaryStructure from './pages/payroll/SalaryStructure';

// Profile and settings
import Profile from './pages/Profile';
import Settings from './pages/Settings';

// Admin components
import UserManagement from './pages/admin/UserManagement';
import SystemSettings from './pages/admin/SystemSettings';
import Reports from './pages/admin/Reports';

// Protected route component
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleBasedRoute from './components/auth/RoleBasedRoute';

// Error pages
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="App">
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={
                  <AuthLayout>
                    <Login />
                  </AuthLayout>
                } />
                <Route path="/forgot-password" element={
                  <AuthLayout>
                    <ForgotPassword />
                  </AuthLayout>
                } />

                {/* Protected Routes */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }>
                  {/* Dashboard */}
                  <Route index element={<Dashboard />} />

                  {/* HR Manual Module */}
                  <Route path="hr-policies" element={<HRPolicies />} />
                  <Route path="hr-policies/:id" element={<PolicyDetails />} />
                  <Route path="hr-policies/:id/edit" element={
                    <RoleBasedRoute allowedRoles={['HR', 'ADMIN']}>
                      <PolicyEditor />
                    </RoleBasedRoute>
                  } />
                  <Route path="hr-policies/new" element={
                    <RoleBasedRoute allowedRoles={['HR', 'ADMIN']}>
                      <PolicyEditor />
                    </RoleBasedRoute>
                  } />

                  {/* Leave Management Module */}
                  <Route path="leave">
                    <Route path="apply" element={<ApplyLeave />} />
                    <Route path="history" element={<LeaveHistory />} />
                    <Route path="requests" element={<LeaveRequests />} />
                    <Route path="approvals" element={
                      <RoleBasedRoute allowedRoles={['HR', 'MANAGER', 'ADMIN']}>
                        <LeaveApproval />
                      </RoleBasedRoute>
                    } />
                    <Route path="calendar" element={<HolidayCalendar />} />
                  </Route>

                  {/* Payroll Module */}
                  <Route path="payroll">
                    <Route path="payslips" element={<Payslips />} />
                    <Route path="payslips/:id" element={<PayslipDetails />} />
                    <Route path="salary-structure" element={<SalaryStructure />} />
                    <Route path="management" element={
                      <RoleBasedRoute allowedRoles={['HR', 'ADMIN']}>
                        <PayrollManagement />
                      </RoleBasedRoute>
                    } />
                  </Route>

                  {/* Profile and Settings */}
                  <Route path="profile" element={<Profile />} />
                  <Route path="settings" element={<Settings />} />

                  {/* Admin Routes */}
                  <Route path="admin" element={
                    <RoleBasedRoute allowedRoles={['ADMIN']}>
                      <Routes>
                        <Route path="users" element={<UserManagement />} />
                        <Route path="system" element={<SystemSettings />} />
                        <Route path="reports" element={<Reports />} />
                      </Routes>
                    </RoleBasedRoute>
                  } />

                  {/* Error Routes */}
                  <Route path="unauthorized" element={<Unauthorized />} />
                  <Route path="*" element={<NotFound />} />
                </Route>

                {/* Fallback redirect */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>

              {/* Global toast notifications */}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#fff',
                    color: '#374151',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  },
                  success: {
                    iconTheme: {
                      primary: '#22c55e',
                      secondary: '#fff',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: '#fff',
                    },
                  },
                }}
              />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App; 