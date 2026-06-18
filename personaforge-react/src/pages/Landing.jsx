import { useState } from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: '🎯', bg: 'rgba(124,111,224,0.15)', title: 'Interview-Driven Persona Builder', featured: true,
    desc: "PersonaForge doesn't ask you to write. It asks you to answer. Smart adaptive questions map your goal, skill level, communication style, and learning preferences — then assemble the full persona for you.",
    tags: ['Core feature', 'Adaptive questions'],
  },
  {
    icon: '✨', bg: 'rgba(45,212,168,0.12)', title: 'Prompt Generation',
    desc: 'Generates a complete, structured system prompt from your answers — including behavior rules, constraints, tone, and teaching style. Ready to paste.',
    tags: ['AI-powered'],
  },
  {
    icon: '📊', bg: 'rgba(224,136,111,0.12)', title: 'Prompt Scoring',
    desc: 'Every prompt is scored on clarity, specificity, and context completeness. Get a quality rating and understand exactly where to improve.',
    tags: ['Quality analysis'],
  },
  {
    icon: '💡', bg: 'rgba(111,212,224,0.12)', title: 'Missing Element Suggestions',
    desc: '"Add learning style." "Define experience level." "Set memory constraints." Actionable, not vague.',
    tags: ['Smart suggestions'],
  },
  {
    icon: '🗂️', bg: 'rgba(224,111,180,0.12)', title: 'Persona Library',
    desc: 'Every persona you create is saved. Browse, search, archive, and reuse whenever you need.',
    tags: ['Persistent storage'],
  },
  {
    icon: '🔀', bg: 'rgba(180,224,111,0.1)', title: 'Prompt Versioning',
    desc: 'Every refinement saves a new version. v1 → v2 → v3. Compare, revert, and track how prompts evolved.',
    tags: ['v1 · v2 · v3'],
  },
];

const steps = [
  { num: '01', icon: '💬', title: 'Answer smart questions', desc: 'Tell PersonaForge your goal, current skill level, how you learn best, and what constraints matter. No prompt writing needed.' },
  { num: '02', icon: '⚡', title: 'Persona generated', desc: 'The system assembles a full persona blueprint — behavior rules, teaching style, communication style, memory instructions.' },
  { num: '03', icon: '📋', title: 'Copy and use anywhere', desc: 'Your production-grade system prompt is ready. Copy it into ChatGPT, Claude, Gemini, or any LLM in one click.' },
  { num: '04', icon: '🔄', title: 'Evolve it over time', desc: 'Edit your persona as you grow. Each refinement creates a new version. Your library builds into an AI operating system.' },
];

const personaExamples = [
  { icon: '⚛️', title: 'React Mentor', sub: 'Hands-on, project-driven. Adapts difficulty as you improve.' },
  { icon: '🧮', title: 'DSA Mentor', sub: 'Explains patterns, gives hints before answers, tracks weak spots.' },
  { icon: '☕', title: 'Java Mentor', sub: 'OOP-first. Teaches design patterns through real examples.' },
  { icon: '🏗️', title: 'System Design Coach', sub: 'Scalability-focused. Draws trade-offs, asks before telling.' },
  { icon: '💬', title: 'English Mentor', sub: 'Corrects naturally without breaking flow. Tracks mistakes.' },
  { icon: '💼', title: 'Career Coach', sub: 'Interview prep, resume review, and negotiation strategy.' },
  { icon: '🏋️', title: 'Fitness Coach', sub: 'Evidence-based. Adjusts plans to your schedule and recovery.' },
  { icon: '🚀', title: 'Startup Advisor', sub: 'Cuts to first principles. Pushes back on assumptions.' },
];

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-bg text-textc font-sans relative overflow-x-hidden">
      <div className="noise-overlay" aria-hidden="true" />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-border backdrop-blur-xl bg-[rgba(10,10,15,0.82)]" aria-label="Main navigation">
        <div className="max-w-[1200px] mx-auto px-6 h-[60px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-lg text-textc no-underline">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: 'linear-gradient(135deg,#7C6FE0,#2DD4A8)' }} aria-hidden="true">⚡</div>
            PersonaForge
          </Link>
          <ul className="hidden md:flex items-center gap-8 list-none">
            <li><a href="#features" className="text-muted text-sm no-underline hover:text-textc transition-colors">Features</a></li>
            <li><a href="#how-it-works" className="text-muted text-sm no-underline hover:text-textc transition-colors">How it works</a></li>
            <li><a href="#personas" className="text-muted text-sm no-underline hover:text-textc transition-colors">Personas</a></li>
            <li><a href="#output" className="text-muted text-sm no-underline hover:text-textc transition-colors">Preview</a></li>
          </ul>
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="btn-ghost">Log in</Link>
            <Link to="/register" className="btn-primary no-underline">Get started free</Link>
          </div>
          <button
            className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className={`w-[22px] h-[1.5px] bg-muted rounded transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`w-[22px] h-[1.5px] bg-muted rounded transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-[22px] h-[1.5px] bg-muted rounded transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed top-[60px] left-0 right-0 z-[99] bg-surface border-b border-border px-6 py-5 md:hidden" role="dialog" aria-label="Navigation menu">
          {['Features', 'How it works', 'Personas', 'Preview'].map((label, i) => (
            <a key={label} href={`#${['features', 'how-it-works', 'personas', 'output'][i]}`} onClick={() => setMobileMenuOpen(false)} className="block py-3.5 border-b border-border text-muted no-underline text-[15px] hover:text-textc">
              {label}
            </a>
          ))}
          <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block py-3.5 border-b border-border text-muted no-underline text-[15px]">Log in</Link>
          <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block py-3.5 text-muted no-underline text-[15px]">Get started free →</Link>
        </div>
      )}

      {/* HERO */}
      <section className="relative overflow-hidden pt-[140px] pb-[100px] px-6 min-h-screen flex items-center" aria-label="Hero">
        <div className="ambient-glow" style={{ width: 600, height: 600, background: 'rgba(124,111,224,0.08)', top: -100, left: -100 }} />
        <div className="ambient-glow" style={{ width: 400, height: 400, background: 'rgba(45,212,168,0.07)', top: 200, right: -80 }} />

        <div className="max-w-[1200px] mx-auto w-full grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-purple/10 border border-purple/25 rounded-full px-3.5 py-1.5 text-xs font-medium text-purple-b mb-6 tracking-wide">
              <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulseDot" aria-hidden="true" />
              Now in public beta
            </div>
            <h1 className="font-display font-bold leading-[1.08] tracking-tight text-textc mb-5" style={{ fontSize: 'clamp(36px,5vw,60px)' }}>
              Build AI Personas That<br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg,#9B8EF5 0%,#2DD4A8 100%)' }}>Actually Understand</span><br />
              You
            </h1>
            <p className="text-[17px] text-muted leading-[1.7] max-w-[420px] mb-9 mx-auto md:mx-0">
              Stop wasting 30 minutes crafting prompts every time. PersonaForge interviews you once and generates production-grade AI personas — ready to use in ChatGPT, Claude, Gemini, or anywhere else.
            </p>
            <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
              <Link to="/register" className="flex items-center gap-2 bg-purple text-white text-[15px] font-medium px-7 py-3.5 rounded-[10px] no-underline shadow-[0_4px_24px_rgba(124,111,224,0.35)] hover:bg-purple-b hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(124,111,224,0.45)] transition-all">
                Build your first persona <span aria-hidden="true">→</span>
              </Link>
              <a href="#output" className="flex items-center gap-2 bg-white/[0.04] border border-borderH text-muted text-[15px] px-6 py-3.5 rounded-[10px] no-underline hover:bg-white/[0.07] hover:text-textc transition-all">
                <span aria-hidden="true">▶</span> See how it works
              </a>
            </div>
            <div className="flex items-center gap-4 mt-7 justify-center md:justify-start">
              <div className="flex" aria-hidden="true">
                {[['A', '#7C6FE0', '#fff'], ['K', '#2DD4A8', '#111'], ['R', '#E0886F', '#fff'], ['S', '#6FD4E0', '#111']].map(([letter, bg, fg], i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-bg -ml-2 first:ml-0 text-[11px] font-semibold flex items-center justify-center" style={{ background: bg, color: fg }}>
                    {letter}
                  </div>
                ))}
              </div>
              <span className="text-[13px] text-dim">Joined by 2,400+ builders this week</span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="hidden md:flex justify-center items-center" aria-hidden="true">
            <div className="relative w-full max-w-[420px]">
              <div className="absolute -top-5 -right-5 bg-card border border-borderH rounded-[10px] px-3.5 py-2.5 text-xs text-muted flex items-center gap-2 backdrop-blur-md animate-floatY">
                <div className="w-2 h-2 rounded-full bg-teal" /> Prompt score: 9.1/10
              </div>
              <div className="absolute bottom-8 -left-6 bg-card border border-borderH rounded-[10px] px-3.5 py-2.5 text-xs text-muted flex items-center gap-2 backdrop-blur-md" style={{ animation: 'floatY 5s ease-in-out infinite' }}>
                <div className="w-2 h-2 rounded-full bg-purple" /> Used in Claude · ChatGPT
              </div>
              <div className="card p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(124,111,224,0.6),transparent)' }} />
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: 'linear-gradient(135deg,#7C6FE0,#2DD4A8)' }}>🧑‍💻</div>
                  <div>
                    <div className="font-display font-semibold text-base">React Mentor</div>
                    <div className="text-[13px] text-muted">Senior Frontend Engineer</div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-teal-dim border border-teal/20 text-teal text-[11px] font-medium rounded-md px-2 py-0.5 mb-3.5">
                  ✓ Persona generated
                </div>
                <div className="flex flex-col gap-2.5 mb-4.5">
                  {[['Teaching style', 'Project-based'], ['Communication', 'Direct + concise']].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between">
                      <span className="text-xs text-dim">{k}</span>
                      <span className="text-xs text-muted font-medium">{v}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-dim">Difficulty</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-20 h-1 bg-white/[0.07] rounded overflow-hidden"><div className="h-full bg-purple rounded" style={{ width: '65%' }} /></div>
                      <span className="text-xs text-muted font-medium">Adaptive</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-dim">Focus areas</span>
                    <span className="text-xs text-muted font-medium">Hooks, State, Arch</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <div className="text-xs text-dim">Prompt quality</div>
                    <div className="text-[11px] text-dim">v3 · Updated 2m ago</div>
                  </div>
                  <div className="font-display text-[22px] font-bold text-teal">9.1<span className="text-[13px] text-dim">/10</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPAT STRIP */}
      <div className="py-[60px] px-6 border-t border-border" role="complementary" aria-label="Compatible AI platforms">
        <div className="max-w-[1200px] mx-auto flex items-center gap-10 flex-wrap justify-center">
          <span className="text-[13px] text-dim font-medium whitespace-nowrap">Works with</span>
          <div className="flex items-center gap-8 flex-wrap justify-center">
            {['ChatGPT', 'Claude', 'Gemini', 'DeepSeek', 'Perplexity', 'Any LLM'].map((name) => (
              <span key={name} className="text-sm font-medium text-muted flex items-center gap-2 hover:text-textc transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-teal" aria-hidden="true" /> {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* PROBLEM → SOLUTION */}
      <section className="py-[100px] px-6" aria-label="Problem and solution">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center mb-2">
            <div className="text-[11px] font-semibold tracking-[0.1em] text-purple-b uppercase">The problem</div>
          </div>
          <h2 className="font-display font-bold text-center mb-4 leading-[1.1] tracking-tight" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>
            Prompting is broken.<br />We fixed it.
          </h2>
          <p className="text-base text-muted text-center max-w-[560px] mx-auto leading-[1.7]">
            Every session, developers and learners waste 10–30 minutes rebuilding the same context. PersonaForge eliminates that.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-14">
            {/* Before */}
            <div className="card p-8" style={{ borderColor: 'rgba(255,80,80,0.15)' }}>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-md mb-6" style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.2)', color: '#FF7070' }}>
                ✗ Before PersonaForge
              </div>
              <div className="flex flex-col" role="list">
                {['Open ChatGPT and stare at a blank input', "Write a prompt. It's generic. Mediocre.", 'Modify prompt. Still off.', 'Modify again. Frustrated.', 'Give up. Use a worse version.', 'Repeat next session.'].map((step, i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0 text-sm text-muted" role="listitem">
                    <div className="w-7 h-7 rounded-md flex items-center justify-center text-sm flex-shrink-0" style={{ background: 'rgba(255,80,80,0.12)' }}>
                      {['💭', '✍️', '🔄', '😤', '🗑️', '🔁'][i]}
                    </div>
                    {step}
                  </div>
                ))}
              </div>
              <div className="mt-6 px-4 py-3.5 rounded-[10px] text-[13px] font-medium flex items-center gap-2" style={{ background: 'rgba(255,80,80,0.06)', border: '1px solid rgba(255,80,80,0.12)', color: '#FF7070' }}>
                ⏱ Wasted: 10–30 minutes every time
              </div>
            </div>

            {/* After */}
            <div className="card p-8 relative overflow-hidden" style={{ borderColor: 'rgba(45,212,168,0.18)' }}>
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(45,212,168,0.5),transparent)' }} />
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-md mb-6 bg-teal-dim border border-teal/20 text-teal">
                ✓ With PersonaForge
              </div>
              <div className="flex flex-col" role="list">
                {['Answer smart questions about your goal', 'Persona generated in seconds', 'Prompt scored. Suggestions surfaced.', 'Copy prompt. Paste anywhere.', 'Saved forever. Use again anytime.', 'Improve it over time with versioning.'].map((step, i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0 text-sm text-muted" role="listitem">
                    <div className="w-7 h-7 rounded-md flex items-center justify-center text-sm flex-shrink-0 bg-teal-dim">
                      {['❓', '⚡', '📊', '📋', '💾', '🚀'][i]}
                    </div>
                    {step}
                  </div>
                ))}
              </div>
              <div className="mt-6 px-4 py-3.5 rounded-[10px] text-[13px] font-medium flex items-center gap-2 bg-teal-dim border border-teal/20 text-teal">
                ⚡ Done in under 2 minutes. Saved forever.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-[100px] px-6" id="features" aria-label="Features">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-[11px] font-semibold tracking-[0.1em] text-purple-b uppercase mb-3">What you get</div>
            <h2 className="font-display font-bold mb-4 leading-[1.1] tracking-tight" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>
              Everything a persona needs.<br />Nothing it doesn’t.
            </h2>
            <p className="text-base text-muted max-w-[560px] mx-auto leading-[1.7]">
              Six precision tools — from smart interview to version history — that turn rough intent into a prompt any AI can act on.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
            {features.map((f) => (
              <div
                key={f.title}
                role="listitem"
                className={`card p-7 hover:-translate-y-0.5 ${f.featured ? 'lg:col-span-2' : ''}`}
                style={f.featured ? { background: 'linear-gradient(135deg,rgba(124,111,224,0.06) 0%,rgba(45,212,168,0.04) 100%)', borderColor: 'rgba(124,111,224,0.2)' } : undefined}
              >
                <div className="w-11 h-11 rounded-[11px] flex items-center justify-center text-xl mb-[18px]" style={{ background: f.bg }} aria-hidden="true">{f.icon}</div>
                <div className="font-display text-[17px] font-semibold mb-2.5">{f.title}</div>
                <p className="text-sm text-muted leading-[1.65]">{f.desc}</p>
                <div className="flex items-center gap-2 mt-5">
                  {f.tags.map((t) => <span key={t} className="tag-purple text-[11px] font-medium rounded-md px-2.5 py-0.5">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-[100px] px-6" id="how-it-works" aria-label="How PersonaForge works">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-[11px] font-semibold tracking-[0.1em] text-purple-b uppercase mb-3">The process</div>
            <h2 className="font-display font-bold leading-[1.1] tracking-tight" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>
              Four steps from nothing<br />to production-ready.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-2xl overflow-hidden" role="list" aria-label="Steps to create a persona">
            {steps.map((s) => (
              <div key={s.num} className="bg-card p-8" role="listitem">
                <div className="text-[11px] font-semibold tracking-[0.1em] text-dim mb-4 uppercase">Step {s.num}</div>
                <span className="text-[28px] mb-3.5 block" aria-hidden="true">{s.icon}</span>
                <div className="font-display text-base font-semibold mb-2">{s.title}</div>
                <p className="text-[13px] text-muted leading-[1.6]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERSONA TYPES */}
      <section className="py-[100px] px-6" id="personas" aria-label="Persona types and examples">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12">
            <div className="text-[11px] font-semibold tracking-[0.1em] text-purple-b uppercase mb-3">Who it’s for</div>
            <h2 className="font-display font-bold mb-4 leading-[1.1] tracking-tight" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>A persona for every goal.</h2>
            <p className="text-base text-muted max-w-[560px] leading-[1.7]">Students, developers, professionals, and creators — PersonaForge builds the AI collaborator that fits how you actually work.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5" role="list" aria-label="Example personas">
            {personaExamples.map((p) => (
              <div key={p.title} role="listitem" tabIndex={0} className="card p-5.5 cursor-pointer hover:-translate-y-0.5">
                <span className="text-[28px] mb-3 block" aria-hidden="true">{p.icon}</span>
                <div className="font-display text-sm font-semibold mb-1.5">{p.title}</div>
                <p className="text-xs text-dim leading-[1.5]">{p.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTPUT PREVIEW */}
      <section className="py-[100px] px-6" id="output" aria-label="Preview of PersonaForge output">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[11px] font-semibold tracking-[0.1em] text-purple-b uppercase mb-3">What gets built</div>
          <h2 className="font-display font-bold mb-4 leading-[1.1] tracking-tight" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>
            Answer six questions.<br />Get a complete system prompt.
          </h2>
          <p className="text-base text-muted max-w-[560px] leading-[1.7]">Here’s exactly what PersonaForge builds from a simple interview — using a React Mentor as an example.</p>

          <div className="grid md:grid-cols-2 gap-6 mt-14 items-start">
            <div className="flex flex-col gap-3" role="list" aria-label="Example interview questions">
              {[
                ['What\u2019s your current React experience level?', 'Intermediate — I know hooks but struggle with state architecture', true],
                ["What's your primary learning goal?", 'Build production apps, not just tutorials', false],
                ['How do you prefer to learn?', 'Give me real projects, not isolated exercises', false],
                ['What communication style works best for you?', 'Direct. No fluff. Short explanations, then show me.', false],
                ['What should the mentor never do?', 'Never give me full solutions without explanation', false],
                ['How much time can you commit per day?', 'I need focused, high-leverage sessions.', false],
              ].map(([q, a, active], i) => (
                <div key={i} role="listitem" className={`card p-4.5 ${active ? 'border-purple/40 bg-purple/5' : ''}`}>
                  <div className="text-[11px] text-dim font-medium mb-1.5 uppercase tracking-wide">Question {i + 1}</div>
                  <div className="text-sm text-textc mb-2.5">{q}</div>
                  <div className="bg-white/[0.04] border border-border rounded-md px-3 py-2 text-[13px] text-muted flex items-center justify-between">
                    <span>{a}</span>
                    <span className="text-teal text-xs" aria-hidden="true">✓</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="md:sticky md:top-20">
              <div className="card p-6 relative overflow-hidden" style={{ borderColor: 'rgba(45,212,168,0.2)' }}>
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(45,212,168,0.5),transparent)' }} />
                <div className="flex items-center justify-between mb-4.5">
                  <div className="font-display text-[15px] font-semibold">Generated Prompt</div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="bg-white/[0.06] border border-border text-dim text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 hover:text-textc hover:bg-white/[0.09] transition-all"
                      style={copied ? { color: 'var(--teal)', borderColor: 'rgba(45,212,168,0.3)' } : undefined}
                    >
                      {copied ? <>✓ Copied!</> : <>📋 Copy</>}
                    </button>
                    <button className="bg-white/[0.06] border border-border text-dim text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 hover:text-textc hover:bg-white/[0.09] transition-all">🔀 v3</button>
                  </div>
                </div>
                <div className="bg-black/25 border border-border rounded-[10px] p-4 font-mono text-[12.5px] text-muted leading-[1.7] mb-4.5 max-h-[220px] overflow-y-auto whitespace-pre-wrap">
                  <span className="text-purple-b">You are an expert React mentor</span>{' '}with 10+ years of production experience.
                  {'\n\n'}<span className="text-purple-b">Teaching philosophy:</span>
                  {'\n'}<span className="text-teal">— Project-based learning only.</span> Assign real problems.
                  {'\n'}<span className="text-teal">— Never skip the “why”.</span> Explain reasoning before code.
                  {'\n'}<span className="text-teal">— Adaptive difficulty.</span> Assess and adjust each session.
                  {'\n\n'}<span className="text-purple-b">Communication rules:</span>
                  {'\n'}<span className="text-teal">— Direct and concise.</span> No padding. No over-explaining.
                  {'\n'}<span className="text-teal">— Code first</span> when the question is implementation.
                  {'\n'}<span className="text-teal">— Theory first</span> when it’s conceptual.
                  {'\n\n'}<span className="text-purple-b">Constraints:</span>
                  {'\n'}<span className="text-teal">— Never give full solutions</span> without guiding first.
                  {'\n'}<span className="text-teal">— Always explain trade-offs</span> between approaches.
                  {'\n'}<span className="text-teal">— 1–2 hour session scope.</span> Keep responses focused.
                  {'\n\n'}<span className="text-purple-b">User context:</span>
                  {'\n'}Intermediate React. Struggles with state architecture.
                  {'\n'}Goal: production-level React applications.
                </div>
                <div className="flex items-center gap-3 mb-3.5">
                  <ScoreRingInline score={9.1} />
                  <div>
                    <div className="text-sm font-semibold">Excellent quality</div>
                    <div className="text-xs text-dim">Context, constraints &amp; style all defined</div>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {['Behavior defined', 'Constraints set', 'Style matched', 'Goal clear'].map((t) => (
                    <span key={t} className="text-[11px] font-medium bg-teal-dim border border-teal/15 text-teal rounded-md px-2.5 py-0.5">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[100px] px-6 text-center relative overflow-hidden" aria-label="Call to action">
        <div className="ambient-glow" style={{ width: 500, height: 300, background: 'rgba(124,111,224,0.1)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div className="max-w-[760px] mx-auto card relative overflow-hidden p-12 sm:p-16" role="region" aria-label="Sign up call to action" style={{ borderColor: 'rgba(124,111,224,0.2)' }}>
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(124,111,224,0.7),rgba(45,212,168,0.5),transparent)' }} />
          <div className="ambient-glow" style={{ width: 300, height: 300, background: 'rgba(45,212,168,0.06)', top: -60, right: -60 }} />
          <h2 className="font-display font-bold leading-[1.1] tracking-tight mb-4" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>
            Stop rewriting prompts.<br />Start building personas.
          </h2>
          <p className="text-base text-muted max-w-[480px] mx-auto mb-9 leading-[1.7]">
            Build your first persona in under two minutes. No credit card. No setup. Works immediately in any AI platform.
          </p>
          <div className="flex justify-center gap-3.5 flex-wrap">
            <Link to="/register" className="flex items-center gap-2 bg-purple text-white text-[15px] font-medium px-7 py-3.5 rounded-[10px] no-underline shadow-[0_4px_24px_rgba(124,111,224,0.35)] hover:bg-purple-b hover:-translate-y-0.5 transition-all">
              Create your first persona <span aria-hidden="true">→</span>
            </Link>
            <Link to="/templates" className="flex items-center gap-2 bg-white/[0.04] border border-borderH text-muted text-[15px] px-6 py-3.5 rounded-[10px] no-underline hover:bg-white/[0.07] hover:text-textc transition-all">
              Explore templates
            </Link>
          </div>
          <p className="text-xs text-dim mt-4">Free to start · No credit card · Exports to any AI platform</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10 px-6" aria-label="Site footer">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between flex-wrap gap-5">
          <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-lg text-textc no-underline" aria-label="PersonaForge homepage">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: 'linear-gradient(135deg,#7C6FE0,#2DD4A8)' }} aria-hidden="true">⚡</div>
            PersonaForge
          </Link>
          <nav aria-label="Footer navigation">
            <div className="flex gap-6">
              {['Features', 'Templates', 'Docs', 'GitHub'].map((l) => (
                <a key={l} href="#" className="text-[13px] text-dim no-underline hover:text-muted transition-colors">{l}</a>
              ))}
            </div>
          </nav>
          <span className="text-[13px] text-dim">© 2025 PersonaForge AI</span>
        </div>
      </footer>
    </div>
  );
}

function ScoreRingInline({ score }) {
  const size = 56, stroke = 4, radius = (size - stroke) / 2, circ = 2 * Math.PI * radius;
  const offset = circ * (1 - score / 10);
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }} aria-hidden="true">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute top-0 left-0">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#2DD4A8" strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      </svg>
      <span className="font-display text-[15px] font-bold text-teal relative z-10">{score}</span>
    </div>
  );
}
