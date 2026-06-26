import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../ui/Toast';

export default function PersonaCard({ persona, onArchive, onUnarchive }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const showToast = useToast();

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard
      .writeText(`You are an expert ${persona.name}. [Full prompt — view detail page for complete text]`)
      .catch(() => {});
    showToast(`${persona.name} prompt copied`);
    setMenuOpen(false);
  };

  return (
    <article
      className={`card p-5 cursor-pointer relative overflow-hidden ${persona.status === 'ARCHIVED' ? 'opacity-55 hover:opacity-75' : 'hover:-translate-y-0.5'}`}
      role="listitem"
      tabIndex={0}
      onClick={() => navigate(`/persona/${persona.id}`)}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/persona/${persona.id}`)}
      aria-label={`${persona.name} persona, score ${persona.score}`}
    >
      {persona.status === 'ARCHIVED' && (
        <span className="absolute top-3 left-3 text-[9px] font-semibold uppercase tracking-wide bg-white/[0.07] border border-border text-dim px-1.5 py-0.5 rounded">
          Archived
        </span>
      )}

      <div className={`flex items-start justify-between mb-3.5 ${persona.status === 'ARCHIVED' ? 'pt-4' : ''}`}>
        <div
          className="w-[42px] h-[42px] rounded-[11px] flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: persona.iconBg }}
          aria-hidden="true"
        >
          {persona.icon}
        </div>
        <div className="relative">
          <button
            className="bg-transparent border-none text-dim text-lg cursor-pointer px-1.5 py-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-white/[0.07] hover:text-muted transition-opacity"
            style={{ opacity: menuOpen ? 1 : undefined }}
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((o) => !o);
            }}
            aria-label={`${persona.name} options`}
            aria-haspopup="true"
            aria-expanded={menuOpen}
          >
            ⋯
          </button>
          {menuOpen && (
            <div
              className="absolute top-full right-0 z-50 bg-card2 border border-borderH rounded-xl p-1.5 min-w-[150px] shadow-2xl"
              role="menu"
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button
                role="menuitem"
                className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-[13px] text-muted hover:bg-white/5 hover:text-textc transition-colors w-full text-left bg-transparent border-none cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/persona/${persona.id}`);
                }}
              >
                👁 View detail
              </button>
              <button
                role="menuitem"
                className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-[13px] text-muted hover:bg-white/5 hover:text-textc transition-colors w-full text-left bg-transparent border-none cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/persona/new');
                }}
              >
                ✏️ Edit persona
              </button>
              <button
                role="menuitem"
                className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-[13px] text-muted hover:bg-white/5 hover:text-textc transition-colors w-full text-left bg-transparent border-none cursor-pointer"
                onClick={handleCopy}
              >
                📋 Copy prompt
              </button>
              <button
                role="menuitem"
                className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-[13px] text-muted hover:bg-white/5 hover:text-textc transition-colors w-full text-left bg-transparent border-none cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                ⧉ Duplicate
              </button>
              <div className="h-px bg-border my-1" />
              {/* Archive/unarchive only shown when parent supplied handlers (we may disable archive feature) */}
              {((persona.archived && onUnarchive) || (!persona.archived && onArchive)) && (
                <button
                  role="menuitem"
                  className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-[13px] text-muted hover:bg-white/5 hover:text-textc transition-colors w-full text-left bg-transparent border-none cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (persona.archived) onUnarchive?.(persona.id);
                    else onArchive?.(persona.id);
                    setMenuOpen(false);
                  }}
                >
                  {persona.archived ? '📤 Unarchive' : '📦 Archive'}
                </button>
              )}
              <button
                role="menuitem"
                className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-[13px] text-[#FF8080] hover:bg-[rgba(255,80,80,0.08)] transition-colors w-full text-left bg-transparent border-none cursor-pointer"
                onClick={async (e) => {
                  e.stopPropagation();
                  if (confirm('Are you sure you want to delete this persona? This cannot be undone.')) {
                    try {
                      await fetch(`http://localhost:8080/api/personas/${persona.id}/delete`, {
                        method: 'PATCH',
                        headers: {
                          'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                      });
                      showToast('Persona deleted');
                      // Refresh the personas list (this would need a callback from parent)
                    } catch (error) {
                      console.error(error);
                      showToast('Failed to delete persona');
                    }
                  }
                }}
              >
                🗑 Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="font-display text-sm font-semibold mb-0.5">{persona.name}</div>
      <div className="text-xs text-dim mb-3.5">{persona.role}</div>
    <div className="flex gap-1.5 flex-wrap mb-3.5">
  <span className="tag">
    {persona.role}
  </span>
</div>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span
          className="font-display text-[13px] font-semibold"
          style={{ color: persona.best ? '#FFB432' : 'var(--teal)' }}
        >
          {persona.score} / 10
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-dim bg-white/5 border border-border rounded px-1.5 py-0.5">
            {persona.version}
          </span>
          <span className="text-[11px] text-dim">{persona.updated}</span>
        </div>
      </div>
    </article>
  );
}
