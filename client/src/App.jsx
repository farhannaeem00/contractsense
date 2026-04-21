import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';

import Landing  from './pages/Landing';
import Login    from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Upload   from './pages/Upload';
import Analysis from './pages/Analysis';

// ─── Protected Route Wrapper ─────────────────────────
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return user ? children : <Navigate to="/login" replace />;
};

// ─── Public Route Wrapper ────────────────────────────
// Redirect to dashboard if already logged in
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return !user ? children : <Navigate to="/dashboard" replace />;
};

// ─── App ─────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e1e2e',
            color: '#fff',
            borderRadius: '10px',
          },
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login"    element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/* Protected Routes */}
        <Route path="/dashboard"    element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/upload"       element={<PrivateRoute><Upload /></PrivateRoute>} />
        <Route path="/analysis/:id" element={<PrivateRoute><Analysis /></PrivateRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}