import { Link } from 'react-router-dom';
import { ShieldCheck, Home, FileText } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';

export default function NotFound() {
  usePageTitle('404 - Page Not Found');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-2">
          <ShieldCheck className="text-indigo-600" size={22} />
          <span className="text-xl font-bold text-gray-900">ContractSense</span>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">

          {/* 404 Number */}
          <div className="relative mb-8">
            <p className="text-[150px] font-black text-gray-100 leading-none
                           select-none">
              404
            </p>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-indigo-50 rounded-2xl
                              flex items-center justify-center border
                              border-indigo-100">
                <FileText className="text-indigo-400" size={36} />
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Page Not Found
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            The page you are looking for does not exist or has been moved.
            Let us get you back on track.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link to="/"
              className="flex items-center gap-2 bg-indigo-600 text-white
                         px-6 py-3 rounded-xl hover:bg-indigo-700 transition
                         font-medium text-sm">
              <Home size={16} /> Go Home
            </Link>
            <Link to="/dashboard"
              className="flex items-center gap-2 bg-white text-gray-700
                         px-6 py-3 rounded-xl hover:bg-gray-50 transition
                         font-medium text-sm border border-gray-200">
              <ShieldCheck size={16} /> Dashboard
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}