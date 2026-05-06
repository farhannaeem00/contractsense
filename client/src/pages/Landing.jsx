import { Link } from 'react-router-dom';
import { ShieldCheck, FileSearch, Clock, Download, ArrowRight, CheckCircle } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';


// ─── Feature Card ────────────────────────────────────
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition">
    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
  </div>
);

// ─── Step Card ───────────────────────────────────────
const StepCard = ({ number, title, description }) => (
  <div className="flex gap-4">
    <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
      {number}
    </div>
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

// ─── Main Landing Page ───────────────────────────────
export default function Landing() {
  usePageTitle('AI Contract Intelligence');
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Navbar ── */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-indigo-600" size={24} />
            <span className="text-xl font-bold text-gray-900">ContractSense</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 text-sm font-medium px-4 py-2 rounded-full mb-6">
          <ShieldCheck size={16} />
          AI-Powered Contract Intelligence
        </div>

        <h1 className="text-5xl font-black text-gray-900 leading-tight mb-6">
          Understand Any Contract
          <span className="text-indigo-600"> In Seconds</span>
        </h1>

        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Upload any contract and our AI instantly identifies risky clauses,
          extracts key deadlines, and gives you a plain-English breakdown —
          no lawyer needed.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            to="/register"
            className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition font-semibold text-lg shadow-lg shadow-indigo-200"
          >
            Analyze Your Contract Free
            <ArrowRight size={20} />
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-50 transition font-semibold text-lg border border-gray-200"
          >
            Sign In
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
          {['No credit card required', 'Free to use', 'PDF & DOCX supported'].map((item) => (
            <div key={item} className="flex items-center gap-2 text-gray-400 text-sm">
              <CheckCircle size={16} className="text-green-500" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need to Stay Protected
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Stop signing contracts you don't understand. ContractSense gives
            you the intelligence to negotiate confidently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<FileSearch className="text-indigo-600" size={24} />}
            title="AI Clause Analysis"
            description="Every clause analyzed and rated Low, Medium, or High risk with plain-English explanations."
          />
          <FeatureCard
            icon={<ShieldCheck className="text-indigo-600" size={24} />}
            title="Risk Score"
            description="Get an instant 0-100 risk score so you know at a glance how dangerous a contract is."
          />
          <FeatureCard
            icon={<Clock className="text-indigo-600" size={24} />}
            title="Deadline Tracker"
            description="Never miss a renewal date or notice period. All key dates extracted automatically."
          />
          <FeatureCard
            icon={<Download className="text-indigo-600" size={24} />}
            title="PDF Reports"
            description="Download a full analysis report to share with your team or keep for your records."
          />
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-white border-y border-gray-100 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-500">
              From upload to full analysis in under 60 seconds.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <StepCard
              number="1"
              title="Upload Your Contract"
              description="Drag and drop any PDF or DOCX contract file. Up to 10MB supported."
            />
            <StepCard
              number="2"
              title="AI Analyzes Every Clause"
              description="Our AI reads the entire contract, identifies all clauses, and scores each one for risk."
            />
            <StepCard
              number="3"
              title="Review Your Results"
              description="See a full breakdown with risk scores, plain-English explanations, and negotiation suggestions."
            />
            <StepCard
              number="4"
              title="Download Your Report"
              description="Export a professional PDF report with the complete analysis to share or keep."
            />
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-black text-gray-900 mb-4">
          Ready to Protect Yourself?
        </h2>
        <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
          Join thousands of freelancers and businesses who use ContractSense
          to review contracts with confidence.
        </p>
        <Link
          to="/register"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-10 py-4 rounded-xl hover:bg-indigo-700 transition font-semibold text-lg shadow-lg shadow-indigo-200"
        >
          Get Started Free
          <ArrowRight size={20} />
        </Link>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-8 text-center text-gray-400 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <ShieldCheck className="text-indigo-600" size={18} />
          <span className="font-semibold text-gray-700">ContractSense</span>
        </div>
        <p>© {new Date().getFullYear()} ContractSense. Built with AI to protect your rights.</p>
      </footer>

    </div>
  );
}