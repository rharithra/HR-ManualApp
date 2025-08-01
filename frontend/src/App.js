import React, { useState } from 'react';
import './App.css';

// Mock user data
const mockUser = {
  name: "John Doe",
  role: "Employee",
  department: "Engineering",
  email: "john.doe@company.com"
};

function App() {
  const [currentView, setCurrentView] = useState('main');
  const [user, setUser] = useState(mockUser);

  const tiles = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: '📊',
      description: 'View your overview and metrics',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      id: 'policies',
      title: 'HR Policies',
      icon: '📚',
      description: 'Access company policies and documents',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      id: 'leave',
      title: 'Leave Management',
      icon: '📝',
      description: 'Apply for leave and track balance',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    },
    {
      id: 'payroll',
      title: 'Payroll',
      icon: '💰',
      description: 'View salary and download payslips',
      color: 'bg-yellow-500',
      hoverColor: 'hover:bg-yellow-600'
    },
    {
      id: 'profile',
      title: 'Profile',
      icon: '👤',
      description: 'Manage your personal information',
      color: 'bg-indigo-500',
      hoverColor: 'hover:bg-indigo-600'
    },
    {
      id: 'reports',
      title: 'Reports',
      icon: '📈',
      description: 'Generate and view reports',
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600'
    }
  ];

  const renderMainDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">🏢 HR Manual App</h1>
              <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">v1.0</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="font-semibold text-gray-900">{user.name}</p>
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your HR Dashboard
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Manage your HR activities efficiently with our comprehensive management system. 
            Click on any tile below to access the respective module.
          </p>
        </div>

        {/* Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tiles.map((tile) => (
            <div
              key={tile.id}
              onClick={() => setCurrentView(tile.id)}
              className={`${tile.color} ${tile.hoverColor} rounded-2xl p-8 text-white cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group`}
            >
              <div className="text-center">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {tile.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{tile.title}</h3>
                <p className="text-white/90 mb-6">{tile.description}</p>
                <div className="inline-flex items-center text-white/80 group-hover:text-white transition-colors">
                  <span className="text-sm font-medium">Open Module</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-2xl">📅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Leave Balance</p>
                <p className="text-2xl font-bold text-gray-900">18 Days</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Completed Tasks</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">This Month Salary</p>
                <p className="text-2xl font-bold text-gray-900">₹45,000</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Performance</p>
                <p className="text-2xl font-bold text-gray-900">95%</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  const renderModuleDashboard = () => {
    const currentTile = tiles.find(tile => tile.id === currentView);
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with Back Button */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <button
                  onClick={() => setCurrentView('main')}
                  className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                <div className="flex items-center">
                  <span className="text-3xl mr-3">{currentTile?.icon}</span>
                  <h1 className="text-2xl font-bold text-gray-900">{currentTile?.title}</h1>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {user.name.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Module Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentView === 'dashboard' && <DashboardModule user={user} />}
          {currentView === 'policies' && <HRPoliciesModule />}
          {currentView === 'leave' && <LeaveManagementModule user={user} />}
          {currentView === 'payroll' && <PayrollModule user={user} />}
          {currentView === 'profile' && <ProfileModule user={user} />}
          {currentView === 'reports' && <ReportsModule />}
        </main>
      </div>
    );
  };

  return currentView === 'main' ? renderMainDashboard() : renderModuleDashboard();
}

// Dashboard Module Component
function DashboardModule({ user }) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard title="Leave Balance" value="18 days" icon="📅" color="blue" />
          <MetricCard title="Pending Requests" value="2" icon="⏳" color="yellow" />
          <MetricCard title="HR Policies" value="12" icon="📋" color="green" />
          <MetricCard title="Monthly Salary" value="₹45,000" icon="💰" color="purple" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentActivity />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}

// HR Policies Module Component
function HRPoliciesModule() {
  const policies = [
    { id: 1, title: "Company Introduction", category: "General", updated: "2024-01-15", status: "Active" },
    { id: 2, title: "Code of Conduct", category: "Ethics", updated: "2024-01-10", status: "Active" },
    { id: 3, title: "Leave Policy", category: "Leave", updated: "2024-01-08", status: "Active" },
    { id: 4, title: "Remote Work Policy", category: "Work", updated: "2024-01-05", status: "Active" },
    { id: 5, title: "Health & Safety Guidelines", category: "Safety", updated: "2024-01-03", status: "Active" },
    { id: 6, title: "Travel Policy", category: "Travel", updated: "2024-01-01", status: "Active" }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">HR Policies & Documents</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            📄 Add New Policy
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map((policy) => (
            <div key={policy.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{policy.title}</h3>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">{policy.status}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Category: {policy.category}</p>
              <p className="text-xs text-gray-500">Updated: {policy.updated}</p>
              <button className="mt-3 text-blue-600 hover:text-blue-500 text-sm font-medium">
                View Document →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Leave Management Module Component
function LeaveManagementModule({ user }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leave Balance Card */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Balance</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Casual Leave</span>
              <span className="font-semibold text-gray-900">8/12</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{width: '67%'}}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Sick Leave</span>
              <span className="font-semibold text-gray-900">10/12</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{width: '83%'}}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Earned Leave</span>
              <span className="font-semibold text-gray-900">15/21</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{width: '71%'}}></div>
            </div>
          </div>
        </div>

        {/* Quick Apply Card */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Apply</h3>
          <div className="space-y-3">
            <button className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors">
              📝 Apply for Leave
            </button>
            <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
              📅 View Calendar
            </button>
            <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
              📊 Leave History
            </button>
          </div>
        </div>

        {/* Recent Requests Card */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Requests</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Casual Leave</p>
                <p className="text-sm text-gray-600">Dec 25-26, 2024</p>
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Pending</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Sick Leave</p>
                <p className="text-sm text-gray-600">Dec 20, 2024</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Approved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Payroll Module Component
function PayrollModule({ user }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Salary Card */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Month Salary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Basic Salary</span>
              <span className="font-semibold">₹30,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">HRA</span>
              <span className="font-semibold">₹12,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Other Allowances</span>
              <span className="font-semibold">₹5,000</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between font-bold text-lg">
              <span>Gross Salary</span>
              <span>₹47,000</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>Deductions</span>
              <span>₹2,000</span>
            </div>
            <div className="flex justify-between font-bold text-green-600 text-xl">
              <span>Net Salary</span>
              <span>₹45,000</span>
            </div>
          </div>
        </div>

        {/* Recent Payslips Card */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Payslips</h3>
          <div className="space-y-3">
            {['January 2024', 'December 2023', 'November 2023', 'October 2023'].map((month) => (
              <div key={month} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <span className="font-medium">{month}</span>
                <button className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                  📄 Download PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Profile Module Component
function ProfileModule({ user }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input type="text" value={user.name} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" readOnly />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" value={user.email} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" readOnly />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <input type="text" value={user.department} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" readOnly />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <input type="text" value={user.role} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" readOnly />
        </div>
      </div>
      <div className="mt-6">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

// Reports Module Component
function ReportsModule() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Reports & Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold">Leave Report</h3>
            <p className="text-sm text-gray-600 mt-2">Monthly leave analytics</p>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="text-center">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-semibold">Payroll Report</h3>
            <p className="text-sm text-gray-600 mt-2">Salary and deductions</p>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="text-center">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="font-semibold">Employee Report</h3>
            <p className="text-sm text-gray-600 mt-2">Team performance</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Utility Components
function MetricCard({ title, value, icon, color }) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700'
  };

  return (
    <div className={`rounded-lg border-2 p-4 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-75">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}

function RecentActivity() {
  const activities = [
    { type: "leave", message: "Leave request approved", time: "2 hours ago" },
    { type: "policy", message: "New policy: Remote Work Guidelines", time: "1 day ago" },
    { type: "payroll", message: "Payslip generated for January", time: "3 days ago" }
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-6">
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

function QuickActions() {
  const actions = [
    { name: "Apply Leave", icon: "📝" },
    { name: "View Policies", icon: "📋" },
    { name: "Download Payslip", icon: "💰" },
    { name: "Update Profile", icon: "👤" }
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-lg">{action.icon}</span>
            <span className="text-sm font-medium">{action.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
