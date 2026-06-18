import { useState } from 'react';

export default function TagInput({ tags, onAdd, onRemove, placeholder, variant = 'purple' }) {
  const [value, setValue] = useState('');

  const colors = variant === 'danger'
    ? { bg: 'rgba(255,80,80,0.1)', border: 'rgba(255,80,80,0.2)', text: '#FF8080' }
    : { bg: 'rgba(124,111,224,0.12)', border: 'rgba(124,111,224,0.2)', text: 'var(--purple-b)' };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && value.trim()) {
      e.preventDefault();
      onAdd(value);
      setValue('');
    }
  };

  return (
    <div className="flex flex-wrap gap-1.5 items-center bg-card border border-border rounded-[10px] px-3 py-2.5 cursor-text focus-within:border-purple/50 transition-colors">
      {tags.map((tag, i) => (
        <span
          key={i}
          className="flex items-center gap-1.5 text-xs font-medium rounded-md px-2 py-1"
          style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.text }}
        >
          {tag}
          <span className="cursor-pointer opacity-70 hover:opacity-100 text-[11px]" onClick={() => onRemove(i)} role="button" aria-label="Remove tag">✕</span>
        </span>
      ))}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label={placeholder}
        className="border-none outline-none bg-transparent text-textc text-[13px] flex-1 min-w-[80px] placeholder:text-dim"
      />
    </div>
  );
}
