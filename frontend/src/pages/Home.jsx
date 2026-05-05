import React from 'react'

function Home() {
  return (
    <div className='Home min-h-screen bg-white text-gray-900'>


      {/* Navbar */}
      <nav className='navbar flex justify-between items-center px-16 py-5 border-b border-gray-200'>
        <h1 className='logo text-3xl font-bold text-blue-600'>Academic<span className='text-gray-600 hover:text-gray-400'>Aid</span></h1>
        <div className='nav-links flex items-center gap-6'>
          <a href="/Login" className='text-gray-600 hover:text-indigo-600 font-medium'>Login</a>
          <a href="/register" className='btn-primary bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700'>Get Started</a>
        </div>
      </nav>


      {/* Hero Section */}
      <section className="hero flex flex-col items-center text-center py-28 px-6 gap-6">
        <h2 className='text-5xl font-extraboldbold max-w-2xl leading-tight text-gray-900'>Get Help With Your Academic Projects</h2>
        <p className='text-lg text-gray-500 max-w-xl'>Connect with skilled helpers for assignments, presentations, research and more.</p>
        <a href="/register" className="btn-primary bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700">Find a Helper Today</a>
      </section>



      {/* Features Section */}
      <section className="features flex justify-center gap-6 px-16 py-16 bg-gray-50">
        <div className="feature-card bg-white border border-gray-200 rounded-2xl p-8 max-w-xs text-center">
          <h3 className='text-lg font-bold text-indigo-600 mb-3'>Post a Request</h3>
          <p className='text-gray-500 text-sm leading-relaxed'>Describe what you need help with and let helpers come to you.</p>
        </div>
        <div className="feature-card  bg-white border border-gray-200 rounded-2xl p-8 max-w-xs text-center">
          <h3 className='text-lg font-bold text-indigo-600 mb-3'>Browse Helpers</h3>
          <p className='text-gray-500 text-sm leading-relaxed'>Find skilled helpers by subject, rating and availability.</p>
        </div>
        <div className="feature-card  bg-white border border-gray-200 rounded-2xl p-8 max-w-xs text-center">
          <h3 className='text-lg font-bold text-indigo-600 mb-3'>Get It Done</h3>
          <p className='text-gray-500 text-sm leading-relaxed'>Book a session, communicate directly and get your work done.</p>
        </div>
      </section>


      {/* Footer */}
      <footer className="text-center py-8 text-gray-400 text-sm border-t border-gray-200">
        © 2026 AcademicAid. All rights reserved.
      </footer>

    </div>
  )
}

export default Home