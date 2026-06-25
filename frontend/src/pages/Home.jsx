import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Micro-interactions for features cards
    const cards = document.querySelectorAll(".feature-card");
    cards.forEach((card) => {
      const handleMouseEnter = () => {
        const icon = card.querySelector(".card-icon");
        if (icon) {
          icon.style.transition =
            "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
          icon.style.transform = "scale(1.2) rotate(5deg)";
        }
      };

      const handleMouseLeave = () => {
        const icon = card.querySelector(".card-icon");
        if (icon) {
          icon.style.transform = "scale(1) rotate(0deg)";
        }
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);

  return (
    <div className="Home min-h-screen bg-slate-50/50 text-slate-900 antialiased font-sans">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 lg:px-16 py-4 flex justify-between items-center shadow-sm">
        {/* Logo */}
        <div
          className="flex items-center gap-2.5 group select-none cursor-pointer"
          onClick={() => navigate("/")}
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
            Academ
            <span className="text-indigo-600 font-extrabold">IQ.ng</span>
          </h1>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            className="text-slate-500 font-bold hover:text-indigo-600 transition"
            href="#home"
          >
            Home
          </a>
          <a
            className="text-slate-500 hover:text-indigo-600 font-bold transition"
            href="#features"
          >
            How It Works
          </a>
          <a
            className="text-slate-500 hover:text-indigo-700 font-bold transition"
            href="#focus"
          >
            Our Focus
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-5">
          <Link
            to="/login"
            className="text-sm text-slate-500 hover:text-indigo-700 font-bold tracking-tight transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide hover:bg-indigo-700 shadow-sm hover:shadow-[0_4px_12px_rgba(79,70,229,0.25)] hover:-translate-y-0.5 transition-all duration-200"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative min-h-[700px] flex items-center overflow-hidden bg-white"
      >
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>

        <div className="relative px-6 md:px-16 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600">
              <span className="text-[11px] font-black tracking-widest uppercase animate-pulse">
                🚀 Empowering Nigerian Students
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
              Get Instant Help With Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
                Academic Projects
              </span>
            </h2>
            <p className="text-lg text-slate-500 font-medium max-w-xl leading-relaxed">
              Connect seamlessly with expert Nigerian tutors specialized in
              University and Secondary education. From complex assignments and
              research documents to core syllabus guidance, we've got you
              covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide text-center shadow-md hover:bg-indigo-700 hover:shadow-[0_10px_25px_-5px_rgba(79,70,229,0.3)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Find a Helper Today →
              </Link>
            </div>
          </div>

          {/* Hero Visual Area */}
          <div className="relative justify-self-center lg:justify-self-end w-full max-w-md lg:max-w-none">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                alt="Students collaborating"
                className="w-full aspect-[4/3] object-cover"
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            {/* Floating Stat Badge */}
            <div className="absolute -bottom-6 -left-6 z-20 bg-white/95 backdrop-blur-md border border-slate-100 p-5 rounded-2xl shadow-xl hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                  ✓
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-900 text-sm">
                    500+ Experts
                  </p>
                  <p className="text-xs text-slate-400 font-medium">
                    Verified Nigerian Tutors
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST COUNTERS RIBBON */}
      <section className="py-14 relative overflow-hidden bg-indigo-600 text-white">
        <div className="relative px-6 md:px-16 max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-black">98%</div>
            <div className="text-[10px] uppercase font-bold tracking-wider opacity-80 mt-1">
              Success Rate
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black">15k+</div>
            <div className="text-[10px] uppercase font-bold tracking-wider opacity-80 mt-1">
              Projects Completed
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black">24/7</div>
            <div className="text-[10px] uppercase font-bold tracking-wider opacity-80 mt-1">
              Support Available
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black">5.0</div>
            <div className="text-[10px] uppercase font-bold tracking-wider opacity-80 mt-1">
              Average Rating
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="px-6 md:px-16 max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              How Academiq Works
            </h2>
            <p className="text-sm text-slate-500 font-medium max-w-xl mx-auto">
              Simple steps to bridge the gap between academic challenges and
              expert solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="feature-card bg-white border border-slate-100 rounded-2xl p-8 text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.01)] hover:shadow-[0_10px_30px_-4px_rgba(79,70,229,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="card-icon w-12 h-12 bg-indigo-50/60 text-indigo-600 rounded-xl flex items-center justify-center text-xl mx-auto mb-5">
                ✍️
              </div>
              <h3 className="text-base font-bold text-slate-800 tracking-tight mb-2">
                Post a Request
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Describe exactly what you need assistance with and let verified
                professionals pitch right to your dashboard.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="feature-card bg-white border border-slate-100 rounded-2xl p-8 text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.01)] hover:shadow-[0_10px_30px_-4px_rgba(79,70,229,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="card-icon w-12 h-12 bg-purple-50/60 text-purple-600 rounded-xl flex items-center justify-center text-xl mx-auto mb-5">
                👨‍🏫
              </div>
              <h3 className="text-base font-bold text-slate-800 tracking-tight mb-2">
                Browse Tutors
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Hand-select matching experts filtered precisely by subject
                mastery, reviews, pricing, and active calendar slots.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="feature-card bg-white border border-slate-100 rounded-2xl p-8 text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.01)] hover:shadow-[0_10px_30px_-4px_rgba(79,70,229,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="card-icon w-12 h-12 bg-emerald-50/60 text-emerald-600 rounded-xl flex items-center justify-center text-xl mx-auto mb-5">
                🎯
              </div>
              <h3 className="text-base font-bold text-slate-800 tracking-tight mb-2">
                Get It Done
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Book secure calendar links, message securely, and complete your
                tasks with comprehensive milestones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ACADEMIC FOCUS SECTION */}
      <section id="focus" className="py-24 bg-white">
        <div className="px-6 md:px-16 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden shadow-md aspect-square">
                  <img
                    alt="Campus"
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400"
                  />
                </div>
                <div className="bg-purple-600 p-5 rounded-2xl text-white">
                  <h4 className="font-bold text-base mb-1">STEM Modules</h4>
                  <p className="text-xs opacity-90 leading-relaxed">
                    Expert assistance across complex Engineering, Sciences, and
                    Tech projects.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-indigo-600 p-5 rounded-2xl text-white">
                  <h4 className="font-bold text-base mb-1">
                    Humanities & Arts
                  </h4>
                  <p className="text-xs opacity-90 leading-relaxed">
                    Dedicated specialists for Law, Social Sciences, and creative
                    documentation.
                  </p>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg aspect-[3/4]">
                  <img
                    alt="Writing"
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=400"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 order-1 lg:order-2 space-y-6 text-left">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Navigating Your Academic Milestones
            </h2>
            <p className="text-base text-slate-500 leading-relaxed font-medium">
              We understand the specific demands of higher education landscapes.
              From intense research expectations to strict submission timelines,
              our goal is to provide reliable auxiliary support channels to
              optimize your results.
            </p>
            <ul className="space-y-3.5 text-sm font-semibold text-slate-700">
              <li className="flex items-center gap-3">
                <span className="text-indigo-600 text-lg">✓</span> Direct
                connection with checked subject specialists
              </li>
              <li className="flex items-center gap-3">
                <span className="text-indigo-600 text-lg">✓</span> Original
                structural breakdowns and clear code commentary
              </li>
              <li className="flex items-center gap-3">
                <span className="text-indigo-600 text-lg">✓</span> Fully
                integrated messaging networks
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-slate-50 border-t border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-6 md:px-16 py-12 max-w-7xl mx-auto text-left">
          <div className="space-y-3 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <div className="w-6 h-6 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xs font-black">
                A
              </div>
              <span className="text-base font-black text-slate-800">
                Academiq.ng
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-xs font-medium leading-relaxed">
              Empowering academic excellence through secure peer networks.
            </p>
            <p className="text-[11px] text-slate-400 font-medium">
              © 2026 Academiq.ng. All rights reserved.
            </p>
          </div>
          <div className="flex gap-16 text-xs font-semibold text-slate-500">
            <div className="flex flex-col gap-2.5">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">
                Explore
              </span>
              <a className="hover:text-indigo-600 transition" href="#features">
                How It Works
              </a>
              <a className="hover:text-indigo-600 transition" href="#focus">
                Our Focus
              </a>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">
                Legal
              </span>
              <Link className="hover:text-indigo-600 transition" to="/privacy">
                Privacy Policy
              </Link>
              <Link className="hover:text-indigo-600 transition" to="/terms">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
