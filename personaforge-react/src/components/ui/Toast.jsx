import { createContext, useCallback, useContext, useRef, useState } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ show: false, message: '' });
  const timerRef = useRef(null);

  const showToast = useCallback((message) => {
    clearTimeout(timerRef.current);
    setToast({ show: true, message });
    timerRef.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 2600);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div
        role="alert"
        aria-live="polite"
        className={`fixed bottom-7 right-7 z-[300] bg-card border border-teal/30 rounded-lg px-[18px] py-3 flex items-center gap-2.5 text-[13px] text-textc transition-all duration-300 pointer-events-none ${
          toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        <span className="text-teal" aria-hidden="true">✓</span>
        <span>{toast.message}</span>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
