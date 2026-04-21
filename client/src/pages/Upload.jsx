import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import {
  ShieldCheck, Upload as UploadIcon,
  FileText, X, ArrowLeft, CheckCircle
} from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

// ─── Format File Size ────────────────────────────────
const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default function Upload() {
  const [file, setFile]       = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate              = useNavigate();

  // ── Dropzone Config ──
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      toast.error('Only PDF or DOCX files under 10MB are allowed');
      return;
    }
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
    },
    maxFiles: 1,
    maxSize:  10 * 1024 * 1024, // 10MB
  });

  const removeFile = (e) => {
    e.stopPropagation();
    setFile(null);
  };

  const handleUpload = async () => {
    if (!file) return toast.error('Please select a file first');

    setLoading(true);
    try {
      const form = new FormData();
      form.append('contract', file);

      const { data } = await api.post('/contracts', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Contract uploaded! Analyzing...');
      navigate(`/analysis/${data.contractId}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Navbar ── */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-indigo-600" size={22} />
            <span className="text-xl font-bold text-gray-900">ContractSense</span>
          </div>
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* ── Header ── */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Upload Your Contract
          </h1>
          <p className="text-gray-500">
            Our AI will analyze every clause and give you a full risk report
            in under 60 seconds.
          </p>
        </div>

        {/* ── Upload Card ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition
              ${isDragActive
                ? 'border-indigo-400 bg-indigo-50'
                : file
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
              }`}
          >
            <input {...getInputProps()} />

            {file ? (
              // File selected state
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="text-green-500" size={28} />
                </div>
                <p className="font-semibold text-gray-800">File Ready</p>
                <p className="text-sm text-gray-400">
                  Click below to change or remove
                </p>
              </div>
            ) : isDragActive ? (
              // Drag active state
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center">
                  <UploadIcon className="text-indigo-500" size={28} />
                </div>
                <p className="font-semibold text-indigo-600">Drop it here!</p>
              </div>
            ) : (
              // Default state
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center">
                  <UploadIcon className="text-gray-400" size={28} />
                </div>
                <div>
                  <p className="font-semibold text-gray-700">
                    Drag & drop your contract here
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    or click to browse your files
                  </p>
                </div>
                <p className="text-xs text-gray-300 mt-2">
                  PDF or DOCX · Max 10MB
                </p>
              </div>
            )}
          </div>

          {/* ── Selected File Info ── */}
          {file && (
            <div className="mt-4 flex items-center gap-3 bg-gray-50 rounded-xl p-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                <FileText className="text-indigo-500" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {formatSize(file.size)}
                </p>
              </div>
              <button
                onClick={removeFile}
                className="text-gray-300 hover:text-red-400 transition p-1"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {/* ── Upload Button ── */}
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="mt-6 w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold
                       hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed
                       transition text-base flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <UploadIcon size={20} />
                Analyze Contract
              </>
            )}
          </button>

          {/* ── What Happens Next ── */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
              What happens next
            </p>
            <div className="flex flex-col gap-2">
              {[
                'Your contract is uploaded securely',
                'AI reads and extracts all clauses',
                'Each clause is scored for risk',
                'Full report ready in under 60 seconds',
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle size={14} className="text-green-400 shrink-0" />
                  {step}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}