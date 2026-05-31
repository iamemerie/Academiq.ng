import { useState } from 'react'
import TutorProfileModal from './TutorProfileModal'
import StudentProfileModal from './StudentProfileModal'

function Navbar() {
  const fullName = localStorage.getItem('fullName')
  const role = localStorage.getItem('role')

  const [showProfileModal, setShowProfileModal] = useState(false)


  const handleLogout = () => {
    localStorage.clear()
    window.location.href = '/login'
  }

  return (
    <div>
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-16 py-4 flex justify-between items-center shadow-sm">

        {/* Logo */}
        <h1 className="text-2xl font-black text-indigo-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Academic<span className="text-violet-500" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>aids.ng</span>
        </h1>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          <a href="/dashboard" className="text-sm text-gray-500  hover:text-indigo-600 font-medium transition">Home</a>
          {role === 'student' ? (
            <a href="/browse-tutors" className="text-sm text-gray-500 hover:text-indigo-600 font-medium transition">Explore Tutors</a>
          ) : (
            <a href="/browse-requests" className="text-sm text-gray-500 hover:text-indigo-600 font-medium transition">Discover Requests</a>
          )}
          {/* Notification Bell */}
          <button className="relative text-gray-400 hover:text-indigo-600 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Avatar */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setShowProfileModal(true)}>
            <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
              {fullName?.charAt(0).toUpperCase()}
            </div>
            <div className="text-sm">
              <p className="font-semibold text-gray-800">{fullName}</p>
              <p className="text-gray-400 text-xs">{role === 'student' ? '🎓 Student' : '👨‍🏫 Tutor'}</p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white border border-red-200 font-semibold py-2 px-4 rounded-lg text-sm transition">
            Logout
          </button>
        </div>
      </nav>

      {/* Modal goes here — outside nav but inside return */}
      {showProfileModal && role === 'tutor' && (
        <TutorProfileModal onClose={() => setShowProfileModal(false)} />
      )}

      {showProfileModal && role === 'student' && (
        <StudentProfileModal onClose={() => setShowProfileModal(false)} />
      )}

    </div>
  )
}

export default Navbar