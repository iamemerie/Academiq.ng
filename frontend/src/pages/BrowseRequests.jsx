import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'

function BrowseRequests() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:5000/api/requests/all', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setRequests(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching requests:', error)
        setLoading(false)
      }
    }
    fetchRequests()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="px-16 py-10">
        <h1 className="text-3xl font-bold text-gray-800">Browse Requests</h1>
        <p className="text-gray-500 mt-2">Find students who need your help</p>

        {/* Requests Grid */}
        <div className="grid grid-cols-3 gap-6 mt-10">
          {loading ? (
            <p className="text-gray-400">Loading requests...</p>
          ) : requests.length === 0 ? (
            <p className="text-gray-400">No requests available yet.</p>
          ) : (
            requests.map((request) => (
              <div key={request._id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

                {/* Student info */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white text-lg font-bold">
                    {request.student?.fullName?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{request.student?.fullName}</h3>
                    <p className="text-gray-400 text-xs">📚 {request.subject}</p>
                    {request.student?.bio && (
                      <p className="text-gray-400 text-xs mt-1">{request.student?.bio}</p>
                    )}
                    {request.student?.school && (
                      <p className="text-gray-400 text-xs mt-1">🏫 {request.student?.school}</p>
                    )}
                    {request.student?.level && (
                      <p className="text-gray-400 text-xs mt-1">🎓 {request.student?.level} Level</p>
                    )}
                  </div>
                  <span className="ml-auto flex items-center gap-1 text-xs text-green-500 font-medium">
                    <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                    Open
                  </span>
                </div>

                {/* Title */}
                <h4 className="font-semibold text-gray-700 mb-2">{request.title}</h4>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{request.description}</p>

                {/* Level and Deadline */}
                <div className="flex justify-between text-xs text-gray-400 mb-4">
                  <span>📊 {request.level} Level</span>
                  <span>⏰ {new Date(request.deadline).toLocaleDateString()}</span>
                </div>

                {/* Respond button */}
                <button className="w-full bg-indigo-600 text-white py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition">
                  Respond
                </button>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default BrowseRequests