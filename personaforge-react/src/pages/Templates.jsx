import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import { useToast } from '../components/ui/Toast';
import { getTemplates } from '../api/templateApi';

const categories = [
  ['all', 'All'], ['dev', 'Development'], ['career', 'Career'],
  ['learning', 'Learning'], ['business', 'Business'], ['creative', 'Creative'], ['health', 'Health'],
];

// featured will be derived from loaded templates state inside the component

const badgeMeta = {
  featured: { label: '✦ Featured', bg: 'rgba(124,111,224,0.1)', border: 'rgba(124,111,224,0.2)', color: 'var(--purple-b)' },
  popular: { label: '🔥 Popular', bg: 'rgba(255,180,50,0.1)', border: 'rgba(255,180,50,0.2)', color: '#FFB432' },
  new: { label: '✨ New', bg: 'rgba(45,212,168,0.1)', border: 'rgba(45,212,168,0.2)', color: 'var(--teal)' },
};

export default function Templates() {
  const navigate = useNavigate();
  const showToast = useToast();
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('all');
  const [modalTemplate, setModalTemplate] = useState(null);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getTemplates();
        setTemplates(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  const featured = templates.filter((t) => t.badge);

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      const matchCat = cat === 'all' || t.category === cat;
      const matchQ = !query || (t.title || '').toLowerCase().includes(query.toLowerCase()) || (t.description || '').toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQ;
    });
  }, [query, cat, templates]);

  const applyTemplate = (name) => {
    setModalTemplate(null);
    showToast(`${name} added to builder`);
    setTimeout(() => navigate('/persona/new'), 1200);
  };

  return (
    <AppShell title="Templates" showSearch onSearch={setQuery}>
      {/* Filter bar */}
      <div className="px-7 pt-5 pb-4 border-b border-border flex items-center gap-3 flex-wrap">
        <div className="flex gap-1.5 flex-wrap" role="group" aria-label="Category filters">
          {categories.map(([id, label]) => (
            <button
              key={id}
              onClick={() => setCat(id)}
              aria-pressed={cat === id}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                cat === id ? 'bg-purple/[0.12] border border-purple/30 text-purple-b' : 'bg-white/[0.04] border border-border text-muted hover:border-purple/30 hover:text-purple-b'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <select className="bg-card border border-border text-muted text-xs px-3 py-1.5 rounded-lg cursor-pointer outline-none ml-auto" aria-label="Sort templates">
          <option>Most used</option>
          <option>Highest score</option>
          <option>Newest</option>
        </select>
      </div>

      <div className="p-7 pb-16">
        {/* Featured */}
        <div className="text-sm font-display font-semibold text-muted mb-3.5 flex items-center gap-2">
          ⭐ Featured <span className="text-xs text-dim font-sans font-normal">handpicked by team</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-8" role="list" aria-label="Featured templates">
          {featured.map((t) => {
            const meta = badgeMeta[t.badge];
            return (
              <div
                key={t.id} role="listitem" tabIndex={0}
                onClick={() => setModalTemplate(t)}
                onKeyDown={(e) => e.key === 'Enter' && setModalTemplate(t)}
                className="card p-6 cursor-pointer hover:-translate-y-0.5 relative overflow-hidden"
                style={t.badge === 'featured' ? { background: 'linear-gradient(135deg,rgba(124,111,224,0.05),rgba(45,212,168,0.03))', borderColor: 'rgba(124,111,224,0.2)' } : undefined}
                aria-label={`${t.title} template`}
              >
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded-md mb-3.5" style={{ background: meta.bg, border: `1px solid ${meta.border}`, color: meta.color }}>
                  {meta.label}
                </span>
                <span className="text-3xl mb-3.5 block">{t.icon || '📄'}</span>
                <div className="font-display text-base font-semibold mb-1.5">{t.title}</div>
                <p className="text-[13px] text-muted leading-relaxed mb-4">{t.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    <span className="text-[11px] text-dim">👥 {t.uses ?? '-' } uses</span>
                    <span className="text-[11px] text-dim">⭐ {t.score ?? '-'}</span>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); applyTemplate(t.title); }} className="text-xs font-medium tag-purple rounded-md px-3 py-1.5 hover:bg-purple/[0.18] transition-colors" aria-label={`Use ${t.title} template`}>
                    Use →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* All templates */}
        <div className="text-sm font-display font-semibold text-muted mb-3.5">
          All Templates <span className="text-xs text-dim font-sans font-normal">{filtered.length} templates</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3" role="list" aria-label="All templates">
          {filtered.map((t) => (
            <div
              key={t.id} role="listitem" tabIndex={0}
              onClick={() => setModalTemplate(t)}
              onKeyDown={(e) => e.key === 'Enter' && setModalTemplate(t)}
              className="card p-4.5 cursor-pointer hover:-translate-y-px"
              aria-label={`${t.name} template`}
            >
              <span className="text-2xl mb-2.5 block">{t.icon}</span>
              <div className="text-[10px] font-semibold uppercase tracking-wide text-dim mb-1.5">{t.category}</div>
              <div className="font-display text-[13px] font-semibold mb-1">{t.title}</div>
              <p className="text-xs text-dim leading-relaxed mb-3">{t.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-teal font-semibold">⭐ {t.score ?? '-'}</span>
                <span className="text-[10px] text-dim">{t.uses ?? '-'} uses</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16 text-dim text-sm">No templates match your filters.</div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalTemplate && (
        <div
          className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-6 backdrop-blur-sm"
          role="dialog" aria-modal="true" aria-label="Template preview"
          onClick={(e) => e.target === e.currentTarget && setModalTemplate(null)}
        >
          <div className="card relative overflow-y-auto w-full max-w-[580px] max-h-[90vh]" style={{ borderColor: 'rgba(124,111,224,0.2)' }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(124,111,224,0.6),rgba(45,212,168,0.4),transparent)' }} />
            <div className="flex justify-end p-5 pb-0">
              <button onClick={() => setModalTemplate(null)} className="bg-white/[0.06] border border-border text-muted w-7.5 h-7.5 rounded-lg cursor-pointer flex items-center justify-center hover:bg-white/10 hover:text-textc transition-all" aria-label="Close preview">✕</button>
            </div>
            <div className="p-6 pt-3">
              <span className="text-4xl mb-3 block">{modalTemplate.icon}</span>
              <div className="font-display text-xl font-bold mb-1">{modalTemplate.name}</div>
              <div className="text-xs text-dim mb-3.5">{modalTemplate.cat}</div>
              <p className="text-sm text-muted leading-relaxed mb-5">{modalTemplate.desc}</p>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-dim mb-2">Prompt preview</div>
              <div className="bg-[#0D0D14] border border-border rounded-[10px] p-4 font-mono text-xs text-muted leading-relaxed mb-5 max-h-[200px] overflow-y-auto whitespace-pre-wrap">
                <span className="text-purple-b">You are an expert {modalTemplate.name.toLowerCase()}</span> with deep domain experience.
                {'\n\n'}<span className="text-purple-b">Approach:</span>
                {'\n'}<span className="text-teal">— {modalTemplate.desc.split('.')[0]}.</span>
              </div>
              <div className="flex gap-2.5">
                <button onClick={() => applyTemplate(modalTemplate.name)} className="flex-1 bg-purple text-white text-sm font-medium border-none py-3 rounded-[9px] cursor-pointer shadow-purpleGlow hover:bg-purple-b transition-all">
                  Use this template →
                </button>
                <button onClick={() => setModalTemplate(null)} className="btn-outline px-4.5 py-3">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
