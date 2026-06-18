import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../components/ui/Toast';
import { currentUser, personas } from '../data/mockData';

const tabs = ['personas', 'activity', 'about'];

const activityFeed = [
  { icon: '✦', bg: 'rgba(124,111,224,0.12)', title: 'React Mentor updated to v3', sub: 'Added memory instructions and session recap. Score improved to 9.1.', time: '2d ago' },
  { icon: '📋', bg: 'rgba(45,212,168,0.10)', title: 'System Design Coach prompt copied', sub: 'Used in Claude — v4 prompt.', time: '3d ago' },
  { icon: '✦', bg: 'rgba(45,212,168,0.10)', title: 'DSA Mentor created — v2', sub: 'Score 8.8. Refined hint strategy and pattern-recognition rules.', time: '5d ago' },
  { icon: '⭐', bg: 'rgba(224,136,111,0.12)', title: 'System Design Coach reached 9.4 / 10', sub: 'Highest scoring persona in library. CAP theorem rules added in v4.', time: '1w ago' },
  { icon: '💡', bg: 'rgba(111,212,224,0.12)', title: '3 suggestions applied to English Mentor', sub: 'Added learning style, memory rules, and correction tracking. Score: 7.6 → 8.2.', time: '1w ago' },
  { icon: '🏆', bg: 'rgba(255,180,50,0.1)', title: 'Joined PersonaForge', sub: 'First persona created: React Mentor v1 (score: 7.2).', time: 'Nov 2024' },
];

export default function Profile() {
  const navigate = useNavigate();
  const showToast = useToast();
  const [tab, setTab] = useState('personas');

  const showcase = personas.filter((p) => !p.archived).slice(0, 4);

  const copyLink = () => {
    navigator.clipboard.writeText('https://personaforge.ai/u/arjun').catch(() => {});
    showToast('Profile link copied');
  };

  const applyPersona = (name) => {
    showToast(`${name} added to builder`);
    setTimeout(() => navigate('/persona/new'), 1200);
  };

  return (
    <div className="bg-bg text-textc font-sans min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 h-[60px] border-b border-border bg-[rgba(10,10,15,0.88)] backdrop-blur-lg flex items-center px-6 gap-3.5">
        <Link to="/" className="flex items-center gap-2.5 no-underline text-textc font-display font-bold text-base">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[13px]" style={{ background: 'linear-gradient(135deg,#7C6FE0,#2DD4A8)' }}>⚡</div>
          PersonaForge
        </Link>
        <div className="ml-auto flex items-center gap-2.5">
          <Link to="/dashboard" className="btn-outline">Dashboard</Link>
          <Link to="/settings" className="btn-outline">⚙ Settings</Link>
          <Link to="/persona/new" className="btn-primary no-underline">+ New Persona</Link>
        </div>
      </header>

      <div className="pt-[60px] max-w-[900px] mx-auto px-6 pb-20">
        {/* Cover */}
        <div className="h-40 -mx-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg,rgba(124,111,224,0.18) 0%,rgba(45,212,168,0.1) 50%,rgba(10,10,15,0) 100%)' }} role="img" aria-label="Profile cover" />

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5 -mt-11 sm:-mt-11 mb-6 relative z-10">
          <div className="relative flex-shrink-0">
            <div className="w-[88px] h-[88px] rounded-[20px] flex items-center justify-center font-display text-3xl font-bold border-4 border-bg" style={{ background: 'linear-gradient(135deg,#7C6FE0,#2DD4A8)' }} aria-label="Arjun Kumar avatar">
              {currentUser.initials}
            </div>
            <div className="absolute -bottom-1 -right-1 w-[22px] h-[22px] rounded-md bg-teal border-2 border-bg flex items-center justify-center text-[11px]" title="Verified account" aria-label="Verified">✓</div>
          </div>
          <div className="flex-1 min-w-0 pb-1.5">
            <h1 className="font-display text-[22px] font-bold tracking-tight mb-1">{currentUser.name}</h1>
            <div className="text-[13px] text-dim mb-2">{currentUser.handle} · personaforge.ai/u/arjun</div>
            <p className="text-[13px] text-muted leading-relaxed max-w-[480px]">{currentUser.bio}</p>
          </div>
          <div className="flex-shrink-0 pb-1.5 flex gap-2 flex-wrap w-full sm:w-auto">
            <Link to="/settings" className="btn-outline flex-1 sm:flex-none justify-center" aria-label="Edit profile">✏️ Edit Profile</Link>
            <button onClick={copyLink} className="btn-outline flex-1 sm:flex-none justify-center" aria-label="Share profile link">↗ Share</button>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-5 flex-wrap mb-7 pb-6 border-b border-border" role="list" aria-label="Profile details">
          <MetaItem icon="📍" text={currentUser.location} />
          <MetaItem icon="💼" text={currentUser.occupation} />
          <MetaItem icon="📅" text={`Joined ${currentUser.joined}`} />
          <div className="flex items-center gap-1.5 text-[13px] text-dim" role="listitem">
            <span aria-hidden="true">🔗</span>
            <a href="#" className="text-purple-b no-underline">{currentUser.github}</a>
          </div>
        </div>

        {/* Own profile bar */}
        <div className="rounded-xl p-3.5 px-4.5 flex items-center justify-between gap-3.5 flex-wrap mb-6" style={{ background: 'rgba(124,111,224,0.06)', border: '1px solid rgba(124,111,224,0.15)' }} role="region" aria-label="Share your profile">
          <div className="text-[13px] text-muted">Share your persona library with others → they can browse and use your public personas.</div>
          <button onClick={copyLink} className="text-xs text-dim bg-card2 border border-border px-3.5 py-1.5 rounded-lg font-mono cursor-pointer hover:border-borderH hover:text-muted transition-all">personaforge.ai/u/arjun</button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8" role="region" aria-label="Profile statistics">
          {[['8', 'Personas'], ['8.6', 'Avg Score', 'var(--teal)'], ['24', 'Versions'], ['142', 'Prompts Used']].map(([val, label, color]) => (
            <div key={label} className="card p-4.5 text-center hover:border-borderH">
              <div className="font-display text-[26px] font-bold mb-1" style={{ color }}>{val}</div>
              <div className="text-[11px] text-dim uppercase tracking-wide">{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-0.5 border-b border-border mb-6" role="tablist" aria-label="Profile tabs">
          {tabs.map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`px-4.5 py-2.5 text-[13px] font-medium bg-transparent border-none border-b-2 -mb-px cursor-pointer transition-all capitalize ${tab === t ? 'text-purple-b border-purple' : 'text-dim border-transparent hover:text-muted'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Tab: Personas */}
        {tab === 'personas' && (
          <div className="animate-fadeIn">
            <div className="grid sm:grid-cols-2 gap-3.5" role="list" aria-label="Persona showcase">
              {showcase.map((p) => (
                <div key={p.id} role="listitem" tabIndex={0} className="card p-5 cursor-pointer hover:-translate-y-0.5" aria-label={`${p.name} persona`}>
                  <div className="flex items-center gap-3 mb-3.5">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style={{ background: p.iconBg }}>{p.icon}</div>
                    <div>
                      <div className="font-display text-sm font-semibold">{p.name}</div>
                      <div className="text-xs text-dim">{p.role}</div>
                    </div>
                  </div>
                  <p className="text-[13px] text-muted leading-relaxed mb-3.5">{p.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[13px] font-semibold" style={{ color: p.best ? '#FFB432' : 'var(--teal)' }}>⭐ {p.score}</span>
                      <span className="tag text-[10px]">{p.version}</span>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); applyPersona(p.name); }} className="text-[11px] font-medium tag-purple rounded-md px-2.5 py-1 hover:bg-purple/[0.18] transition-colors">Use →</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-5">
              <Link to="/personas" className="text-[13px] text-dim no-underline px-5 py-2.5 border border-border rounded-lg inline-block hover:text-muted hover:border-borderH transition-all">
                View all {personas.length} personas →
              </Link>
            </div>
          </div>
        )}

        {/* Tab: Activity */}
        {tab === 'activity' && (
          <div className="animate-fadeIn" role="list">
            {activityFeed.map((a, i) => (
              <div key={i} className="flex items-start gap-3.5 py-4 border-b border-border last:border-0" role="listitem">
                <div className="w-[34px] h-[34px] rounded-lg flex items-center justify-center text-sm flex-shrink-0" style={{ background: a.bg }}>{a.icon}</div>
                <div className="flex-1">
                  <div className="text-[13px] text-textc mb-0.5"><strong>{a.title}</strong></div>
                  <div className="text-xs text-dim">{a.sub}</div>
                </div>
                <div className="text-[11px] text-dim flex-shrink-0 mt-0.5">{a.time}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tab: About */}
        {tab === 'about' && (
          <div className="animate-fadeIn grid sm:grid-cols-2 gap-5">
            <div className="card p-5">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-dim mb-3.5">Details</div>
              <div className="flex flex-col gap-2.5">
                {[['Full name', currentUser.name], ['Occupation', currentUser.occupation], ['Location', currentUser.location], ['Member since', currentUser.joined], ['Plan', currentUser.plan]].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-[13px] pb-2.5 border-b border-border last:border-0 last:pb-0">
                    <span className="text-dim">{k}</span>
                    <span className="text-muted font-medium" style={k === 'Plan' ? { color: 'var(--purple-b)' } : undefined}>{v}</span>
                  </div>
                ))}
                <div className="flex justify-between text-[13px]"><span className="text-dim">GitHub</span><a href="#" className="text-purple-b no-underline font-medium">{currentUser.github}</a></div>
              </div>
            </div>
            <div className="card p-5">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-dim mb-3.5">Focus Areas</div>
              <div className="flex flex-wrap gap-1.5" role="list" aria-label="Skills and interests">
                {['React', 'Spring Boot', 'System Design', 'Java', 'DSA', 'Full-stack', 'AI / Prompting', 'REST APIs'].map((s) => (
                  <span key={s} className="text-xs font-medium bg-purple/[0.08] border border-purple/[0.18] text-purple-b rounded-lg px-2.5 py-1" role="listitem">{s}</span>
                ))}
              </div>
            </div>
            <div className="card p-5 sm:col-span-2">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-dim mb-3.5">Library Summary</div>
              <div className="flex flex-col gap-2.5">
                {[
                  ['Total personas', '8 (6 active, 2 archived)'],
                  ['Total prompt versions', '24'],
                  ['Average score', '8.6 / 10', 'var(--teal)'],
                  ['Highest scoring persona', 'System Design Coach — 9.4'],
                  ['Most used', 'React Mentor (v3)'],
                  ['Preferred AI platform', 'Claude'],
                ].map(([k, v, color]) => (
                  <div key={k} className="flex justify-between text-[13px] pb-2.5 border-b border-border last:border-0 last:pb-0">
                    <span className="text-dim">{k}</span>
                    <span className="text-muted font-medium" style={{ color }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MetaItem({ icon, text }) {
  return (
    <div className="flex items-center gap-1.5 text-[13px] text-dim" role="listitem">
      <span aria-hidden="true">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
