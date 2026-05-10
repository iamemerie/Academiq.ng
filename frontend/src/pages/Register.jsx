import React, { useState } from 'react'
import axios from 'axios'


function Register() {

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: ''
  })
  // This function will handle changes to the form inputs. It updates the formData state with the new values.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  // This function will handle role selection. It updates the formData state with the selected role.
  const handleRole = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole })
  }
  // This function will handle form submission. In a real application, you would send formData to your backend API here.
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Here you would typically send formData to your backend API
    try {
      // Simulate API call
      const response = await axios.post('http://localhost:5000/api/auth/register', formData)
      console.log(response.data)
      // Handle successful registration (e.g., show a success message, redirect to login, etc.)
      alert(response.data.message)
    } catch (error) {
      alert(error.response.data.message || 'Registration failed')
    }
  }
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
      <div className='bg-white p-10 rounded-2xl shadow-md w-full max-w-md'>
        <h1 className='text-2xl text-indigo-600 font-bold text-center mb-6'>
          Create your account
        </h1>

        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-4'>
          <input
            type="text"
            name='fullName'
            placeholder='Full Name'
            className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600'
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name='email'
            placeholder='Email'
            className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name='password'
            placeholder='Password'
            className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600'
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className='flex gap-4 mt-2'>
            <button
              type="button"
              onClick={() => handleRole('student')}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm border-2 ${formData.role === 'student'
                ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                : 'border-gray-200 text-gray-500'
                }`}
            >
              🎓 Student
            </button>
            <button
              type="button"
              onClick={() => handleRole('tutor')}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm border-2 ${formData.role === 'tutor'
                ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                : 'border-gray-200 text-gray-500'
                }`}
            >
              👨‍🏫 Tutor
            </button>
          </div>

          <button type='submit' className='bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700'>Register</button>
        </form>

        <p className='mt-4 text-center text-sm text-gray-500'>
          Already have an account?{' '}
          <a href='/login' className='text-indigo-600 font-semibold hover:underline'>Login</a>
        </p>
      </div>
    </div>
  )
}


export default Register