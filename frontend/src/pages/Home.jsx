import React from 'react'

function Home() {
  return (
    <div className='Home min-h-screen bg-white text-gray-900'>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-16 py-4 flex justify-between items-center shadow-sm">

        {/* Logo */}
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-2xl font-bold text-indigo-600">
          Academic<span style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-violet-500">Aid</span>
        </h1>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          <a href="#features" className="text-sm text-gray-500 hover:text-indigo-600 font-medium transition">Features</a>
          <a href="#how-it-works" className="text-sm text-gray-500 hover:text-indigo-600 font-medium transition">How it Works</a>
          <a href="/login" className="text-sm text-gray-500 hover:text-indigo-600 font-medium transition">Login</a>
          <a href="/register" className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">
            Get Started
          </a>
        </div>
      </nav>


      {/* Hero Section */}
      <section className="hero flex flex-col items-center text-center py-28 px-6 gap-6">
        <h2 className='text-5xl font-extraboldbold max-w-2xl leading-tight text-gray-900'>Get Help With Your Academic Projects</h2>
        <p className='text-lg text-gray-500 max-w-xl'>Connect with skilled Tutors for assignments, presentations, research and more.</p>
        <a href="/register" className="btn-primary bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700">Find a Helper Today</a>
      </section>



      {/* Features Section */}
      <section className="features flex justify-center gap-6 px-16 py-16 bg-gray-50">
        <div className="feature-card bg-white border border-gray-200 rounded-2xl p-8 max-w-xs text-center">
          <h3 className='text-lg font-bold text-indigo-600 mb-3'>Post a Request</h3>
          <p className='text-gray-500 text-sm leading-relaxed'>Describe what you need help with and let helpers come to you.</p>
        </div>
        <div className="feature-card  bg-white border border-gray-200 rounded-2xl p-8 max-w-xs text-center">
          <h3 className='text-lg font-bold text-indigo-600 mb-3'>Browse Tutors</h3>
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