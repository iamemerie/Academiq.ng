import React from 'react'
import Navbar from '../components/Navbar'

function BrowseTutors() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Content */}
      <div className="px-16 py-10">
        <h1 className="text-3xl font-bold text-gray-800">Browse Tutors</h1>
        <p className="text-gray-500 mt-2">Find the right tutor for your needs</p>

        {/* Tutors will load here */}
        <div className="mt-10">
          <p className="text-gray-400">Loading tutors...</p>
        </div>
      </div>
    </div>
  )
}

export default BrowseTutors