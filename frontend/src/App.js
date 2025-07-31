import React, { useState } from 'react';
import './App.css';

// Simple mock data for demonstration
const mockUser = {
  name: "John Doe",
  role: "Employee",
  department: "Engineering",
  email: "john.doe@company.com"
};

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [user, setUser] = useState(mockUser);

  const navigation = [
    { id: 'dashboard', name: '🏠 Dashboard', icon: '🏠' },
    { id: 'policies', name: '📚 HR Policies', icon: '📚' },
    { id: 'leave', name: '📝 Leave Management', icon: '📝' },
    { id: 'payroll', name: '💰 Payroll', icon: '💰' },
    { id: 'profile', name: '👤 Profile', icon: '👤' }
  ];

  const renderContent = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'policies':
        return <HRPolicies />;
      case 'leave':
        return <LeaveManagement user={user} />;
      case 'payroll':
        return <PayrollView user={user} />;
      case 'profile':
        return <Profile user={user} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">🏢 HR Manual App</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">Welcome, {user.name}</span>
              <span className="bg-blue-500 px-2 py-1 rounded text-xs">{user.role}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-4">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${
                      currentPage === item.id
                        ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

// Dashboard Component
function Dashboard({ user }) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Welcome to your HR Manual App dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard title="Leave Balance" value="18 days" icon="📅" color="blue" />
        <DashboardCard title="Pending Requests" value="2" icon="⏳" color="yellow" />
        <DashboardCard title="HR Policies" value="12" icon="📋" color="green" />
        <DashboardCard title="This Month Salary" value="₹45,000" icon="💰" color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <QuickActions />
      </div>
    </div>
  );
}

// Dashboard Card Component
function DashboardCard({ title, value, icon, color }) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700'
  };

  return (
    <div className={`rounded-lg border-2 p-6 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-75">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
}

// HR Policies Component
function HRPolicies() {
  const policies = [
    { id: 1, title: "Company Introduction", category: "General", updated: "2024-01-15" },
    { id: 2, title: "Code of Conduct", category: "Ethics", updated: "2024-01-10" },
    { id: 3, title: "Leave Policy", category: "Leave", updated: "2024-01-08" },
    { id: 4, title: "Remote Work Policy", category: "Work", updated: "2024-01-05" }
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">HR Policies</h2>
        <p className="text-gray-600">Access and view company policies</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium">Policy Documents</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {policies.map((policy) => (
            <div key={policy.id} className="px-6 py-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{policy.title}</h4>
                  <p className="text-sm text-gray-500">{policy.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Updated: {policy.updated}</p>
                  <button className="text-blue-600 hover:text-blue-500 text-sm font-medium">View →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Leave Management Component
function LeaveManagement({ user }) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Leave Management</h2>
        <p className="text-gray-600">Apply for leaves and track your balance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Leave Balance</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Casual Leave</span>
              <span className="font-medium">8/12</span>
            </div>
            <div className="flex justify-between">
              <span>Sick Leave</span>
              <span className="font-medium">10/12</span>
            </div>
            <div className="flex justify-between">
              <span>Earned Leave</span>
              <span className="font-medium">15/21</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Quick Apply</h3>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Apply for Leave
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Pending Requests</h3>
          <p className="text-gray-600">You have 2 pending leave requests</p>
        </div>
      </div>
    </div>
  );
}

// Payroll Component
function PayrollView({ user }) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Payroll</h2>
        <p className="text-gray-600">View your salary details and payslips</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Current Month Salary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Basic Salary</span>
              <span className="font-medium">₹30,000</span>
            </div>
            <div className="flex justify-between">
              <span>HRA</span>
              <span className="font-medium">₹12,000</span>
            </div>
            <div className="flex justify-between">
              <span>Other Allowances</span>
              <span className="font-medium">₹5,000</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold">
              <span>Gross Salary</span>
              <span>₹47,000</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>Deductions</span>
              <span>₹2,000</span>
            </div>
            <div className="flex justify-between font-bold text-green-600">
              <span>Net Salary</span>
              <span>₹45,000</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Recent Payslips</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>January 2024</span>
              <button className="text-blue-600 hover:text-blue-500 text-sm">Download PDF</button>
            </div>
            <div className="flex justify-between items-center">
              <span>December 2023</span>
              <button className="text-blue-600 hover:text-blue-500 text-sm">Download PDF</button>
            </div>
            <div className="flex justify-between items-center">
              <span>November 2023</span>
              <button className="text-blue-600 hover:text-blue-500 text-sm">Download PDF</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Profile Component
function Profile({ user }) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Profile</h2>
        <p className="text-gray-600">Manage your personal information</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" value={user.name} className="w-full px-3 py-2 border border-gray-300 rounded-lg" readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={user.email} className="w-full px-3 py-2 border border-gray-300 rounded-lg" readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <input type="text" value={user.department} className="w-full px-3 py-2 border border-gray-300 rounded-lg" readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input type="text" value={user.role} className="w-full px-3 py-2 border border-gray-300 rounded-lg" readOnly />
          </div>
        </div>
      </div>
    </div>
  );
}

// Recent Activity Component
function RecentActivity() {
  const activities = [
    { type: "leave", message: "Leave request approved", time: "2 hours ago" },
    { type: "policy", message: "New policy: Remote Work Guidelines", time: "1 day ago" },
    { type: "payroll", message: "Payslip generated for January", time: "3 days ago" }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">{activity.message}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Quick Actions Component
function QuickActions() {
  const actions = [
    { name: "Apply Leave", icon: "📝", color: "blue" },
    { name: "View Policies", icon: "📋", color: "green" },
    { name: "Download Payslip", icon: "💰", color: "purple" },
    { name: "Update Profile", icon: "👤", color: "gray" }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-xl">{action.icon}</span>
            <span className="text-sm font-medium">{action.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default App; 
