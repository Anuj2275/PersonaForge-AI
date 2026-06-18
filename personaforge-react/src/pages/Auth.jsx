import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login } from "../api/authApi";

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState(location.pathname === '/register' ? 'register' : 'login');

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginErrors, setLoginErrors] = useState({});
  const [loginLoading, setLoginLoading] = useState(false);
  const [showLoginPass, setShowLoginPass] = useState(false);

  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [regErrors, setRegErrors] = useState({});
  const [regLoading, setRegLoading] = useState(false);
  const [showRegPass, setShowRegPass] = useState(false);

  const switchView = (v) => {
    setMode(v);
    navigate(v === 'login' ? '/login' : '/register', { replace: true });
  };

  const emailValid = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const strength = (pw) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^a-zA-Z0-9]/.test(pw)) score++;
    return score;
  };
  const strengthMeta = [
    { label: '', color: '' },
    { label: 'Weak', color: '#FF6B6B' },
    { label: 'Fair', color: '#F59E0B' },
    { label: 'Good', color: '#7C6FE0' },
    { label: 'Strong', color: '#2DD4A8' },
  ];
  const pwScore = strength(regPass);

 const handleLogin = async (e) => {
  e.preventDefault();

  const errors = {};

  if (!emailValid(loginEmail))
    errors.email = "Please enter a valid email address.";

  if (!loginPass)
    errors.pass = "Password is required.";

  setLoginErrors(errors);

  if (Object.keys(errors).length) return;

  try {

    setLoginLoading(true);
console.log({
    email: loginEmail,
    password: loginPass
});
    const response = await login({
      email: loginEmail,
      password: loginPass
    });
console.log(response.data);
    localStorage.setItem(
      "token",
      response.data.token
    );

    navigate("/dashboard");

  } catch (error) {

    console.error(error);

    alert("Login Failed");

  } finally {

    setLoginLoading(false);

  }
};

  const handleRegister = (e) => {
    e.preventDefault();
    const errors = {};
    if (!regName.trim()) errors.name = 'Please enter your name.';
    if (!emailValid(regEmail)) errors.email = 'Please enter a valid email address.';
    if (regPass.length < 8) errors.pass = 'Password must be at least 8 characters.';
    setRegErrors(errors);
    if (Object.keys(errors).length) return;
    setRegLoading(true);
    setTimeout(() => navigate('/dashboard'), 1400);
  };

  return (
    <div className="bg-bg text-textc font-sans min-h-screen flex flex-col">
      <div className="grid md:grid-cols-2 min-h-screen">
        {/* LEFT PANEL */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-surface border-r border-border relative overflow-hidden" aria-hidden="true">
          <div className="absolute w-[500px] h-[500px] rounded-full blur-[140px] bg-purple/[0.09] -top-24 -left-24 pointer-events-none" />
          <div className="absolute w-[350px] h-[350px] rounded-full blur-[110px] bg-teal/[0.07] -bottom-16 -right-16 pointer-events-none" />

          <Link to="/" className="flex items-center gap-2.5 no-underline text-textc font-display font-bold text-[17px] relative z-10">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: 'linear-gradient(135deg,#7C6FE0,#2DD4A8)' }}>⚡</div>
            PersonaForge
          </Link>

          <div className="relative z-10 flex-1 flex flex-col justify-center py-10">
            <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-purple-b mb-4">What you’re getting</div>
            <h2 className="font-display font-bold leading-[1.1] tracking-tight mb-4" style={{ fontSize: 'clamp(28px,3vw,40px)' }}>
              Your AI persona<br />library, built once.<br />Used forever.
            </h2>
            <p className="text-[15px] text-muted leading-[1.7] max-w-[380px] mb-9">
              Answer smart questions once. Get production-grade personas and prompts ready to use in any AI platform.
            </p>

            <div className="card p-5 relative overflow-hidden max-w-[340px]">
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(124,111,224,0.5),transparent)' }} />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-lg" style={{ background: 'linear-gradient(135deg,rgba(124,111,224,0.3),rgba(45,212,168,0.2))' }}>⚛️</div>
                <div>
                  <div className="font-display text-sm font-semibold">React Mentor</div>
                  <div className="text-[11px] text-dim">Project-based · Adaptive · Direct</div>
                </div>
              </div>
              <div className="text-[11px] text-dim leading-[1.6] mb-3.5">
                You are an expert React mentor with 10+ years of production experience. Teach through projects. Never skip the &ldquo;why&rdquo;. Adapt difficulty continuously...
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="font-display text-xl font-bold text-teal">9.1 <span className="text-xs text-dim">/ 10</span></div>
                <span className="text-[10px] bg-teal-dim border border-teal/20 text-teal rounded px-2 py-0.5">✓ Ready to use</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-semibold flex-shrink-0 bg-purple/15 text-purple-b">R</div>
                <div>
                  <div className="text-[13px] text-muted leading-[1.5]">“Cut my prompt setup time from 20 minutes to under 2. My React Mentor persona is genuinely better than anything I built manually.”</div>
                  <div className="text-[11px] text-dim mt-0.5">Rahul S. · Full-stack dev</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-semibold flex-shrink-0 bg-teal-dim text-teal">A</div>
                <div>
                  <div className="text-[13px] text-muted leading-[1.5]">“The prompt scoring told me exactly what was missing. Went from 7.2 to 9.4 in two edits.”</div>
                  <div className="text-[11px] text-dim mt-0.5">Ananya K. · CS student</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-dim relative z-10">© 2025 PersonaForge AI · Free to get started</div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-[400px]">
            <div className="flex mb-6 bg-card border border-border rounded-[9px] p-[3px] gap-[3px]" role="tablist" aria-label="Authentication mode">
              <button
                className={`flex-1 py-2 rounded-lg text-[13px] font-medium transition-all ${mode === 'login' ? 'bg-purple/15 text-purple-b' : 'text-dim'}`}
                role="tab"
                aria-selected={mode === 'login'}
                onClick={() => switchView('login')}
              >
                Sign in
              </button>
              <button
                className={`flex-1 py-2 rounded-lg text-[13px] font-medium transition-all ${mode === 'register' ? 'bg-purple/15 text-purple-b' : 'text-dim'}`}
                role="tab"
                aria-selected={mode === 'register'}
                onClick={() => switchView('register')}
              >
                Create account
              </button>
            </div>

            {mode === 'login' ? (
              <div>
                <h1 className="font-display text-2xl font-bold tracking-tight mb-1.5">Welcome back</h1>
                <p className="text-sm text-muted mb-8">Sign in to access your persona library.</p>

                <SocialButton label="Continue with Google" icon={<GoogleIcon />} />
                <SocialButton label="Continue with GitHub" icon={<GithubIcon />} />

                <Divider text="or sign in with email" />

                <form noValidate onSubmit={handleLogin}>
                  <FormField
                    label="Email address" id="loginEmail" type="email" value={loginEmail}
                    onChange={setLoginEmail} placeholder="you@example.com" autoComplete="email"
                    error={loginErrors.email}
                  />
                  <div className="mb-[18px]">
                    <div className="flex justify-between items-center mb-[7px]">
                      <label className="text-[13px] font-medium text-muted" htmlFor="loginPass">Password</label>
                      <a href="#" className="text-xs text-purple-b no-underline hover:opacity-80">Forgot password?</a>
                    </div>
                    <div className="relative">
                      <input
                        type={showLoginPass ? 'text' : 'password'} id="loginPass" className="form-input" placeholder="Your password"
                        autoComplete="current-password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)}
                      />
                      <span
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-dim text-sm cursor-pointer"
                        onClick={() => setShowLoginPass((s) => !s)} role="button" tabIndex={0} aria-label="Show/hide password"
                      >
                        👁
                      </span>
                    </div>
                    {loginErrors.pass && <div className="text-xs text-[#FF8080] mt-1.5">{loginErrors.pass}</div>}
                  </div>
                  <button type="submit" disabled={loginLoading} className="w-full bg-purple text-white text-sm font-medium border-none py-3.5 rounded-[10px] cursor-pointer shadow-purpleGlow hover:bg-purple-b hover:-translate-y-px transition-all mt-1 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0">
                    {loginLoading ? 'Signing in...' : <>Sign in <span aria-hidden="true">→</span></>}
                  </button>
                </form>

                <div className="text-center mt-5 text-[13px] text-dim">
                  No account?{' '}
                  <button onClick={() => switchView('register')} className="text-purple-b bg-transparent border-none cursor-pointer underline-offset-2 hover:underline">
                    Create one free →
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="font-display text-2xl font-bold tracking-tight mb-1.5">Create your account</h1>
                <p className="text-sm text-muted mb-8">Free to start. Build up to 10 personas on the free plan.</p>

                <SocialButton label="Continue with Google" icon={<GoogleIcon />} />

                <Divider text="or register with email" />

                <form noValidate onSubmit={handleRegister}>
                  <FormField
                    label="Full name" id="regName" type="text" value={regName} onChange={setRegName}
                    placeholder="Arjun Kumar" autoComplete="name" error={regErrors.name}
                  />
                  <FormField
                    label="Email address" id="regEmail" type="email" value={regEmail} onChange={setRegEmail}
                    placeholder="you@example.com" autoComplete="email" error={regErrors.email}
                  />
                  <div className="mb-[18px]">
                    <label className="block text-[13px] font-medium text-muted mb-[7px]" htmlFor="regPass">Password</label>
                    <div className="relative">
                      <input
                        type={showRegPass ? 'text' : 'password'} id="regPass" className="form-input" placeholder="Min. 8 characters"
                        autoComplete="new-password" value={regPass} onChange={(e) => setRegPass(e.target.value)}
                      />
                      <span
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-dim text-sm cursor-pointer"
                        onClick={() => setShowRegPass((s) => !s)} role="button" tabIndex={0} aria-label="Show/hide password"
                      >
                        👁
                      </span>
                    </div>
                    <div className="flex gap-1 mt-2" role="group" aria-label="Password strength">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-[3px] flex-1 rounded transition-colors" style={{ background: i <= pwScore ? strengthMeta[pwScore].color : 'rgba(255,255,255,0.07)' }} />
                      ))}
                    </div>
                    <div className="text-[11px] mt-1.5" style={{ color: regPass ? strengthMeta[pwScore].color : 'var(--dim)' }} aria-live="polite">
                      {regPass ? strengthMeta[pwScore].label : ''}
                    </div>
                    {regErrors.pass && <div className="text-xs text-[#FF8080] mt-1.5">{regErrors.pass}</div>}
                  </div>
                  <div className="flex items-start gap-2.5 mb-4">
                    <input
                      type="checkbox" id="terms" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                      className="w-4 h-4 rounded border border-border bg-card appearance-none cursor-pointer flex-shrink-0 mt-px checked:bg-purple checked:border-purple relative"
                    />
                    <label className="text-xs text-dim leading-[1.5]" htmlFor="terms">
                      I agree to PersonaForge’s{' '}
                      <a href="#" className="text-purple-b no-underline">Terms of Service</a> and{' '}
                      <a href="#" className="text-purple-b no-underline">Privacy Policy</a>.
                    </label>
                  </div>
                  <button type="submit" disabled={regLoading} className="w-full bg-purple text-white text-sm font-medium border-none py-3.5 rounded-[10px] cursor-pointer shadow-purpleGlow hover:bg-purple-b hover:-translate-y-px transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0">
                    {regLoading ? 'Creating account...' : <>Create account <span aria-hidden="true">→</span></>}
                  </button>
                </form>

                <div className="text-center mt-5 text-[13px] text-dim">
                  Already have an account?{' '}
                  <button onClick={() => switchView('login')} className="text-purple-b bg-transparent border-none cursor-pointer underline-offset-2 hover:underline">
                    Sign in →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, id, type, value, onChange, placeholder, autoComplete, error }) {
  return (
    <div className="mb-[18px]">
      <label className="block text-[13px] font-medium text-muted mb-[7px]" htmlFor={id}>{label}</label>
      <input
        type={type} id={id} className="form-input" placeholder={placeholder} autoComplete={autoComplete}
        value={value} onChange={(e) => onChange(e.target.value)}
      />
      {error && <div className="text-xs text-[#FF8080] mt-1.5" role="alert">{error}</div>}
    </div>
  );
}

function SocialButton({ label, icon }) {
  return (
    <button type="button" className="flex items-center justify-center gap-2.5 w-full bg-card border border-border text-muted text-sm font-medium py-3 rounded-[10px] cursor-pointer transition-all hover:border-borderH hover:text-textc hover:bg-card2 mb-2.5">
      {icon} {label}
    </button>
  );
}

function Divider({ text }) {
  return (
    <div className="flex items-center gap-3 my-5 text-dim text-xs before:content-[''] before:flex-1 before:h-px before:bg-border after:content-[''] after:flex-1 after:h-px after:bg-border">
      {text}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
