import React, { useState } from 'react';
import axios from 'axios';

function StudentProfileModal({ student, onClose }) {

  const [formData, setFormData] = useState({
    bio: '',
    school: '',
    level: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')

      await axios.put('http://localhost:5000/api/auth/update-profile', {
        bio: formData.bio,
        school: formData.school,
        level: formData.level
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert('Profile updated successfully!')
      onClose()
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong')
    }
  }

  const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition'

  return (
    <div className='fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50 px-4'>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">


        {/* Header */}
        <div className="flex justify-between items-center px-8 pt-8 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
            <p className="text-gray-400 text-sm mt-1">Update your student profile</p>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-gray-500 text-3xl leading-none">&times;</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-6 flex flex-col gap-4">

          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Bio</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} className={inputClass} rows="4" placeholder="Tell tutors about yourself..." required ></textarea>
          </div>

          {/* school */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">School</label>
            <input type="text" name="school" value={formData.school} onChange={handleChange} className={inputClass} placeholder="e.g. Harvard University, Stanford University, Yoloya jesu Secondary school" required />
          </div>

          {/* level */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Level</label>
            <input type="text" name="level" value={formData.level} onChange={handleChange} className={inputClass} placeholder="e.g. University levels, Secondary class" required />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-sm font-semibold text-gray-500 border border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StudentProfileModal;