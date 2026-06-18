import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import { useToast } from '../components/ui/Toast';

const historyData = [
  {
    month: 'January 2025',
    items: [
      {
        id: 'react-v3', persona: 'react', icon: '⚛️', bg: 'rgba(124,111,224,0.15)', name: 'React Mentor', version: 'v3',
        sub: 'Added memory instructions, session recap · Persona updated', score: 9.1, diff: '+0.4', diffType: 'up', time: 'Jan 8',
        prompt: `You are an expert React mentor with 10+ years of production experience.

Teaching philosophy:
— Project-based learning only. Real problems, real code.
— Never skip the "why". Explain reasoning before implementation.
— Adaptive difficulty. Increase complexity as user improves.

Memory Instructions:
Track topics covered. End each session with a 3-bullet recap.`,
        tags: ['Memory rules added', 'Session recap', 'Constraints refined'],
      },
      {
        id: 'dsa-v2', persona: 'dsa', icon: '🧮', bg: 'rgba(45,212,168,0.12)', name: 'DSA Mentor', version: 'v2',
        sub: 'Refined hint strategy · Added pattern-recognition rules', score: 8.8, diff: '+0.6', diffType: 'up', time: 'Jan 5',
        prompt: `You are a DSA coach specializing in patterns over brute force.

— Hints before solutions. Never give full code on first ask.
— Pattern-first thinking. Identify the pattern type before solving.
— Track weak spots. Note topics the user struggles with and revisit.`,
        tags: ['Hint strategy', 'Pattern rules'],
      },
    ],
  },
  {
    month: 'December 2024',
    items: [
      {
        id: 'react-v2', persona: 'react', icon: '⚛️', bg: 'rgba(124,111,224,0.15)', name: 'React Mentor', version: 'v2',
        sub: 'Added user context, teaching philosophy bullets', score: 8.7, diff: '+1.5', diffType: 'up', time: 'Dec 12',
        prompt: `You are an expert React mentor.

User context: Intermediate. Struggles with state management.
Goal: Build production-grade React apps.

— Direct communication. No filler text.
— Code-first for implementation. Concept-first for architecture.`,
        tags: ['User context added', 'Teaching philosophy'],
      },
      {
        id: 'sysdesign-v4', persona: 'sysdesign', icon: '🏗️', bg: 'rgba(224,136,111,0.12)', name: 'System Design Coach', version: 'v4',
        sub: 'Best scoring prompt in your library · CAP theorem rules added', score: 9.4, diff: '+0.3', diffType: 'up', time: 'Dec 8', best: true,
        prompt: `You are a Principal Engineer specializing in system design.

— Always ask clarifying questions first.
— Present trade-offs before making any recommendation.
— Scale thinking: Design for 100x growth from day one.
— CAP theorem: Always discuss consistency/availability trade-offs for DB choices.`,
        tags: ['CAP theorem rules', 'Scale focus', 'Trade-off framework'],
      },
      {
        id: 'english-v1', persona: 'english', icon: '💬', bg: 'rgba(111,212,224,0.12)', name: 'English Mentor', version: 'v1',
        sub: 'Initial creation · Natural correction style', score: 8.2, diff: 'New', diffType: 'neutral', time: 'Dec 2',
        prompt: `You are an English communication coach.

— Correct naturally, without breaking the flow of conversation.
— Track recurring mistakes and gently revisit them.
— Never over-correct. Focus on the 1–2 most impactful issues per message.`,
        tags: ['Natural correction', 'Mistake tracking'],
      },
    ],
  },
  {
    month: 'November 2024',
    items: [
      {
        id: 'react-v1', persona: 'react', icon: '⚛️', bg: 'rgba(124,111,224,0.15)', name: 'React Mentor', version: 'v1',
        sub: 'First version · Initial creation from builder', score: 7.2, diff: 'New', diffType: 'neutral', time: 'Nov 28',
        prompt: `You are a React mentor. Help me learn React effectively.
Teach using examples. Be clear and concise.`,
        tags: ['Initial version'],
        footnote: 'Score improved from 7.2 → 9.1 over 3 versions',
      },
      {
        id: 'sysdesign-v1', persona: 'sysdesign', icon: '🏗️', bg: 'rgba(224,136,111,0.12)', name: 'System Design Coach', version: 'v1',
        sub: 'Initial creation', score: 7.8, diff: 'New', diffType: 'neutral', time: 'Nov 20',
        prompt: `You are a system design expert.
Help me prepare for system design interviews. Focus on scalability.`,
        tags: ['Initial version'],
        footnote: 'Score improved from 7.8 → 9.4 over 4 versions',
      },
    ],
  },
];

const personaFilters = [
  ['all', 'All'], ['react', 'React Mentor'], ['dsa', 'DSA Mentor'], ['sysdesign', 'System Design'], ['english', 'English Mentor'],
];

export default function History() {
  const navigate = useNavigate();
  const showToast = useToast();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(new Set());

  const toggle = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const copyPrompt = (text, name) => {
    navigator.clipboard.writeText(text).catch(() => {});
    showToast(`${name} prompt copied`);
  };

  const filteredData = useMemo(() => {
    return historyData
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          const matchFilter = filter === 'all' || item.persona === filter;
          const matchQuery = !query || `${item.name} ${item.sub} ${item.prompt}`.toLowerCase().includes(query.toLowerCase());
          return matchFilter && matchQuery;
        }),
      }))
      .filter((g) => g.items.length > 0);
  }, [filter, query]);

  return (
    <AppShell title="Prompt History" showSearch onSearch={setQuery}>
      <div className="px-7 pt-4.5 pb-4 border-b border-border flex items-center gap-3 flex-wrap">
        <div className="flex gap-1.5 flex-wrap" role="group" aria-label="Filter by persona">
          {personaFilters.map(([id, label]) => (
            <button
              key={id} onClick={() => setFilter(id)} aria-pressed={filter === id}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                filter === id ? 'bg-purple/[0.12] border border-purple/30 text-purple-b' : 'bg-white/[0.04] border border-border text-muted hover:border-purple/30 hover:text-purple-b'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <select className="bg-card border border-border text-muted text-xs px-3 py-1.5 rounded-lg cursor-pointer outline-none ml-auto" aria-label="Sort history">
          <option>Newest first</option><option>Highest score</option><option>Oldest first</option><option>Lowest score</option>
        </select>
      </div>

      <div className="p-7 pb-16">
        {/* Stats strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6" role="region" aria-label="History statistics">
          {[['Total Versions', '24', 'Across 8 personas'], ['Avg Score', '8.6', '+0.4 from first batch', 'var(--teal)'], ['Best Prompt', '9.4', 'System Design Coach v4'], ['This Month', '7', 'New versions created']].map(([label, val, sub, color]) => (
            <div key={label} className="card p-4.5">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-dim mb-2">{label}</div>
              <div className="font-display text-2xl font-bold" style={{ color }}>{val}</div>
              <div className="text-[11px] text-dim mt-0.5">{sub}</div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-16 text-dim text-sm">No history items match your filters.</div>
        )}

        {filteredData.map((group) => (
          <div key={group.month} className="mb-7">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-dim mb-3 flex items-center gap-2.5">
              {group.month}
              <span className="flex-1 h-px bg-border" />
            </div>
            {group.items.map((item) => {
              const isOpen = expanded.has(item.id);
              return (
                <div key={item.id} className="card mb-2.5 overflow-hidden">
                  <div
                    onClick={() => toggle(item.id)}
                    onKeyDown={(e) => e.key === 'Enter' && toggle(item.id)}
                    role="button" tabIndex={0} aria-expanded={isOpen}
                    className="flex items-center gap-3.5 px-5 py-4 cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0" style={{ background: item.bg }}>{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-textc truncate">{item.name} — {item.version}</div>
                      <div className="text-xs text-dim">{item.sub}</div>
                    </div>
                    <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                      <span
                        className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                        style={item.diffType === 'up' ? { background: 'rgba(45,212,168,0.1)', color: 'var(--teal)', border: '1px solid rgba(45,212,168,0.2)' } : { background: 'rgba(255,255,255,0.05)', color: 'var(--dim)', border: '1px solid var(--border)' }}
                      >
                        {item.diffType === 'up' ? `↑ ${item.diff}` : item.diff}
                      </span>
                      <span className="font-display text-[13px] font-semibold" style={{ color: item.best ? '#FFB432' : 'var(--teal)' }}>{item.score}</span>
                      <span className="text-[11px] text-dim bg-white/5 border border-border rounded px-1.5 py-0.5">{item.version}</span>
                      <span className="text-[11px] text-dim">{item.time}</span>
                      <div className="flex gap-1.5">
                        <button onClick={(e) => { e.stopPropagation(); copyPrompt(item.prompt, item.name); }} className="text-[11px] tag-purple px-2.5 py-1 rounded-md hover:bg-purple/[0.18] transition-colors">Copy</button>
                        <button onClick={(e) => { e.stopPropagation(); navigate(`/persona/${item.persona}-mentor`); }} className="text-[11px] text-dim border border-border px-2.5 py-1 rounded-md hover:text-muted hover:border-borderH transition-all">View</button>
                      </div>
                    </div>
                    <span className={`text-dim text-sm transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true">▾</span>
                  </div>
                  {isOpen && (
                    <div className="px-5 pb-4.5 border-t border-border animate-fadeIn">
                      <div className="bg-[#0D0D14] border border-border rounded-[10px] p-4 font-mono text-xs text-muted leading-relaxed my-3.5 max-h-[180px] overflow-y-auto whitespace-pre-wrap" tabIndex={0}>
                        {item.prompt}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {item.tags.map((t) => <span key={t} className="tag text-[10px]">{t}</span>)}
                        {item.footnote && <span className="text-[11px] text-dim">{item.footnote}</span>}
                        <button onClick={() => copyPrompt(item.prompt, item.name)} className="text-[11px] tag-purple px-2.5 py-1.5 rounded-md hover:bg-purple/[0.18] transition-colors ml-auto">📋 Copy prompt</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </AppShell>
  );
}
