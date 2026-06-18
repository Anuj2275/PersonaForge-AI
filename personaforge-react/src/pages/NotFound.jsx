import { Link } from 'react-router-dom';

const quickLinks = [
  ['/persona/new', '✦', 'New Persona'],
  ['/personas', '🗂', 'My Personas'],
  ['/templates', '📋', 'Templates'],
  ['/history', '🔀', 'History'],
  ['/u/arjun', '👤', 'Profile'],
  ['/settings', '⚙', 'Settings'],
];

export default function NotFound() {
  return (
    <div className="bg-bg text-textc font-sans min-h-screen flex flex-col items-center justify-center overflow-hidden relative">
      <div className="noise-overlay" aria-hidden="true" />
      <div className="ambient-glow" style={{ width: 600, height: 600, background: 'rgba(124,111,224,0.07)', top: -120, left: -120 }} />
      <div className="ambient-glow" style={{ width: 500, height: 500, background: 'rgba(45,212,168,0.06)', bottom: -80, right: -80 }} />

      <header className="fixed top-0 left-0 right-0 z-10 h-[60px] border-b border-border bg-[rgba(10,10,15,0.85)] backdrop-blur-lg flex items-center px-6">
        <Link to="/" className="flex items-center gap-2.5 no-underline text-textc font-display font-bold text-base">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[13px]" style={{ background: 'linear-gradient(135deg,#7C6FE0,#2DD4A8)' }}>⚡</div>
          PersonaForge
        </Link>
      </header>

      <main className="relative z-[1] flex flex-col items-center text-center px-6 max-w-[560px] w-full">
        <div
          className="font-display font-bold leading-none tracking-tighter mb-1 select-none relative"
          style={{
            fontSize: 'clamp(96px,18vw,160px)',
            background: 'linear-gradient(135deg,rgba(124,111,224,0.25) 0%,rgba(45,212,168,0.15) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          aria-hidden="true"
        >
          <span
            className="absolute inset-0 font-display font-bold tracking-tighter"
            style={{
              fontSize: 'inherit',
              background: 'linear-gradient(135deg,#9B8EF5 0%,#2DD4A8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'glitch 4s ease-in-out infinite',
            }}
          >
            404
          </span>
          404
        </div>

        <div className="text-4xl mb-5" style={{ animation: 'floatY 3.5s ease-in-out infinite' }} role="img" aria-label="Lost in space">🔭</div>

        <h1 className="font-display font-bold tracking-tight mb-2.5" style={{ fontSize: 'clamp(20px,4vw,26px)' }}>This page doesn’t exist</h1>
        <p className="text-[15px] text-muted leading-relaxed max-w-[380px] mb-8">
          The page you’re looking for was moved, deleted, or never existed. Let’s get you back on track.
        </p>

        <div className="flex gap-3 flex-wrap justify-center mb-10 w-full sm:w-auto">
          <Link to="/dashboard" className="flex items-center gap-2 bg-purple text-white text-sm font-medium px-6 py-3 rounded-[10px] no-underline shadow-[0_4px_20px_rgba(124,111,224,0.35)] hover:bg-purple-b hover:-translate-y-0.5 transition-all justify-center">
            <span aria-hidden="true">⊞</span> Go to Dashboard
          </Link>
          <Link to="/" className="flex items-center gap-2 bg-white/[0.04] border border-borderH text-muted text-sm px-5.5 py-3 rounded-[10px] no-underline hover:bg-white/[0.07] hover:text-textc transition-all justify-center">
            <span aria-hidden="true">←</span> Back to Home
          </Link>
        </div>

        <div className="flex items-center gap-3 w-full max-w-[480px] mb-4 text-dim text-xs before:content-[''] before:flex-1 before:h-px before:bg-border after:content-[''] after:flex-1 after:h-px after:bg-border">
          or navigate to
        </div>

        <nav className="grid grid-cols-3 gap-2.5 w-full max-w-[480px]" aria-label="Quick navigation">
          {quickLinks.map(([to, icon, label]) => (
            <Link key={to} to={to} className="card flex flex-col items-center gap-2 p-4 no-underline hover:-translate-y-0.5" style={{ borderColor: undefined }} aria-label={label}>
              <span className="text-[22px]">{icon}</span>
              <span className="text-xs font-medium text-muted">{label}</span>
            </Link>
          ))}
        </nav>
      </main>

      <footer className="fixed bottom-5 text-xs text-dim z-[1]">
        © 2025 PersonaForge AI — <Link to="/" className="text-purple-b no-underline">Return home</Link>
      </footer>
    </div>
  );
}
