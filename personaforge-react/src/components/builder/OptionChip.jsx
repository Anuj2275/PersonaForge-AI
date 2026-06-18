export default function OptionChip({ icon, label, sub, selected, onClick, multi = false }) {
  return (
    <div
      role={multi ? 'checkbox' : 'radio'}
      aria-checked={selected}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      className={`relative border rounded-[10px] p-3.5 cursor-pointer transition-all bg-card ${
        selected ? 'border-purple bg-purple/[0.08]' : 'border-border hover:border-purple/30'
      }`}
    >
      {selected && (
        <span className="absolute top-2 right-2.5 text-[10px] text-purple-b bg-purple/20 rounded-full w-4 h-4 flex items-center justify-center leading-4">
          ✓
        </span>
      )}
      <span className="text-xl mb-2 block" aria-hidden="true">{icon}</span>
      <div className="text-[13px] font-medium text-textc mb-0.5">{label}</div>
      {sub && <div className="text-[11px] text-dim">{sub}</div>}
    </div>
  );
}
