import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShieldCheck, ArrowLeft, Download, AlertTriangle,
  AlertCircle, CheckCircle, Calendar, FileText
} from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import usePageTitle from '../hooks/usePageTitle';


// ─── Risk Config ─────────────────────────────────────
const riskConfig = {
  high: {
    border: 'border-red-200',
    bg:     'bg-red-50',
    badge:  'bg-red-100 text-red-600',
    icon:   <AlertTriangle className="text-red-500 shrink-0" size={18} />,
  },
  medium: {
    border: 'border-yellow-200',
    bg:     'bg-yellow-50',
    badge:  'bg-yellow-100 text-yellow-600',
    icon:   <AlertCircle className="text-yellow-500 shrink-0" size={18} />,
  },
  low: {
    border: 'border-green-200',
    bg:     'bg-green-50',
    badge:  'bg-green-100 text-green-600',
    icon:   <CheckCircle className="text-green-500 shrink-0" size={18} />,
  },
};

// ─── Risk Score Color ─────────────────────────────────
const scoreColor = (score) => {
  if (score >= 70) return 'text-red-500';
  if (score >= 40) return 'text-yellow-500';
  return 'text-green-500';
};

// ─── Risk Score Label ─────────────────────────────────
const scoreLabel = (score) => {
  if (score >= 70) return 'High Risk';
  if (score >= 40) return 'Medium Risk';
  return 'Low Risk';
};

// ─── Deadline Status Color ───────────────────────────
const deadlineColor = (status) => {
  if (status === 'expired')   return 'bg-red-50 border-red-200 text-red-600';
  if (status === 'due today') return 'bg-red-50 border-red-200 text-red-600';
  if (status === 'due soon')  return 'bg-yellow-50 border-yellow-200 text-yellow-600';
  if (status === 'upcoming')  return 'bg-blue-50 border-blue-200 text-blue-600';
  return 'bg-gray-50 border-gray-200 text-gray-600';
};

// ─── Analyzing State ─────────────────────────────────
const AnalyzingState = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-6">
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center max-w-md w-full mx-4">
      <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Analyzing Your Contract
      </h2>
      <p className="text-gray-500 text-sm leading-relaxed">
        Our AI is reading every clause, identifying risks, and
        extracting key deadlines. This takes 20–40 seconds.
      </p>
      <div className="mt-6 flex flex-col gap-2">
        {[
          'Extracting contract text...',
          'Identifying clauses...',
          'Scoring risk levels...',
          'Processing deadlines...',
        ].map((step, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
            {step}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Error State ─────────────────────────────────────
const ErrorState = ({ message }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-12 text-center max-w-md w-full mx-4">
      <AlertTriangle className="text-red-400 mx-auto mb-4" size={48} />
      <h2 className="text-xl font-bold text-gray-900 mb-2">Analysis Failed</h2>
      <p className="text-gray-500 text-sm mb-6">{message || 'Something went wrong during analysis.'}</p>
      <Link
        to="/upload"
        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition font-medium text-sm"
      >
        Try Again
      </Link>
    </div>
  </div>
);

// ─── Main Analysis Page ───────────────────────────────
export default function Analysis() {
  usePageTitle('Contract Analysis');

  const { id }                    = useParams();
  const [contract, setContract]   = useState(null);
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState('clauses');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchContract();
  }, [id]);

  // Poll every 4 seconds while analyzing
  useEffect(() => {
    if (!contract || contract.status !== 'analyzing') return;
    const interval = setInterval(fetchContract, 4000);
    return () => clearInterval(interval);
  }, [contract]);

  const fetchContract = async () => {
    try {
      const { data } = await api.get(`/contracts/${id}`);
      setContract(data.data);
    } catch {
      toast.error('Failed to load analysis');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fixed download — uses axios with token
  const handleDownload = async () => {
    setDownloading(true);
    const toastId = toast.loading('Preparing report...');
    try {
      const response = await api.get(`/reports/${id}`, {
        responseType: 'blob',
      });

      const url  = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href  = url;
      link.setAttribute('download', `contractsense-report-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.dismiss(toastId);
      toast.success('Report downloaded!');
    } catch {
      toast.dismiss(toastId);
      toast.error('Failed to download report');
    } finally {
      setDownloading(false);
    }
  };

  // ── Loading ──
  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  // ── Analyzing ──
  if (!contract || contract.status === 'analyzing') return <AnalyzingState />;

  // ── Error ──
  if (contract.status === 'error') return <ErrorState message={contract.errorMessage} />;

  // ── Clause counts ──
  const highCount   = contract.clauses?.filter(c => c.risk === 'high').length   || 0;
  const mediumCount = contract.clauses?.filter(c => c.risk === 'medium').length || 0;
  const lowCount    = contract.clauses?.filter(c => c.risk === 'low').length    || 0;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Navbar ── */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-indigo-600" size={22} />
            <span className="text-xl font-bold text-gray-900">ContractSense</span>
          </div>
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition"
          >
            <ArrowLeft size={16} /> Dashboard
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
              <FileText className="text-indigo-500" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{contract.fileName}</h1>
              <p className="text-gray-400 text-sm mt-0.5">
                Analyzed on {new Date(contract.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </p>
            </div>
          </div>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-2 border border-indigo-200 text-indigo-600 px-4 py-2.5
                       rounded-xl hover:bg-indigo-50 transition text-sm font-medium
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={16} />
            {downloading ? 'Downloading...' : 'Download Report'}
          </button>
        </div>

        {/* ── Risk Score Card ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <p className={`text-6xl font-black ${scoreColor(contract.riskScore)}`}>
                {contract.riskScore}
              </p>
              <p className="text-xs text-gray-400 mt-1">out of 100</p>
            </div>
            <div className="flex-1 min-w-0">
              <span className={`text-sm font-bold ${scoreColor(contract.riskScore)}`}>
                {scoreLabel(contract.riskScore)}
              </span>
              <p className="text-gray-600 text-sm leading-relaxed mt-1">
                {contract.summary}
              </p>
            </div>
          </div>

          {/* Clause Count Badges */}
          <div className="flex gap-3 mt-5 pt-5 border-t border-gray-100 flex-wrap">
            <span className="flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-xs font-semibold">
              <AlertTriangle size={12} /> {highCount} High Risk
            </span>
            <span className="flex items-center gap-1.5 bg-yellow-50 text-yellow-600 px-3 py-1.5 rounded-full text-xs font-semibold">
              <AlertCircle size={12} /> {mediumCount} Medium Risk
            </span>
            <span className="flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1.5 rounded-full text-xs font-semibold">
              <CheckCircle size={12} /> {lowCount} Low Risk
            </span>
            <span className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-xs font-semibold">
              <Calendar size={12} /> {contract.deadlines?.length || 0} Deadlines
            </span>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 shadow-sm mb-6 w-fit">
          {['clauses', 'deadlines'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition capitalize
                ${activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
                }`}
            >
              {tab === 'clauses'
                ? `Clauses (${contract.clauses?.length || 0})`
                : `Deadlines (${contract.deadlines?.length || 0})`
              }
            </button>
          ))}
        </div>

        {/* ── Clauses Tab ── */}
        {activeTab === 'clauses' && (
          <div className="flex flex-col gap-4">
            {contract.clauses?.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400">
                No clauses found in this contract.
              </div>
            ) : (
              [...contract.clauses]
                .sort((a, b) => {
                  const order = { high: 0, medium: 1, low: 2 };
                  return order[a.risk] - order[b.risk];
                })
                .map((clause, i) => {
                  const cfg = riskConfig[clause.risk] || riskConfig.low;
                  return (
                    <div key={i} className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-5`}>
                      {/* Clause Header */}
                      <div className="flex items-center gap-2 mb-3">
                        {cfg.icon}
                        <span className="font-semibold text-gray-900">{clause.title}</span>
                        <span className={`ml-auto text-xs px-2.5 py-1 rounded-full font-semibold ${cfg.badge}`}>
                          {clause.risk.toUpperCase()}
                        </span>
                      </div>

                      {/* Original Text */}
                      <div className="bg-white bg-opacity-60 rounded-xl p-3 mb-3">
                        <p className="text-xs text-gray-400 font-medium mb-1">ORIGINAL CLAUSE</p>
                        <p className="text-sm text-gray-600 italic leading-relaxed">
                          "{clause.text}"
                        </p>
                      </div>

                      {/* Explanation */}
                      <div className="mb-2">
                        <p className="text-xs text-gray-400 font-medium mb-1">WHY THIS MATTERS</p>
                        <p className="text-sm text-gray-700 leading-relaxed">{clause.explanation}</p>
                      </div>

                      {/* Suggestion */}
                      <div className="mt-3 pt-3 border-t border-white border-opacity-60">
                        <p className="text-xs text-gray-400 font-medium mb-1">SUGGESTION</p>
                        <p className="text-sm text-green-700 leading-relaxed font-medium">
                          {clause.suggestion}
                        </p>
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        )}

        {/* ── Deadlines Tab ── */}
        {activeTab === 'deadlines' && (
          <div>
            {contract.deadlines?.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400">
                <Calendar size={40} className="mx-auto mb-3 opacity-30" />
                <p>No deadlines found in this contract.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contract.deadlines.map((d, i) => (
                  <div key={i} className={`rounded-2xl border p-5 ${deadlineColor(d.status)}`}>
                    <div className="flex items-start gap-3">
                      <Calendar size={20} className="shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm">{d.label}</p>
                        <p className="text-lg font-bold mt-1">{d.date}</p>
                        <p className="text-xs mt-1 opacity-75">
                          {d.daysRemaining === null
                            ? 'Invalid date'
                            : d.daysRemaining < 0
                              ? `Expired ${Math.abs(d.daysRemaining)} days ago`
                              : d.daysRemaining === 0
                                ? 'Due today'
                                : `${d.daysRemaining} days remaining`
                          }
                        </p>
                        <span className="inline-block text-xs font-semibold mt-2 px-2 py-0.5 bg-white bg-opacity-50 rounded-full capitalize">
                          {d.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}