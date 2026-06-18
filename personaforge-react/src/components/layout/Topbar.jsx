import { useNavigate } from 'react-router-dom';

export default function Topbar({ title, onMenuClick, showSearch = false, onSearch, rightSlot }) {
  const navigate = useNavigate();

  return (
    <header className="h-[60px] border-b border-border bg-[rgba(10,10,15,0.8)] backdrop-blur-md flex items-center px-4 md:px-7 gap-3 md:gap-4 flex-shrink-0">
      <button
        className="md:hidden p-1 text-muted text-lg bg-transparent border-none cursor-pointer"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        ☰
      </button>
      <span className="font-display text-base font-semibold">{title}</span>

      <div className="ml-auto flex items-center gap-2.5">
        {showSearch && (
          <div className="hidden sm:flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-1.5 focus-within:border-purple/40 transition-colors">
            <span aria-hidden="true" className="text-dim text-[13px]">🔍</span>
            <input
              type="text"
              placeholder="Search..."
              aria-label="Search"
              onChange={(e) => onSearch?.(e.target.value)}
              className="bg-transparent border-none outline-none text-textc text-[13px] w-40 placeholder:text-dim"
            />
          </div>
        )}
        {rightSlot}
        <button
          onClick={() => navigate('/persona/new')}
          className="flex items-center gap-2 bg-purple text-white text-[13px] font-medium border-none px-[18px] py-[9px] rounded-lg cursor-pointer shadow-purpleGlow hover:bg-purple-b hover:-translate-y-px transition-all"
          aria-label="Create new persona"
        >
          + New Persona
        </button>
      </div>
    </header>
  );
}
