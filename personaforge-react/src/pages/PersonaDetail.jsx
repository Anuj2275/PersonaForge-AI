import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ScoreRing from '../components/ui/ScoreRing';
import { useToast } from '../components/ui/Toast';
import { promptVersions, scoreBreakdown, suggestions } from '../data/mockData';

const tabs = [
  { id: 'prompt', label: 'Prompt' },
  { id: 'score', label: 'Score Analysis' },
  { id: 'suggestions', label: 'Suggestions', badge: 2 },
  { id: 'versions', label: 'Version History' },
];

export default function PersonaDetail() {
  useParams(); // route param reserved for future API lookup by persona id
  const navigate = useNavigate();
  const showToast = useToast();
  const [activeTab, setActiveTab] = useState('prompt');
  const [versionIdx, setVersionIdx] = useState(0);

  // Fallback to react-mentor data set regardless of id for this static demo
  const versions = promptVersions['react-mentor'];
  const current = versions[versionIdx];

  const copyPrompt = () => {
    navigator.clipboard.writeText(current.prompt).catch(() => {});
    showToast('Prompt copied to clipboard');
  };

  return (
    <div className="bg-bg text-textc font-sans min-h-screen">
      {/* TOPBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 h-[60px] border-b border-border bg-[rgba(10,10,15,0.9)] backdrop-blur-lg flex items-center px-4 sm:px-6 gap-2.5">
        <button onClick={() => navigate('/personas')} className="bg-transparent border-none text-dim cursor-pointer p-1" aria-label="Back to My Personas">←</button>
        <nav className="flex items-center gap-2 text-[13px] text-dim" aria-label="Breadcrumb">
          <span>My Personas</span>
          <span className="opacity-40">/</span>
          <span className="text-muted font-medium">React Mentor</span>
        </nav>
        <div className="ml-auto flex gap-2">
          <button onClick={() => navigate('/persona/new')} className="btn-outline" aria-label="Edit persona">
            <span aria-hidden="true">✏️</span> <span className="hidden sm:inline">Edit</span>
          </button>
          <button className="btn-outline" aria-label="Share persona">
            <span aria-hidden="true">↗</span> <span className="hidden sm:inline">Share</span>
          </button>
          <button onClick={copyPrompt} className="flex items-center gap-1.5 bg-purple text-white text-[13px] font-medium border-none px-4.5 py-2.5 rounded-lg cursor-pointer shadow-purpleGlow hover:bg-purple-b transition-all" aria-label="Copy prompt to clipboard">
            <span aria-hidden="true">📋</span> Copy Prompt
          </button>
        </div>
      </header>

      <div className="pt-[60px] grid lg:grid-cols-[1fr_360px] min-h-screen">
        {/* MAIN */}
        <main className="p-6 sm:p-10 pb-20 border-r border-border lg:border-r">
          {/* Persona Hero */}
          <div className="flex flex-col sm:flex-row items-start gap-5 mb-8 pb-7 border-b border-border">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[26px] flex-shrink-0 border" style={{ background: 'linear-gradient(135deg,rgba(124,111,224,0.3),rgba(45,212,168,0.2))', borderColor: 'rgba(124,111,224,0.2)' }} aria-hidden="true">⚛️</div>
            <div className="flex-1 min-w-0">
              <h1 className="font-display text-2xl font-bold tracking-tight mb-1">React Mentor</h1>
              <div className="text-sm text-muted mb-3">Senior Frontend Engineer · Project-based teaching</div>
              <div className="flex gap-1.5 flex-wrap">
                <span className="text-[11px] font-medium rounded-md px-2.5 py-1 tag-purple">Adaptive difficulty</span>
                <span className="text-[11px] font-medium rounded-md px-2.5 py-1 tag-teal">Direct communication</span>
                <span className="tag text-[11px] px-2.5 py-1">Hands-on</span>
                <span className="tag text-[11px] px-2.5 py-1">{current.version} · Current</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0 self-center sm:self-auto">
              <div className="flex justify-end mb-1"><ScoreRing score={current.score} size={64} stroke={5} /></div>
              <div className="text-xs text-dim">Prompt quality</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-0.5 border-b border-border mb-7 overflow-x-auto" role="tablist" aria-label="Persona details tabs">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={activeTab === t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4.5 py-2.5 text-[13px] font-medium bg-transparent border-none border-b-2 -mb-px cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === t.id ? 'text-purple-b border-purple' : 'text-dim border-transparent hover:text-muted'
                }`}
              >
                {t.label}
                {t.badge && <span className="bg-purple/20 text-purple-b text-[10px] px-1.5 py-0.5 rounded ml-1">{t.badge}</span>}
              </button>
            ))}
          </div>

          {/* TAB: Prompt */}
          {activeTab === 'prompt' && (
            <div className="animate-fadeIn">
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <select
                    value={versionIdx}
                    onChange={(e) => setVersionIdx(Number(e.target.value))}
                    aria-label="Select prompt version"
                    className="bg-card border border-border text-muted text-xs px-2.5 py-1.5 rounded-lg cursor-pointer outline-none focus:border-purple/40"
                  >
                    {versions.map((v, i) => (
                      <option key={v.version} value={i}>{v.version} — {v.current ? 'Current' : v.date}</option>
                    ))}
                  </select>
                  <span className="text-[11px] text-dim">Updated {versions[0].date}</span>
                </div>
                <div className="flex gap-1.5">
                  <ToolbarBtn onClick={copyPrompt} icon="📋" label="Copy" />
                  <ToolbarBtn icon="↓" label="Export" />
                  <ToolbarBtn onClick={() => navigate('/persona/new')} icon="✏️" label="Edit & Regenerate" primary />
                </div>
              </div>

              <div className="bg-[#0D0D14] border border-border rounded-xl p-6 font-mono text-[13px] leading-[1.8] text-muted whitespace-pre-wrap break-words mb-5" tabIndex={0} role="region" aria-label="Generated system prompt">
                <PromptHighlight text={current.prompt} />
              </div>

              <div className="flex gap-2 flex-wrap pt-1">
                <span className="text-[11px] text-dim">Use this prompt as the system message in:</span>
                <span className="text-[11px] text-muted">ChatGPT → Settings → Custom Instructions</span>
                <span className="text-[11px] text-dim">·</span>
                <span className="text-[11px] text-muted">Claude → Start of conversation</span>
              </div>
            </div>
          )}

          {/* TAB: Score */}
          {activeTab === 'score' && (
            <div className="animate-fadeIn">
              <div className="grid sm:grid-cols-2 gap-5 mb-7">
                <div className="card p-6 text-center" style={{ borderColor: 'rgba(45,212,168,0.2)' }}>
                  <div className="font-display text-5xl font-bold text-teal leading-none" aria-label={`Overall score: ${current.score} out of 10`}>{current.score}</div>
                  <div className="text-[13px] text-muted mt-1.5">Overall Quality</div>
                  <div className="text-[11px] text-dim mt-1">Excellent — top 15% of personas</div>
                </div>
                <div className="card p-6">
                  <div className="text-[11px] text-dim uppercase tracking-wide font-semibold mb-3">Score history</div>
                  <div className="flex flex-col gap-2">
                    {versions.slice().reverse().map((v) => (
                      <div key={v.version} className="flex items-center justify-between text-[13px]">
                        <span className={v.current ? 'text-teal' : 'text-dim'}>{v.version} · {v.date.split(',')[0]}{v.current ? ' — current' : ''}</span>
                        <span className={`font-display font-semibold ${v.current ? 'text-teal font-bold' : 'text-muted'}`}>{v.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-[13px] font-medium text-muted mb-4">Score breakdown</div>
              <div className="flex flex-col gap-3.5" role="list" aria-label="Score breakdown by category">
                {scoreBreakdown.map((s) => (
                  <div key={s.label} className="flex items-center gap-3.5" role="listitem">
                    <div className="text-[13px] text-muted w-40 flex-shrink-0">{s.label}</div>
                    <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${s.value * 10}%`, background: s.color === 'teal' ? 'var(--teal)' : s.color === 'purple' ? 'var(--purple)' : 'rgba(224,136,111,0.8)' }}
                      />
                    </div>
                    <div className="text-[13px] font-semibold w-10 text-right" aria-label={s.value}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Suggestions */}
          {activeTab === 'suggestions' && (
            <div className="animate-fadeIn">
              <p className="text-[13px] text-muted mb-5 leading-relaxed">
                These additions would push your prompt score above 9.5. Each suggestion is specific and actionable.
              </p>
              <div className="flex flex-col gap-3" role="list" aria-label="Improvement suggestions">
                {suggestions.map((s) => (
                  <div key={s.id} className={`flex items-start gap-3 card p-4 ${s.resolved ? 'opacity-50' : ''}`} role="listitem">
                    <span className="text-base flex-shrink-0 mt-0.5">{s.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className={`text-[13px] font-medium mb-1 ${s.resolved ? 'line-through' : 'text-textc'}`}>{s.title}</div>
                      <div className="text-xs text-dim leading-relaxed">{s.desc}</div>
                    </div>
                    <div className="flex-shrink-0">
                      {s.resolved
                        ? <span className="text-[11px] text-teal">Done</span>
                        : <button className="text-[11px] font-medium tag-purple rounded-md px-2.5 py-1 hover:bg-purple/[0.18] transition-colors" aria-label={`Apply: ${s.title}`}>Apply →</button>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Versions */}
          {activeTab === 'versions' && (
            <div className="animate-fadeIn flex flex-col" role="list" aria-label="Prompt version history">
              {versions.map((v, i) => (
                <div key={v.version} className="flex items-start gap-3.5 py-4.5 border-b border-border last:border-0" role="listitem">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg flex-shrink-0 font-display ${v.current ? 'bg-teal-dim border border-teal/20 text-teal' : 'tag-purple'}`}>
                    {v.version}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-dim mb-1">{v.date}{v.current ? ' · Current version' : ''}</div>
                    <div className="text-[13px] text-muted">{v.note}</div>
                    <div className="flex gap-1.5 flex-wrap mt-2">
                      {v.changes.map((c) => <span key={c} className="tag text-[10px]">{c}</span>)}
                    </div>
                    {!v.current && (
                      <div className="flex gap-1.5 mt-2">
                        <button onClick={() => { setVersionIdx(i); setActiveTab('prompt'); }} className="text-[11px] text-dim border border-border px-2.5 py-1 rounded-md cursor-pointer hover:text-muted hover:border-borderH transition-all bg-transparent">View</button>
                        <button className="text-[11px] text-dim border border-border px-2.5 py-1 rounded-md cursor-pointer hover:text-muted hover:border-borderH transition-all bg-transparent">Restore</button>
                      </div>
                    )}
                  </div>
                  <div className="font-display text-sm font-semibold text-teal flex-shrink-0">{v.score}</div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* ASIDE */}
        <aside className="p-6 pb-10 overflow-y-auto" aria-label="Persona details and actions">
          <AsideSection title="Persona details">
            <div className="flex flex-col gap-2.5">
              {[
                ['Category', 'Mentor'], ['Domain', 'React · Frontend'], ['Skill level', 'Intermediate'],
                ['Teaching style', 'Project-based'], ['Communication', 'Direct'], ['Difficulty', 'Adaptive'],
                ['Session length', '1–2 hours'], ['Memory', 'Track progress + recap'],
                ['Created', 'Nov 28, 2024'], ['Versions', String(versions.length)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-start pb-2.5 border-b border-border last:border-0 last:pb-0">
                  <span className="text-xs text-dim">{k}</span>
                  <span className="text-xs text-muted font-medium text-right max-w-[150px]">{v}</span>
                </div>
              ))}
            </div>
          </AsideSection>

          <AsideSection title="Use in">
            <div className="flex flex-col gap-2">
              {[['🤖', 'ChatGPT'], ['🧠', 'Claude'], ['✨', 'Gemini'], ['🔮', 'DeepSeek']].map(([icon, name]) => (
                <div key={name} tabIndex={0} onClick={copyPrompt} onKeyDown={(e) => e.key === 'Enter' && copyPrompt()} className="flex items-center gap-2.5 p-2.5 card cursor-pointer hover:border-purple/30" aria-label={`Use in ${name}`}>
                  <span className="text-base">{icon}</span>
                  <span className="text-[13px] font-medium">{name}</span>
                  <span className="ml-auto text-[11px] text-dim">Copy →</span>
                </div>
              ))}
            </div>
          </AsideSection>

          <AsideSection title="Actions">
            <div className="flex flex-col gap-2">
              <button onClick={() => navigate('/persona/new')} className="btn-outline w-full justify-start"><span>✏️</span> Edit &amp; Regenerate</button>
              <button className="btn-outline w-full justify-start"><span>⧉</span> Duplicate Persona</button>
              <button className="btn-outline w-full justify-start"><span>📦</span> Archive</button>
            </div>
          </AsideSection>

          <div className="border rounded-[10px] p-4" style={{ borderColor: 'rgba(255,80,80,0.15)' }} role="region" aria-label="Danger zone">
            <div className="text-[11px] font-semibold text-[#FF8080] uppercase tracking-wide mb-2.5">Danger zone</div>
            <button className="text-xs text-[#FF8080] w-full py-2 rounded-lg cursor-pointer transition-all hover:bg-[rgba(255,80,80,0.12)]" style={{ background: 'rgba(255,80,80,0.07)', border: '1px solid rgba(255,80,80,0.18)' }}>
              Delete persona
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ToolbarBtn({ onClick, icon, label, primary }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg cursor-pointer transition-all border ${
        primary ? 'bg-purple/10 border-purple/25 text-purple-b hover:bg-purple/[0.18]' : 'bg-card border-border text-dim hover:text-textc hover:border-borderH hover:bg-card2'
      }`}
    >
      <span aria-hidden="true">{icon}</span> {label}
    </button>
  );
}

function AsideSection({ title, children }) {
  return (
    <div className="mb-7">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-dim mb-3.5">{title}</div>
      {children}
    </div>
  );
}

function PromptHighlight({ text }) {
  // Lines starting with ## are headers (purple); lines starting with - are rules (teal)
  return text.split('\n').map((line, i) => {
    if (line.startsWith('##')) {
      return <div key={i} className="text-purple-b">{line}</div>;
    }
    if (line.trim().startsWith('-')) {
      const match = line.match(/^(\s*-\s*)([^.]+\.)(.*)$/);
      if (match) {
        return <div key={i}><span className="text-teal">{match[1]}{match[2]}</span>{match[3]}</div>;
      }
      return <div key={i} className="text-teal">{line}</div>;
    }
    if (line.startsWith('You are')) {
      const idx = line.indexOf(' with ');
      if (idx > -1) {
        return <div key={i}><span className="text-purple-b">{line.slice(0, idx)}</span>{line.slice(idx)}</div>;
      }
      return <div key={i} className="text-purple-b">{line}</div>;
    }
    return <div key={i}>{line || '\u00A0'}</div>;
  });
}
