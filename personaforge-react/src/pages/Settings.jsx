import { useState, useEffect } from 'react';
import { getCurrentUser } from "../api/authApi";
import { useToast } from "../components/ui/Toast";
import AppShell from "../components/layout/AppShell";
// Simplified settings: remove Notifications and Plan & Billing from the visible nav.
const navItems = [
  ['profile', '👤', 'Profile'],
  ['preferences', '🎨', 'Preferences'],
  ['security', '🔒', 'Security'],
  ['danger', '⚠️', 'Danger Zone'],
];

export default function Settings() {
  const [currentUserState, setCurrentUserState] = useState(null);
  const [section, setSection] = useState('profile');
  const showToast = useToast();

  const save = () => showToast('Changes saved');
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await getCurrentUser();
        setCurrentUserState(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadUser();
  }, []);
  return (
    <AppShell title="Settings">
      <div className="grid lg:grid-cols-[220px_1fr] h-full">
        {/* Nav */}
        <nav className="hidden lg:block border-r border-border p-5 px-3 overflow-y-auto" aria-label="Settings sections">
          {navItems.map(([id, icon, label]) => (
            <button
              key={id}
              onClick={() => setSection(id)}
              className={`flex items-center gap-2.5 w-full text-left px-2.5 py-2.5 rounded-lg text-[13px] mb-0.5 transition-all bg-transparent border-none cursor-pointer ${
                section === id ? 'bg-purple/[0.12] text-purple-b' : 'text-muted hover:bg-white/[0.04] hover:text-textc'
              }`}
            >
              <span className="text-sm w-4 text-center">{icon}</span> {label}
            </button>
          ))}
        </nav>

        {/* Mobile tabs */}
        <div className="lg:hidden flex gap-2 overflow-x-auto p-4 border-b border-border">
          {navItems.map(([id, icon, label]) => (
            <button
              key={id}
              onClick={() => setSection(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all ${
                section === id ? 'bg-purple/[0.12] text-purple-b' : 'bg-card border border-border text-muted'
              }`}
            >
              {icon} {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <main className="overflow-y-auto p-6 sm:p-10 pb-20">
          {section === 'profile' && <ProfileSection user={currentUserState} />}
          {section === 'preferences' && <PreferencesSection onSave={save} />}
          {section === 'security' && <SecuritySection user={currentUserState} onSave={save} />}
          {section === 'danger' && <DangerSection />}
        </main>
      </div>
    </AppShell>
  );
}

function SectionHeader({ title, sub }) {
  return (
    <div className="mb-8">
      <div className="font-display text-[17px] font-semibold mb-1">{title}</div>
      <p className="text-[13px] text-muted leading-relaxed">{sub}</p>
    </div>
  );
}

function Label({ children }) {
  return <label className="block text-xs font-medium text-muted mb-1.5 uppercase tracking-wide">{children}</label>;
}

function SaveBar({ onSave, label = 'Save changes' }) {
  return (
    <div className="flex items-center justify-end gap-2.5 pt-2">
      <button className="bg-transparent border border-border text-muted text-[13px] px-4.5 py-2.5 rounded-lg cursor-pointer hover:border-borderH hover:text-textc transition-all">Cancel</button>
      <button onClick={onSave} className="bg-purple text-white text-[13px] font-medium border-none px-5.5 py-2.5 rounded-lg cursor-pointer shadow-purpleGlow hover:bg-purple-b transition-all">{label}</button>
    </div>
  );
}

function ProfileSection({ user }) {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSave = async () => {
    if (!name.trim()) {
      setNameError('Name is required');
      return;
    }
    setNameError('');
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }
    setEmailError('');
    if (newPassword && newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    try {
      const payload = { name, email };
      if (newPassword) payload.password = newPassword;

      await fetch('http://localhost:8080/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });
      alert('Profile updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update profile');
    }
  };

  const initials = (user?.name || ' ').split(' ').map((n) => n[0]).join('');

  return (
    <div>
      <SectionHeader title="Profile" sub="Manage your account information (name, email, password)." />
      <div className="card p-6">
        <div className="flex items-center gap-5 mb-6">
          <div className="relative w-[72px] h-[72px] rounded-2xl flex items-center justify-center text-2xl font-bold text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg,#7C6FE0,#2DD4A8)' }}>
            {initials}
          </div>
          <div>
            <div className="font-display text-base font-semibold">{user?.name}</div>
            <div className="text-[13px] text-muted mt-0.5">{user?.email}</div>
          </div>
        </div>

        <div className="mb-4">
          <Label>Full name</Label>
          <input
            type="text"
            className="form-input"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <div className="text-xs text-red-400 mt-1">{nameError}</div>}
        </div>
        <div className="mb-4">
          <Label>Email address</Label>
          <input type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} />
          {emailError && <div className="text-xs text-red-400 mt-1">{emailError}</div>}
        </div>

        <div className="mb-6">
          <Label>Change password (optional)</Label>
          <input type="password" className="form-input mb-2" placeholder="Current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          <input type="password" className="form-input mb-2" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <input type="password" className="form-input" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <SaveBar onSave={handleSave} />
      </div>
    </div>
  );
}

function PreferencesSection({ onSave }) {
  const [theme, setTheme] = useState('dark');
  return (
    <div>
      <SectionHeader title="Preferences" sub="Customize the look and behavior of PersonaForge." />
      <div className="card p-6 mb-4">
        <div className="text-[13px] font-medium text-muted mb-4">Theme</div>
        <div className="grid grid-cols-1 gap-3" role="radiogroup" aria-label="Select theme">
          {/* Only keep the default dark theme for now. Other themes are archived. */}
          <div role="radio" aria-checked={theme === 'dark'} tabIndex={0} onClick={() => setTheme('dark')} className={`border-2 rounded-xl p-3.5 cursor-pointer text-center transition-colors ${theme === 'dark' ? 'border-purple' : 'border-border hover:border-borderH'}`}>
            <div className="h-14 rounded-md mb-2.5 border border-white/5" style={{ background: 'linear-gradient(135deg,#0A0A0F 60%,rgba(124,111,224,0.2))' }} />
            <div className="text-xs font-medium text-muted">Dark (default)</div>
          </div>
        </div>
      </div>
      <div className="card p-6">
        <div className="text-[13px] font-medium text-muted mb-1">Default AI Platform</div>
        <div className="text-xs text-dim mb-3.5">Platform selection is stored locally. Formatting rules will apply only when AI integrations are enabled.</div>
        <select className="form-input max-w-[260px]" aria-label="Default AI platform" defaultValue="ChatGPT">
          <option>ChatGPT</option><option>Claude</option><option>Gemini</option><option>DeepSeek</option><option>No preference</option>
        </select>
        <div className="mt-4"><SaveBar onSave={onSave} label="Save" /></div>
      </div>
    </div>
  );
}

function NotificationsSection({ onSave }) {
  const [toggles, setToggles] = useState({ scoring: true, templates: true, tips: false, updates: true, marketing: false });
  const items = [
    ['scoring', 'Prompt scoring complete', 'Notify when a new prompt has been scored.'],
    ['templates', 'New template available', 'Notify when a new persona template is added.'],
    ['tips', 'Persona improvement tips', 'Weekly digest of suggestions for your existing personas.'],
    ['updates', 'Product updates', 'New features, releases, and announcements.'],
    ['marketing', 'Marketing emails', 'Tips, guides, and promotional content.'],
  ];
  return (
    <div>
      <SectionHeader title="Notifications" sub="Control when and how PersonaForge contacts you." />
      <div className="card p-6">
        {items.map(([key, label, sub]) => (
          <div key={key} className="flex items-center justify-between py-3.5 border-b border-border last:border-0">
            <div><div className="text-[13px] font-medium mb-0.5">{label}</div><div className="text-xs text-dim">{sub}</div></div>
            <label className="toggle" aria-label={label}>
              <input type="checkbox" checked={toggles[key]} onChange={(e) => setToggles((t) => ({ ...t, [key]: e.target.checked }))} />
              <span className="toggle-slider" />
            </label>
          </div>
        ))}
        <div className="pt-3"><SaveBar onSave={onSave} label="Save preferences" /></div>
      </div>
    </div>
  );
}

function SecuritySection({ onSave, user }) {
  return (
    <div>
      <SectionHeader title="Security" sub="Manage your password and active sessions." />
      <div className="card p-6 mb-3.5">
        <div className="text-[13px] font-medium text-muted mb-4">Change password</div>
        <div className="mb-4"><Label>Current password</Label><input type="password" className="form-input" placeholder="Enter current password" /></div>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div><Label>New password</Label><input type="password" className="form-input" placeholder="Min. 8 characters" /></div>
          <div><Label>Confirm password</Label><input type="password" className="form-input" placeholder="Confirm new password" /></div>
        </div>
        <SaveBar onSave={onSave} label="Update password" />
      </div>
      {/* Active sessions listing removed from simplified UI. Keep handlers available in backend; restore here if needed. */}
    </div>
  );
}

function PlanSection() {
  return (
    <div>
      <SectionHeader title="Plan & Billing" sub="Manage your subscription and see what's included." />
      <div className="card p-6 flex items-center justify-between gap-5 flex-wrap mb-4" style={{ background: 'linear-gradient(135deg,rgba(124,111,224,0.08),rgba(45,212,168,0.05))', borderColor: 'rgba(124,111,224,0.2)' }}>
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide tag-purple px-2.5 py-1 rounded-md mb-2">⭐ Free Plan</div>
          <div className="font-display text-[17px] font-semibold mb-1">PersonaForge Free</div>
          <div className="text-[13px] text-muted">Access to core features. Great for getting started.</div>
        </div>
        <button className="bg-purple text-white text-[13px] font-medium border-none px-5.5 py-2.5 rounded-lg cursor-pointer shadow-purpleGlow hover:bg-purple-b transition-all whitespace-nowrap">Upgrade to Pro →</button>
      </div>
      <div className="card p-6">
        <div className="text-[13px] font-medium text-muted mb-4">Usage this month</div>
        <div className="flex gap-5 flex-wrap mb-6">
          {[['Personas', 8, 10, 'var(--purple)'], ['Prompt generations', 24, 30, 'var(--teal)'], ['Templates used', 5, 10, 'var(--purple-b)']].map(([label, val, max, color]) => (
            <div key={label} className="text-xs text-muted">
              <div>{label}</div>
              <div><span className="font-display font-semibold text-textc">{val}</span> / {max}</div>
              <div className="h-1.5 bg-white/[0.07] rounded-full mt-1 w-[120px]"><div className="h-full rounded-full" style={{ width: `${(val / max) * 100}%`, background: color }} /></div>
            </div>
          ))}
        </div>
        <div className="pt-5 border-t border-border">
          <div className="text-[13px] font-medium text-muted mb-3">What’s in Pro</div>
          <div className="grid sm:grid-cols-2 gap-2">
            {['Unlimited personas', 'Unlimited generations', 'Advanced AI scoring', 'AI prompt refinement', 'Persona sharing', 'Priority support'].map((f) => (
              <div key={f} className="text-xs text-muted flex gap-1.5 items-start"><span className="text-teal">✓</span>{f}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DangerSection() {
  return (
    <div>
      <SectionHeader title="Danger Zone" sub="Irreversible actions. Proceed with caution." />
      <div className="border rounded-xl p-5" style={{ borderColor: 'rgba(255,80,80,0.15)' }}>
        {[
          ['Export all data', 'Download all your personas, prompts, and account data as JSON.', 'Export →'],
          ['Delete all personas', 'Permanently delete all personas and their version histories. Cannot be undone.', 'Delete all'],
          ['Delete account', 'Permanently delete your account and all associated data. This action is irreversible.', 'Delete account'],
        ].map(([title, sub, btn]) => (
          <div key={title} className="flex items-start justify-between gap-4 py-3.5 border-b border-[rgba(255,80,80,0.08)] last:border-0">
            <div><div className="text-[13px] font-medium mb-0.5">{title}</div><div className="text-xs text-dim">{sub}</div></div>
            <button className="text-xs text-[#FF8080] px-3.5 py-2 rounded-lg cursor-pointer whitespace-nowrap" style={{ background: 'rgba(255,80,80,0.07)', border: '1px solid rgba(255,80,80,0.18)' }}>{btn}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
