import React from "react";

function Home() {
  return (
    <div className="Home min-h-screen bg-white text-slate-800 antialiased">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100/80 px-8 lg:px-16 py-4 flex justify-between items-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.01)]">
        {/* Logo */}
        <div
          className="flex items-center gap-2.5 group select-none cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-[0_4px_12px_rgba(79,70,229,0.2)] group-hover:rotate-6 transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-white"
            >
              <path d="M12 2L1 7l11 5 11-5-11-5z" />
              <path d="M21 11.5v5c0 .5-.5 1-1 1s-1-.5-1-1v-5" />
              <path d="M6 12v3.5c0 1.9 2.7 3.5 6 3.5s6-1.6 6-3.5V12" />
            </svg>
          </div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight">
            Academic
            <span className="text-indigo-600 font-extrabold">aids.ng</span>
          </h1>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          <a
            href="/login"
            className="text-sm text-slate-500 hover:text-indigo-600 font-bold tracking-tight transition duration-200"
          >
            Login
          </a>
          <a
            href="/register"
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide hover:bg-indigo-700 transition shadow-sm hover:shadow-[0_4px_12px_rgba(79,70,229,0.25)] hover:-translate-y-0.5 transition-all duration-200"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero flex flex-col items-center text-center py-32 px-6 gap-6 max-w-4xl mx-auto">
        {/* Tiny eye-catcher badge */}
        <span className="bg-indigo-50/80 border border-indigo-100/60 text-indigo-600 text-[11px] font-black tracking-widest uppercase px-3 py-1 rounded-full shadow-sm animate-pulse">
          🚀 Empowering Nigerian Students
        </span>

        <h2 className="text-5xl md:text-6xl font-black max-w-3xl leading-[1.1] text-slate-900 tracking-tight">
          Get Instant Help With Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
            Academic Projects
          </span>
        </h2>

        <p className="text-lg text-slate-400 font-medium max-w-xl leading-relaxed mt-2">
          Connect seamlessly with expert tutors for assignments, complex
          research documents, presentations, and core syllabus guidance.
        </p>

        <a
          href="/register"
          className="mt-4 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide shadow-md hover:bg-indigo-700 hover:shadow-[0_10px_25px_-5px_rgba(79,70,229,0.3)] hover:-translate-y-0.5 transition-all duration-300"
        >
          Find a Helper Today →
        </a>
      </section>

      {/* FEATURES SECTION */}
      <section className="features flex flex-wrap justify-center gap-8 px-16 py-24 bg-slate-50/50 border-t border-slate-50">
        {/* Feature Card 1 */}
        <div className="feature-card bg-white border border-slate-100 rounded-2xl p-8 w-72 text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.01)] hover:shadow-[0_10px_30px_-4px_rgba(79,70,229,0.06)] hover:-translate-y-1 transition-all duration-300 group">
          <div className="w-12 h-12 bg-indigo-50/60 text-indigo-600 rounded-xl flex items-center justify-center text-xl mx-auto mb-5 group-hover:scale-110 transition duration-300">
            ✍️
          </div>
          <h3 className="text-base font-bold text-slate-800 tracking-tight mb-2">
            Post a Request
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed px-1">
            Describe exactly what you need assistance with and let verified
            professionals pitch right to your dashboard.
          </p>
        </div>

        {/* Feature Card 2 */}
        <div className="feature-card bg-white border border-slate-100 rounded-2xl p-8 w-72 text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.01)] hover:shadow-[0_10px_30px_-4px_rgba(79,70,229,0.06)] hover:-translate-y-1 transition-all duration-300 group">
          <div className="w-12 h-12 bg-violet-50/60 text-violet-600 rounded-xl flex items-center justify-center text-xl mx-auto mb-5 group-hover:scale-110 transition duration-300">
            👨‍🏫
          </div>
          <h3 className="text-base font-bold text-slate-800 tracking-tight mb-2">
            Browse Tutors
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed px-1">
            Hand-select matching experts filtered precisely by subject mastery,
            reviews, pricing, and active calendar slots.
          </p>
        </div>

        {/* Feature Card 3 */}
        <div className="feature-card bg-white border border-slate-100 rounded-2xl p-8 w-72 text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.01)] hover:shadow-[0_10px_30px_-4px_rgba(79,70,229,0.06)] hover:-translate-y-1 transition-all duration-300 group">
          <div className="w-12 h-12 bg-emerald-50/60 text-emerald-600 rounded-xl flex items-center justify-center text-xl mx-auto mb-5 group-hover:scale-110 transition duration-300">
            🎯
          </div>
          <h3 className="text-base font-bold text-slate-800 tracking-tight mb-2">
            Get It Done
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed px-1">
            Book secure calendar links, message securely, and complete your
            tasks with comprehensive milestones.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 text-slate-400 text-xs font-medium border-t border-slate-100 bg-white">
        © 2026 Academicaids.ng. Built for seamless academic collaboration.
      </footer>
    </div>
  );
}

export default Home;
