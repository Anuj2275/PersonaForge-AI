import { NavLink } from 'react-router-dom';
import { currentUser } from '../../data/mockData';

const navItemClass = ({ isActive }) =>
  `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] no-underline transition-colors duration-150 ${
    isActive
      ? 'bg-purple/10 text-purple-b font-medium'
      : 'text-muted hover:bg-white/5 hover:text-textc'
  }`;

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-[9] md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`w-[240px] flex-shrink-0 bg-surface border-r border-border flex flex-col h-screen overflow-y-auto z-20 transition-transform duration-300
          fixed md:relative top-0 left-0
          ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        aria-label="Main navigation"
      >
        <NavLink
          to="/"
          className="flex items-center gap-2.5 px-5 py-[18px] border-b border-border font-display font-bold text-base text-textc no-underline"
        >
          <div
            className="w-[30px] h-[30px] rounded-lg flex items-center justify-center text-sm flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,#7C6FE0,#2DD4A8)' }}
            aria-hidden="true"
          >
            ⚡
          </div>
          PersonaForge
        </NavLink>

        <div className="px-3 pt-5 pb-2">
          <div className="text-[10px] font-semibold tracking-[0.1em] uppercase text-dim px-2 mb-1">
            Workspace
          </div>
          <ul className="list-none flex flex-col gap-px">
            <li>
              <NavLink to="/dashboard" className={navItemClass}>
                <span className="w-[18px] text-center flex-shrink-0 text-[15px]" aria-hidden="true">⊞</span>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/persona/new" className={navItemClass}>
                <span className="w-[18px] text-center flex-shrink-0 text-[15px]" aria-hidden="true">✦</span>
                New Persona
              </NavLink>
            </li>
            <li>
              <NavLink to="/personas" className={navItemClass}>
                <span className="w-[18px] text-center flex-shrink-0 text-[15px]" aria-hidden="true">🗂</span>
                My Personas
                <span className="ml-auto bg-purple/20 text-purple-b text-[10px] font-semibold rounded px-1.5 py-0.5">
                  {currentUser.personaCount}
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/templates" className={navItemClass}>
                <span className="w-[18px] text-center flex-shrink-0 text-[15px]" aria-hidden="true">📋</span>
                Templates
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="px-3 pt-5 pb-2">
          <div className="text-[10px] font-semibold tracking-[0.1em] uppercase text-dim px-2 mb-1">
            History
          </div>
          <ul className="list-none flex flex-col gap-px">
            <li>
              <NavLink to="/history" className={navItemClass}>
                <span className="w-[18px] text-center flex-shrink-0 text-[15px]" aria-hidden="true">🔀</span>
                Prompt History
              </NavLink>
            </li>
            <li>
              <NavLink to="/personas?filter=archived" className={navItemClass}>
                <span className="w-[18px] text-center flex-shrink-0 text-[15px]" aria-hidden="true">📦</span>
                Archived
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="px-3 pt-5 pb-2">
          <div className="text-[10px] font-semibold tracking-[0.1em] uppercase text-dim px-2 mb-1">
            Account
          </div>
          <ul className="list-none flex flex-col gap-px">
            <li>
              <NavLink to="/settings" className={navItemClass}>
                <span className="w-[18px] text-center flex-shrink-0 text-[15px]" aria-hidden="true">⚙</span>
                Settings
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="mt-auto p-3 border-t border-border">
          <NavLink
            to="/u/arjun"
            className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-white/5 transition-colors no-underline"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-semibold flex-shrink-0 text-white"
              style={{ background: 'linear-gradient(135deg,#7C6FE0,#2DD4A8)' }}
            >
              {currentUser.initials}
            </div>
            <div>
              <div className="text-[13px] font-medium text-textc">{currentUser.name}</div>
              <div className="text-[11px] text-dim">
                {currentUser.plan} plan · {currentUser.personaCount}/{currentUser.personaLimit} personas
              </div>
            </div>
          </NavLink>
        </div>
      </aside>
    </>
  );
}
