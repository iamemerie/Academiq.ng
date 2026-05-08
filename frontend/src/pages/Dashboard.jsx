import React from 'react'

function Dashboard() {

  const fullName = localStorage.getItem('fullName')
  const role = localStorage.getItem('role')
  console.log('fullName from localStorage: ', fullName)
  console.log('role from localStorage: ', role)

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white px-16 py-5 shadow-sm flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">Academic<span className="text-gray-600">Aid</span></h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg text-sm">
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="px-16 py-10">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, {fullName}! 👋</h1>
        <p className="text-gray-500 mt-2">You are logged in as a <span className="font-semibold text-indigo-600">{role === 'student' ? '🎓 Student' : '🤝 Helper'}</span></p>

        {/* Quick Actions */}
        <div className="flex gap-4 mt-10">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 w-60 text-center shadow-sm">
            <h3 className="font-bold text-gray-800 mb-2">Post a Request</h3>
            <p className="text-gray-500 text-sm mb-4">Need help? Post your request now.</p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700">Post Now</button>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 w-60 text-center shadow-sm">
            <h3 className="font-bold text-gray-800 mb-2">Browse Helpers</h3>
            <p className="text-gray-500 text-sm mb-4">Find the right helper for you.</p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700">Browse</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
