import { Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';

import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';
import PersonaDetail from './pages/PersonaDetail';
import Personas from './pages/Personas';
import Templates from './pages/Templates';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />

        {/* Authenticated app */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/persona/new" element={<Builder />} />
        <Route path="/persona/:id" element={<PersonaDetail />} />
        <Route path="/personas" element={<Personas />} />
        <Route path="/templates" element={<Templates />} />
        {/* History route is archived/hidden for simplified frontend. Keep code for easy restore. */}
        {/* <Route path="/history" element={<History />} /> */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/u/:username" element={<Profile />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ToastProvider>
  );
}
