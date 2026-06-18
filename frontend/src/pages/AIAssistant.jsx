import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function AIAssistant() {
  const role = localStorage.getItem("role");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const isStudent = role === "student";

  const suggestions = isStudent
    ? [
        "Explain photosynthesis simply",
        "Help me structure my thesis",
        "Review my assignment introduction",
        "How do I prepare for WAEC?",
      ]
    : [
        "Create a lesson plan for quadratic equations",
        "Suggest teaching strategies for slow learners",
        "Generate 10 exam questions on the water cycle",
        "How do I explain Newton's laws simply?",
      ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (textToSend = input) => {
    const textClean = typeof textToSend === "string" ? textToSend : input;
    if (!textClean.trim()) return;

    const userMessage = { role: "user", content: textClean };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // Use the variable directly. Vite automatically handles swapping it on Netlify!
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ai/chat`,
        { message: textClean, role },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't process that response right now. Please verify system connections and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="min-h-screen bg-slate-900 bg-cover bg-center flex flex-col antialiased selection:bg-indigo-500/30"
      style={{
        backgroundImage: `radial-gradient(circle at top right, rgba(99, 102, 241, 0.15), transparent), radial-gradient(circle at bottom left, rgba(168, 85, 247, 0.1), transparent), url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80')`,
      }}
    >
      <Navbar />

      {/* Main Expansive Container Hub */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 lg:py-10 flex flex-col gap-6">
        {/* Sleek Header Section */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5 backdrop-blur-md px-4 py-3 rounded-2xl bg-slate-900/40">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {isStudent
                  ? "Academiq Study Core"
                  : "Academiq Instructor Engine"}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
              {isStudent
                ? "Active structural context analysis — operational across secondary milestones & advanced university research paths"
                : "Automated controller ready for processing lesson architectures, curriculum data, and exam metrics"}
            </p>
          </div>

          {/* Top Platform Badge Icon */}
          <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20 text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 21l-.813-5.096L3 15l5.187-.813L9 9l.813 5.187L15 15l-5.187.813zM19.071 4.929l-.707 1.95-1.95.707 1.95.707.707 1.95.707-1.95 1.95-.707-1.95-.707-.707-1.95z"
              />
            </svg>
          </div>
        </div>

        {/* Premium Blur Workspace Box */}
        <div className="flex-1 backdrop-blur-xl bg-slate-900/60 border border-white/10 rounded-3xl shadow-2xl p-4 sm:p-6 flex flex-col gap-5 min-h-[450px] max-h-[600px] overflow-y-auto custom-scrollbar">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-8 text-center max-w-2xl mx-auto py-8">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500 rounded-3xl blur-xl opacity-40 animate-pulse"></div>
                <div className="relative w-16 h-16 bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white shadow-xl border border-white/20">
                  <svg
                    className="w-8 h-8 animate-spin-slow"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-2">
                  Welcome to the future of learning on Academiq
                </h2>
                <p className="text-xs text-slate-400 font-medium max-w-md">
                  Select a targeted operational template node below to
                  initialize automated prompt synthesis hooks immediately.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s)}
                    className="text-left px-4 py-3.5 rounded-xl bg-white/5 border border-white/5 text-xs font-semibold text-slate-300 hover:border-indigo-500/40 hover:bg-indigo-600/10 hover:text-indigo-400 transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm"
                  >
                    <span className="text-indigo-400 mr-2">✦</span> {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3.5 ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                >
                  {/* AI Logo on Assistant Response row */}
                  {msg.role !== "user" && (
                    <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-md flex-shrink-0">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.813 15.904L9 21l-.813-5.096L3 15l5.187-.813L9 9l.813 5.187L15 15l-5.187.813z"
                        />
                      </svg>
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] sm:max-w-[70%] px-4.5 py-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm transition-all ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white rounded-tr-none font-medium tracking-wide border border-indigo-500"
                        : "bg-white/10 text-slate-100 border border-white/5 backdrop-blur-md rounded-tl-none font-normal"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-3.5 justify-start animate-pulse">
                  <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 border border-white/5 text-slate-400 flex-shrink-0">
                    <span className="text-xs">⚙️</span>
                  </div>
                  <div className="bg-white/10 border border-white/5 px-5 py-4 rounded-2xl rounded-tl-none flex items-center justify-center">
                    <div className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0ms]"></span>
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </>
          )}
        </div>

        {/* Input Interface Block */}
        <div className="backdrop-blur-xl bg-slate-900/50 rounded-2xl border border-white/10 shadow-2xl p-3 flex gap-3 items-center">
          <div className="flex-1 bg-white/5 border border-white/5 focus-within:border-indigo-500/50 rounded-xl px-4 py-2 transition-all flex items-center gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isStudent
                  ? "Inquire about advanced assignments, research topics, or notes..."
                  : "Request lesson processing matrices, quizzes, or evaluation frameworks..."
              }
              rows={1}
              className="flex-1 resize-none bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none py-1 custom-scrollbar max-h-20"
              style={{ minHeight: "24px" }}
            />
          </div>
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="h-10 px-6 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-xl text-xs font-bold tracking-wide transition transform active:scale-95 disabled:opacity-30 disabled:pointer-events-none shadow-lg shadow-indigo-600/20 flex items-center gap-1.5 flex-shrink-0"
          >
            <span>Generate</span>
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIAssistant;
