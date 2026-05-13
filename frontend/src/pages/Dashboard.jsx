import { useState, useEffect } from 'react'
import PostRequestModal from '../pages/PostRequestModal'
import axios from 'axios'

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)


  const fullName = localStorage.getItem('fullName')
  const role = localStorage.getItem('role')
  console.log('fullName from localStorage: ', fullName)
  console.log('role from localStorage: ', role)

  const [requests, setRequests] = useState([])

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:5000/api/requests/my-requests', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setRequests(response.data)
      } catch (error) {
        console.error('Error fetching requests:', error)
      }
    }

    fetchRequests()
  }, [])          // Only run this once when the component mounts

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
        <p className="text-gray-500 mt-2">You are logged in as a <span className="font-semibold text-indigo-600">{role === 'student' ? '🎓 Student' : '👨‍🏫 Tutor'}</span></p>

        {/* Quick Actions */}
        <div className="flex gap-4 mt-10">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 w-60 text-center shadow-sm">
            <h3 className="font-bold text-gray-800 mb-2">Post a Request</h3>
            <p className="text-gray-500 text-sm mb-4">Need help? Post your request now.</p>
            <button onClick={openModal} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700">Post Now</button>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 w-60 text-center shadow-sm">
            <h3 className="font-bold text-gray-800 mb-2">Browse Tutors</h3>
            <p className="text-gray-500 text-sm mb-4">Find the right tutor for you here.</p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 ">Browse</button>
          </div>
          {/* My Requests */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">My Requests</h2>

            {requests.length === 0 ? (
              <p className="text-gray-400 text-sm">You haven't posted any requests yet.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {requests.map((request) => (
                  <div key={request._id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-800">{request.title}</h3>
                        <p className="text-gray-500 text-sm mt-1">{request.subject} • {request.level} Level</p>
                        <p className="text-gray-400 text-sm mt-2">{request.description}</p>
                      </div>
                      <span className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                        {request.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs mt-4">Deadline: {new Date(request.deadline).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && <PostRequestModal onClose={closeModal} />}
    </div>
  )
}

export default Dashboard
