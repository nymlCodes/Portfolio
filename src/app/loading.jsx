export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-700/10 blur-[100px]" />

      {/* Floating dots */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => {
          const top = (i * 7) % 100
          const left = (i * 13) % 100
          const delay = (i * 0.15) % 3
          const duration = 3 + ((i * 0.25) % 3)
          return (
            <span
              key={i}
              className="absolute w-1 h-1 rounded-full bg-purple-500/40 animate-float-dot"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            />
          )
        })}
      </div>

      {/* Core loader */}
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Outer static ring */}
          <div className="absolute inset-0 rounded-full border border-purple-800/20" />

          {/* Spinning gradient ring */}
          <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="url(#ringGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="80 210"
            />
            <defs>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Inner counter-rotating ring */}
          <svg className="absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] animate-spin-reverse" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="url(#ringGradient2)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray="40 250"
            />
            <defs>
              <linearGradient id="ringGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>

          {/* The N */}
          <span className="relative text-5xl font-black gradient-text tracking-tight animate-letter-in">
            N
          </span>
        </div>

        {/* Name + tagline */}
        <div className="text-center animate-fade-up">
          <p className="text-white text-sm font-semibold tracking-[0.3em]">NEYAMUL</p>
          <p className="text-gray-600 text-[10px] tracking-[0.2em] mt-1">LOADING EXPERIENCE</p>
        </div>
      </div>
    </div>
  )
}