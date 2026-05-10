import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck, Plus, FileText, Trash2,
  Clock, AlertTriangle, CheckCircle,
  AlertCircle, LogOut, Search, Menu, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import SkeletonCard from '../components/SkeletonCard';
import usePageTitle from '../hooks/usePageTitle';

// ─── Risk Badge ──────────────────────────────────────
const RiskBadge = ({ score }) => {
  if (score === null || score === undefined) return null;

  if (score >= 70) return (
    <span className="flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-full text-xs font-semibold">
      <AlertTriangle size={12} /> High Risk {score}/100
    </span>
  );
  if (score >= 40) return (
    <span className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full text-xs font-semibold">
      <AlertCircle size={12} /> Medium Risk {score}/100
    </span>
  );
  return (
    <span className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-semibold">
      <CheckCircle size={12} /> Low Risk {score}/100
    </span>
  );
};

// ─── Status Badge ────────────────────────────────────
const StatusBadge = ({ status }) => {
  if (status === 'analyzing') return (
    <span className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full text-xs font-semibold">
      <Clock size={12} className="animate-spin" /> Analyzing...
    </span>
  );
  if (status === 'error') return (
    <span className="flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-full text-xs font-semibold">
      <AlertTriangle size={12} /> Error
    </span>
  );
  return null;
};

// ─── Format File Size ────────────────────────────────
const formatSize = (bytes) => {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// ─── Main Dashboard ──────────────────────────────────
export default function Dashboard() {
  usePageTitle('Dashboard');
  const { user, logout }          = useAuth();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [menuOpen, setMenuOpen]   = useState(false);
  const navigate                  = useNavigate();

  // Fetch contracts on mount
  useEffect(() => {
    fetchContracts();
  }, []);

  // Auto-refresh every 5 seconds if any contract is still analyzing
  useEffect(() => {
    const hasAnalyzing = contracts.some(c => c.status === 'analyzing');
    if (!hasAnalyzing) return;
    const interval = setInterval(fetchContracts, 5000);
    return () => clearInterval(interval);
  }, [contracts]);

  const fetchContracts = async () => {
    try {
      const { data } = await api.get('/contracts');
      setContracts(data.data);
    } catch {
      toast.error('Failed to load contracts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this contract?')) return;
    try {
      await api.delete(`/contracts/${id}`);
      setContracts(prev => prev.filter(c => c._id !== id));
      toast.success('Contract deleted');
    } catch {
      toast.error('Failed to delete contract');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  // ── Filter contracts by search ────────────────────
  const filtered = contracts.filter(c =>
    c.fileName?.toLowerCase().includes(search.toLowerCase())
  );

  // ── Stats ──
  const total    = contracts.length;
  const done     = contracts.filter(c => c.status === 'done').length;
  const highRisk = contracts.filter(c => c.riskScore >= 70).length;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Navbar ── */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-indigo-600" size={22} />
            <span className="text-xl font-bold text-gray-900">ContractSense</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-sm text-gray-500">
              Hello, <span className="font-semibold text-gray-700">{user?.name}</span>
            </span>
            <Link to="/upload"
              className="flex items-center gap-2 bg-indigo-600 text-white
                         px-4 py-2 rounded-lg hover:bg-indigo-700 transition
                         font-medium text-sm">
              <Plus size={16} /> Upload Contract
            </Link>
            <button onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-500
                         hover:text-red-500 transition">
              <LogOut size={16} /> Logout
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden text-gray-500 hover:text-gray-800 transition">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="sm:hidden mt-4 pt-4 border-t border-gray-100
                          flex flex-col gap-3">
            <span className="text-sm text-gray-500">
              Hello, <span className="font-semibold text-gray-700">{user?.name}</span>
            </span>
            <Link to="/upload"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 bg-indigo-600 text-white
                         px-4 py-2 rounded-lg hover:bg-indigo-700 transition
                         font-medium text-sm w-fit">
              <Plus size={16} /> Upload Contract
            </Link>
            <button onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-500
                         hover:text-red-500 transition w-fit">
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Contracts</h1>
            <p className="text-gray-500 text-sm mt-1">
              Upload and analyze your contracts instantly
            </p>
          </div>
          <Link to="/upload"
            className="flex items-center gap-2 bg-indigo-600 text-white
                       px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition
                       font-medium text-sm shadow-sm">
            <Plus size={18} /> Upload Contract
          </Link>
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm">
            <p className="text-3xl font-black text-indigo-600">{total}</p>
            <p className="text-gray-500 text-sm mt-1">Total Contracts</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm">
            <p className="text-3xl font-black text-green-500">{done}</p>
            <p className="text-gray-500 text-sm mt-1">Analyzed</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm">
            <p className="text-3xl font-black text-red-500">{highRisk}</p>
            <p className="text-gray-500 text-sm mt-1">High Risk</p>
          </div>
        </div>

        {/* ── Search Bar ── */}
        {contracts.length > 0 && (
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2
                               text-gray-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search contracts..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200
                         rounded-xl text-gray-800 text-sm placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-transparent transition shadow-sm"
            />
          </div>
        )}

        {/* ── Contracts List ── */}
        {loading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
          </div>

        ) : contracts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
            <FileText size={48} className="mx-auto text-gray-200 mb-4" />
            <h3 className="font-semibold text-gray-700 mb-2">No contracts yet</h3>
            <p className="text-gray-400 text-sm mb-6">
              Upload your first contract to get started
            </p>
            <Link to="/upload"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white
                         px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition
                         font-medium text-sm">
              <Plus size={16} /> Upload Contract
            </Link>
          </div>

        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center shadow-sm">
            <Search size={40} className="mx-auto text-gray-200 mb-3" />
            <p className="text-gray-500 text-sm">
              No contracts match "<span className="text-gray-800">{search}</span>"
            </p>
          </div>

        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map(contract => (
              <div
                key={contract._id}
                onClick={() => contract.status === 'done' && navigate(`/analysis/${contract._id}`)}
                className={`bg-white rounded-2xl border border-gray-100 p-5 shadow-sm
                  flex items-center justify-between gap-4
                  ${contract.status === 'done'
                    ? 'hover:shadow-md hover:border-indigo-100 cursor-pointer'
                    : 'cursor-default'}
                  transition`}
              >
                {/* Left — Icon + Info */}
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl
                                  flex items-center justify-center shrink-0">
                    <FileText className="text-indigo-500" size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800 truncate">
                      {contract.fileName}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(contract.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                      {contract.fileSize ? ` · ${formatSize(contract.fileSize)}` : ''}
                    </p>
                  </div>
                </div>

                {/* Right — Status + Actions */}
                <div className="flex items-center gap-3 shrink-0">
                  {contract.status === 'done'
                    ? <RiskBadge score={contract.riskScore} />
                    : <StatusBadge status={contract.status} />
                  }
                  {contract.status === 'done' && (
                    <span className="text-xs text-indigo-500 font-medium hidden sm:block">
                      View Analysis →
                    </span>
                  )}
                  <button
                    onClick={(e) => handleDelete(contract._id, e)}
                    className="text-gray-300 hover:text-red-400 transition p-1">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}