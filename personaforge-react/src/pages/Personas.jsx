import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import PersonaCard from '../components/ui/PersonaCard';
import { useToast } from '../components/ui/Toast';
// import { personas as initialPersonas } from '../data/mockData';
import { getPersonas } from '../api/personaApi';
import { useEffect } from 'react';

const categoryFilters = [
  ['all', 'All'], ['mentor', 'Mentor'], ['coach', 'Coach'], ['advisor', 'Advisor'], ['archived', '📦 Archived'],
];

export default function Personas() {
  const navigate = useNavigate();
  const showToast = useToast();
  const [searchParams] = useSearchParams();
  // const [personas, setPersonas] = useState(initialPersonas);
  const [personas, setPersonas] = useState([]);
  const [view, setView] = useState('grid');
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState(searchParams.get('filter') === 'archived' ? 'archived' : 'all');
  const [showArchived, setShowArchived] = useState(cat === 'archived');

  const handleArchive = (id) => {
    setPersonas((ps) => ps.map((p) => (p.id === id ? { ...p, archived: true } : p)));
    showToast('Persona archived');
  };
  const handleUnarchive = (id) => {
    setPersonas((ps) => ps.map((p) => (p.id === id ? { ...p, archived: false } : p)));
    showToast('Persona unarchived and moved to active');
  };

  const active = personas.filter((p) => !p.archived);
  const archived = personas.filter((p) => p.archived);

  const filteredActive = useMemo(() => {
    return active.filter((p) => {
      const matchCat = cat === 'all' || cat === 'archived' || p.category === cat;
      const matchQ = !query || p.name.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQ;
    });
  }, [active, cat, query]);
useEffect(() => {

  const loadPersonas =
    async () => {

      try {

        const response =
          await getPersonas();

        setPersonas(
          response.data.content
        );

      } catch(error) {

        console.error(error);

      }
    };

  loadPersonas();

}, []);
  return (
    <AppShell title="My Personas">
      <div className="px-7 pt-4.5 pb-4 border-b border-border">
        <div className="flex items-center gap-3 flex-wrap mb-3.5">
          <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3.5 py-2 flex-1 max-w-[320px] focus-within:border-purple/40 transition-colors">
            <span className="text-dim text-[13px]">🔍</span>
            <input
              type="text" placeholder="Search personas..." aria-label="Search personas"
              value={query} onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-textc text-[13px] w-full placeholder:text-dim"
            />
          </div>
          <div className="flex bg-card border border-border rounded-lg p-[3px] gap-0.5" role="group" aria-label="View mode">
            <button onClick={() => setView('grid')} aria-label="Grid view" title="Grid view" className={`w-[30px] h-7 rounded-md text-sm transition-all ${view === 'grid' ? 'bg-purple/15 text-purple-b' : 'text-dim'}`}>⊞</button>
            <button onClick={() => setView('list')} aria-label="List view" title="List view" className={`w-[30px] h-7 rounded-md text-sm transition-all ${view === 'list' ? 'bg-purple/15 text-purple-b' : 'text-dim'}`}>≡</button>
          </div>
          <select className="bg-card border border-border text-muted text-xs px-3 py-2 rounded-lg cursor-pointer outline-none ml-auto" aria-label="Sort personas">
            <option>Recently updated</option><option>Highest score</option><option>Name A–Z</option><option>Oldest first</option>
          </select>
        </div>
        <div className="flex gap-1.5 flex-wrap" role="group" aria-label="Filter by category">
          {categoryFilters.map(([id, label]) => (
            <button
              key={id}
              onClick={() => { setCat(id); if (id === 'archived') setShowArchived(true); }}
              aria-pressed={cat === id}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                cat === id ? 'bg-purple/[0.12] border border-purple/30 text-purple-b' : 'bg-white/[0.04] border border-border text-muted hover:border-purple/30 hover:text-purple-b'
              }`}
            >
              {label} {id !== 'archived' && id === 'all' && <span className="text-[10px] opacity-70">({active.length})</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="p-7 pb-16">
        <div className="flex items-center justify-between mb-3.5">
          <div className="font-display text-sm font-semibold text-muted flex items-center gap-2">
            Active <span className="text-xs text-dim font-sans font-normal">{filteredActive.length} personas</span>
          </div>
        </div>

        {view === 'grid' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5" role="list" aria-label="Active personas">
            {filteredActive.map((p) => <PersonaCard key={p.id} persona={p} onArchive={handleArchive} />)}
            <div
              role="button" tabIndex={0}
              onClick={() => navigate('/persona/new')}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/persona/new')}
              className="card border-dashed flex flex-col items-center justify-center gap-2.5 min-h-[190px] text-dim bg-purple/[0.02] hover:border-purple/40 hover:text-purple-b hover:bg-purple/[0.05] cursor-pointer transition-all"
              aria-label="Create a new persona. 2 slots remaining on free plan."
            >
              <div className="text-2xl">+</div>
              <div className="text-[13px] font-medium">New Persona</div>
              <div className="text-[11px] opacity-70">2 slots remaining</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2" role="list" aria-label="Active personas list">
            {filteredActive.map((p) => (
              <div key={p.id} role="listitem" tabIndex={0} onClick={() => navigate(`/persona/${p.id}`)} onKeyDown={(e) => e.key === 'Enter' && navigate(`/persona/${p.id}`)} className="card p-3.5 px-5 flex items-center gap-4 cursor-pointer" aria-label={p.name}>
                <div className="w-[38px] h-[38px] rounded-lg flex items-center justify-center text-lg flex-shrink-0" style={{ background: p.iconBg }}>{p.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{p.name}</div>
                  <div className="text-xs text-dim">{p.role}</div>
                </div>
                <div className="flex items-center gap-3.5 flex-shrink-0">
                  <span className="font-display text-[13px] font-semibold" style={{ color: p.best ? '#FFB432' : 'var(--teal)' }}>{p.score}</span>
                  <span className="text-[11px] text-dim bg-white/5 border border-border rounded px-1.5 py-0.5">{p.version}</span>
                  <span className="hidden sm:inline text-[11px] text-dim">{p.updated}</span>
                  <div className="hidden sm:flex gap-1.5">
                    <button
                      onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(`You are an expert ${p.name}.`).catch(() => {}); showToast(`${p.name} prompt copied`); }}
                      className="text-[11px] tag-purple px-2.5 py-1 rounded-md hover:bg-purple/[0.18] transition-colors"
                    >
                      Copy
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); navigate(`/persona/${p.id}`); }} className="text-[11px] text-dim border border-border px-2.5 py-1 rounded-md hover:text-muted hover:border-borderH transition-all">View →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Archived */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3.5">
            <div className="font-display text-sm font-semibold text-muted flex items-center gap-2">
              📦 Archived <span className="text-xs text-dim font-sans font-normal">{archived.length} personas</span>
            </div>
            <button onClick={() => setShowArchived((s) => !s)} aria-expanded={showArchived} className="text-xs text-dim bg-transparent border-none cursor-pointer">
              {showArchived ? 'Hide ▴' : 'Show ▾'}
            </button>
          </div>
          {showArchived && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5" role="list" aria-label="Archived personas">
              {archived.map((p) => <PersonaCard key={p.id} persona={p} onUnarchive={handleUnarchive} />)}
              {archived.length === 0 && <div className="text-dim text-sm col-span-full py-4">No archived personas.</div>}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
