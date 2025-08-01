import React, { useState } from 'react';
import './App.css';

// Mock user data
const mockUser = {
  name: "John Doe",
  role: "Employee",
  department: "Engineering",
  email: "john.doe@company.com"
};

// Mock policies data
const mockPolicies = [
  {
    id: 1,
    title: "Company Introduction",
    category: "General",
    updated: "2024-01-15",
    status: "Active",
    content: "Welcome to our company! We are committed to excellence and innovation. Our mission is to provide outstanding HR services and create a positive work environment for all employees."
  },
  {
    id: 2,
    title: "Code of Conduct",
    category: "Ethics",
    updated: "2024-01-10",
    status: "Active",
    content: "All employees must maintain high ethical standards. This includes honesty, integrity, respect for colleagues, and adherence to company policies and procedures."
  },
  {
    id: 3,
    title: "Leave Policy",
    category: "Leave",
    updated: "2024-01-08",
    status: "Active",
    content: "Employees are entitled to: Casual Leave (12 days), Sick Leave (12 days), Earned Leave (21 days). All leave requests must be submitted in advance and approved by your manager."
  }
];

function App() {
  const [currentView, setCurrentView] = useState('main');
  const [user, setUser] = useState(mockUser);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [leaveForm, setLeaveForm] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const tiles = [
    {
      id: 'leave',
      title: 'Leave Management',
      icon: (
        <svg className="w-16 h-16 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
        </svg>
      ),
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      id: 'policies',
      title: 'HR Policy',
      icon: (
        <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
          <path d="M17.5 10.5c.88 0 1.73.09 2.5.26V9.24c-.79-.15-1.64-.24-2.5-.24-1.7 0-3.24.29-4.5.83v1.66c1.13-.64 2.7-.99 4.5-.99zM13 12.49v1.66c1.13-.64 2.7-.99 4.5-.99.88 0 1.73.09 2.5.26V11.9c-.79-.15-1.64-.24-2.5-.24-1.7 0-3.24.29-4.5.83zM17.5 14.33c-1.7 0-3.24.29-4.5.83v1.66c1.13-.64 2.7-.99 4.5-.99.88 0 1.73.09 2.5.26v-1.52c-.79-.15-1.64-.24-2.5-.24z"/>
        </svg>
      ),
      bgColor: 'bg-teal-500',
      borderColor: 'border-teal-500',
      hoverColor: 'hover:bg-teal-600'
    },
    {
      id: 'payroll',
      title: 'Payroll',
      icon: (
        <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
        </svg>
      ),
      bgColor: 'bg-green-500',
      borderColor: 'border-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      id: 'profile',
      title: 'Update Profile',
      icon: (
        <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      ),
      bgColor: 'bg-orange-400',
      borderColor: 'border-orange-400',
      hoverColor: 'hover:bg-orange-500'
    }
  ];

  // Modal functions
  const openModal = (type, data = null) => {
    setModalType(type);
    setSelectedPolicy(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedPolicy(null);
    setLeaveForm({ leaveType: '', startDate: '', endDate: '', reason: '' });
  };

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    alert(`Leave application submitted successfully! 
    Leave Type: ${leaveForm.leaveType}
    Start Date: ${leaveForm.startDate}
    End Date: ${leaveForm.endDate}
    Reason: ${leaveForm.reason}`);
    closeModal();
  };

  const downloadPayslip = (month) => {
    alert(`Downloading payslip for ${month}... 
    This would normally trigger a PDF download.`);
  };

  const renderMainDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Left side - Title */}
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900">HR Dashboard</h1>
            </div>

            {/* Center - Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search"
                />
              </div>
            </div>

            {/* Right side - Notifications and Profile */}
            <div className="flex items-center space-x-4">
              {/* Notification Icon */}
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.5-3.5V9a6.502 6.502 0 00-13 0v4.5L1 17h5m4 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>

              {/* Profile Dropdown */}
              <div className="flex items-center space-x-2">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                  alt="Profile"
                />
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tiles Grid - 2x2 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tiles.map((tile) => (
            <div
              key={tile.id}
              onClick={() => setCurrentView(tile.id)}
              className={`${tile.bgColor} ${tile.borderColor} ${tile.hoverColor} rounded-2xl border-2 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg group overflow-hidden`}
              style={{ height: '280px' }}
            >
              {/* Icon Section */}
              <div className="flex items-center justify-center h-2/3 pt-8">
                {tile.icon}
              </div>
              
              {/* Title Section */}
              <div className="bg-white h-1/3 flex items-center justify-center">
                <h3 className="text-xl font-semibold text-gray-900">{tile.title}</h3>
              </div>
            </div>
          ))}
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
          {currentView === 'dashboard' && <DashboardModule user={user} openModal={openModal} />}
          {currentView === 'policies' && <HRPoliciesModule openModal={openModal} />}
          {currentView === 'leave' && <LeaveManagementModule user={user} openModal={openModal} />}
          {currentView === 'payroll' && <PayrollModule user={user} downloadPayslip={downloadPayslip} />}
          {currentView === 'profile' && <ProfileModule user={user} openModal={openModal} />}
          {currentView === 'reports' && <ReportsModule openModal={openModal} />}
        </main>
      </div>
    );
  };

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-96 overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {modalType === 'apply-leave' && '📝 Apply for Leave'}
                {modalType === 'view-policy' && `📚 ${selectedPolicy?.title}`}
                {modalType === 'edit-profile' && '👤 Edit Profile'}
                {modalType === 'view-calendar' && '📅 Holiday Calendar'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Apply Leave Form */}
            {modalType === 'apply-leave' && (
              <form onSubmit={handleLeaveSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                  <select
                    value={leaveForm.leaveType}
                    onChange={(e) => setLeaveForm({...leaveForm, leaveType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Leave Type</option>
                    <option value="casual">Casual Leave</option>
                    <option value="sick">Sick Leave</option>
                    <option value="earned">Earned Leave</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={leaveForm.startDate}
                      onChange={(e) => setLeaveForm({...leaveForm, startDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      value={leaveForm.endDate}
                      onChange={(e) => setLeaveForm({...leaveForm, endDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                  <textarea
                    value={leaveForm.reason}
                    onChange={(e) => setLeaveForm({...leaveForm, reason: e.target.value})}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter reason for leave..."
                    required
                  ></textarea>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Submit Leave Request
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* View Policy Content */}
            {modalType === 'view-policy' && selectedPolicy && (
              <div>
                <div className="mb-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {selectedPolicy.status}
                  </span>
                  <span className="ml-2 text-sm text-gray-600">
                    Category: {selectedPolicy.category}
                  </span>
                  <span className="ml-2 text-sm text-gray-600">
                    Updated: {selectedPolicy.updated}
                  </span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedPolicy.content}
                  </p>
                </div>
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => alert('Downloading policy document...')}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    📄 Download PDF
                  </button>
                  <button
                    onClick={closeModal}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Holiday Calendar */}
            {modalType === 'view-calendar' && (
              <div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span>🎄 Christmas Day</span>
                    <span>December 25, 2024</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span>🎊 New Year's Day</span>
                    <span>January 1, 2025</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span>🇮🇳 Republic Day</span>
                    <span>January 26, 2025</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span>🕉️ Holi</span>
                    <span>March 14, 2025</span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="mt-4 w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
              </div>
            )}

            {/* Edit Profile */}
            {modalType === 'edit-profile' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input type="text" defaultValue="John" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input type="text" defaultValue="Doe" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="tel" defaultValue="+91 9876543210" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input type="text" defaultValue="123 Main St, City" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={() => {alert('Profile updated successfully!'); closeModal();}}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={closeModal}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {currentView === 'main' ? renderMainDashboard() : renderModuleDashboard()}
      {renderModal()}
    </div>
  );
}

// Dashboard Module Component
function DashboardModule({ user, openModal }) {
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
          <QuickActions openModal={openModal} />
        </div>
      </div>
    </div>
  );
}

// HR Policies Module Component
function HRPoliciesModule({ openModal }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">HR Policies & Documents</h2>
          <button 
            onClick={() => alert('Add New Policy feature coming soon!')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            📄 Add New Policy
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPolicies.map((policy) => (
            <div key={policy.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{policy.title}</h3>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">{policy.status}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Category: {policy.category}</p>
              <p className="text-xs text-gray-500 mb-3">Updated: {policy.updated}</p>
              <button 
                onClick={() => openModal('view-policy', policy)}
                className="text-blue-600 hover:text-blue-500 text-sm font-medium"
              >
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
function LeaveManagementModule({ user, openModal }) {
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
            <button 
              onClick={() => openModal('apply-leave')}
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              📝 Apply for Leave
            </button>
            <button 
              onClick={() => openModal('view-calendar')}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              📅 View Calendar
            </button>
            <button 
              onClick={() => alert('Leave History: \n- Dec 20: Sick Leave (Approved)\n- Nov 15: Casual Leave (Approved)\n- Oct 10: Earned Leave (Approved)')}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
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
function PayrollModule({ user, downloadPayslip }) {
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
                <button 
                  onClick={() => downloadPayslip(month)}
                  className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                >
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
function ProfileModule({ user, openModal }) {
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
        <button 
          onClick={() => openModal('edit-profile')}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

// Reports Module Component
function ReportsModule({ openModal }) {
  const reports = [
    { name: "Leave Report", icon: "📊", description: "Monthly leave analytics" },
    { name: "Payroll Report", icon: "💰", description: "Salary and deductions" },
    { name: "Employee Report", icon: "👥", description: "Team performance" },
    { name: "Attendance Report", icon: "⏰", description: "Daily attendance tracking" },
    { name: "Policy Usage", icon: "📋", description: "Policy access statistics" },
    { name: "Performance Report", icon: "📈", description: "Employee performance metrics" }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Reports & Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, index) => (
          <div 
            key={index}
            onClick={() => alert(`Generating ${report.name}...\nThis would normally generate and download the report.`)}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="text-center">
              <div className="text-3xl mb-2">{report.icon}</div>
              <h3 className="font-semibold">{report.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{report.description}</p>
              <button className="mt-3 text-blue-600 hover:text-blue-500 text-sm font-medium">
                Generate Report →
              </button>
            </div>
          </div>
        ))}
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

function QuickActions({ openModal }) {
  const actions = [
    { name: "Apply Leave", icon: "📝", action: () => openModal('apply-leave') },
    { name: "View Policies", icon: "📋", action: () => openModal('view-policy', mockPolicies[0]) },
    { name: "Download Payslip", icon: "💰", action: () => alert('Downloading latest payslip...') },
    { name: "Update Profile", icon: "👤", action: () => openModal('edit-profile') }
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
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
