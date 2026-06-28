import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  ShieldCheck, FileText, Zap, ArrowRight,
  CheckCircle, Star, Lock, Clock,
  TrendingUp, AlertTriangle, ChevronRight
} from 'lucide-react';

// ── Navbar ────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600
                          flex items-center justify-center shadow-lg shadow-indigo-500/25
                          group-hover:shadow-indigo-500/40 transition-shadow duration-300">
            <ShieldCheck size={16} className="text-white" />
          </div>
          <span className="text-[15px] font-semibold text-white tracking-tight">
            ContractSense
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'How it works', 'Pricing'].map(item => (
            <a key={item} href="#"
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link to="/login"
            className="text-sm text-slate-400 hover:text-white transition-colors duration-200 hidden sm:block">
            Sign in
          </Link>
          <Link to="/register"
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm
                       font-medium text-white overflow-hidden group
                       bg-gradient-to-r from-indigo-600 to-purple-600
                       hover:from-indigo-500 hover:to-purple-500
                       transition-all duration-300 shadow-lg shadow-indigo-500/25
                       hover:shadow-indigo-500/40">
            Get Started
            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

// ── Hero ──────────────────────────────────────────────
const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center
                      overflow-hidden bg-[#0a0a0f] pt-16">

    {/* Background orbs */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full
                      bg-indigo-600/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full
                      bg-purple-600/20 blur-[120px] animate-pulse
                      [animation-delay:1s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-64 h-64 rounded-full bg-violet-500/10 blur-[100px]" />
    </div>

    {/* Grid pattern */}
    <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

    <div className="relative max-w-4xl mx-auto px-6 text-center">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                      bg-indigo-500/10 border border-indigo-500/20
                      text-indigo-400 text-sm font-medium mb-8
                      hover:bg-indigo-500/15 transition-colors duration-200 cursor-default">
        <Zap size={13} className="text-indigo-400" />
        AI-Powered Contract Intelligence
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
      </div>

      {/* Headline */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight
                     text-white leading-[1.08] mb-6">
        Understand every
        <span className="block mt-1">
          contract in{' '}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400
                             bg-clip-text text-transparent">
              seconds.
            </span>
            <span className="absolute -bottom-1 left-0 right-0 h-px
                             bg-gradient-to-r from-indigo-400/0 via-violet-400/60 to-purple-400/0" />
          </span>
        </span>
      </h1>

      {/* Subheadline */}
      <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
        Upload any legal contract and get an instant AI-powered analysis —
        risk scoring, clause extraction, key deadlines, and a full PDF report.
        No lawyers needed.
      </p>

      {/* CTA Buttons */}
      <div className="flex items-center justify-center gap-4 flex-wrap mb-16">
        <Link to="/register"
          className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl
                     bg-gradient-to-r from-indigo-600 to-purple-600
                     hover:from-indigo-500 hover:to-purple-500
                     text-white font-semibold text-base
                     shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50
                     transition-all duration-300 hover:-translate-y-0.5">
          Start for free
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link to="/login"
          className="flex items-center gap-2 px-7 py-3.5 rounded-xl
                     bg-white/5 hover:bg-white/8 border border-white/10
                     hover:border-white/20 text-white font-medium text-base
                     transition-all duration-300 hover:-translate-y-0.5">
          Sign in
        </Link>
      </div>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-8 flex-wrap">
        {[
          { icon: <Lock size={13} />, text: 'Bank-level encryption' },
          { icon: <Zap size={13} />, text: 'Analysis in 30 seconds' },
          { icon: <CheckCircle size={13} />, text: 'No credit card required' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="text-slate-600">{item.icon}</span>
            {item.text}
          </div>
        ))}
      </div>

      {/* Hero visual — mock contract card */}
      <div className="mt-16 relative max-w-2xl mx-auto">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20
                        to-violet-500/20 rounded-2xl blur-xl" />
        <div className="relative bg-[#0f0f1a] border border-white/8 rounded-2xl
                        p-6 shadow-2xl shadow-black/50">

          {/* Mock header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/15 border border-indigo-500/20
                              flex items-center justify-center">
                <FileText size={16} className="text-indigo-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">service-agreement.pdf</div>
                <div className="text-xs text-slate-500 mt-0.5">Analyzed just now · 12 pages</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                            bg-amber-500/10 border border-amber-500/20">
              <AlertTriangle size={12} className="text-amber-400" />
              <span className="text-xs font-semibold text-amber-400">Medium Risk</span>
            </div>
          </div>

          {/* Mock score */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: 'Risk Score', value: '64/100', color: 'text-amber-400' },
              { label: 'Clauses', value: '23', color: 'text-indigo-400' },
              { label: 'Deadlines', value: '4', color: 'text-emerald-400' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/3 rounded-xl p-3 border border-white/5">
                <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mock clauses */}
          <div className="space-y-2.5">
            {[
              { type: 'High Risk', text: 'Non-compete clause extends to 5 years globally', color: 'text-red-400 bg-red-500/8 border-red-500/15' },
              { type: 'Warning', text: 'Automatic renewal with 90-day cancellation notice', color: 'text-amber-400 bg-amber-500/8 border-amber-500/15' },
              { type: 'Safe', text: 'Standard liability limitation to contract value', color: 'text-emerald-400 bg-emerald-500/8 border-emerald-500/15' },
            ].map((clause, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${clause.color}`}>
                <div className={`text-xs font-semibold mt-0.5 shrink-0 ${clause.color.split(' ')[0]}`}>
                  {clause.type}
                </div>
                <div className="text-xs text-slate-400 leading-relaxed">{clause.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  </section>
);

// ── Stats ─────────────────────────────────────────────
const Stats = () => (
  <section className="bg-[#0a0a0f] border-y border-white/5 py-14">
    <div className="max-w-5xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { value: '10,000+', label: 'Contracts analyzed' },
          { value: '30s', label: 'Average analysis time' },
          { value: '94%', label: 'Risk detection accuracy' },
          { value: '$0', label: 'Cost to get started' },
        ].map((stat, i) => (
          <div key={i} className="text-center group">
            <div className="text-3xl font-bold text-white mb-1
                            group-hover:bg-gradient-to-r group-hover:from-indigo-400
                            group-hover:to-purple-400 group-hover:bg-clip-text
                            group-hover:text-transparent transition-all duration-300">
              {stat.value}
            </div>
            <div className="text-sm text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Features ──────────────────────────────────────────
const Features = () => {
  const features = [
    {
      icon: <ShieldCheck size={22} className="text-indigo-400" />,
      iconBg: 'bg-indigo-500/10 border-indigo-500/20',
      title: 'AI Risk Scoring',
      description: 'Every clause is analyzed and scored 0–100 for risk. Know exactly how dangerous a contract is before you sign.',
      tags: ['Instant analysis', 'Risk levels'],
    },
    {
      icon: <FileText size={22} className="text-purple-400" />,
      iconBg: 'bg-purple-500/10 border-purple-500/20',
      title: 'Clause Extraction',
      description: 'Automatically identify non-compete, liability, termination, payment, and 15+ other clause types.',
      tags: ['15+ clause types', 'Plain English'],
    },
    {
      icon: <Clock size={22} className="text-violet-400" />,
      iconBg: 'bg-violet-500/10 border-violet-500/20',
      title: 'Deadline Detection',
      description: 'Never miss a renewal or cancellation deadline. AI extracts all time-sensitive dates with days remaining.',
      tags: ['Auto-detection', 'Days remaining'],
    },
    {
      icon: <TrendingUp size={22} className="text-cyan-400" />,
      iconBg: 'bg-cyan-500/10 border-cyan-500/20',
      title: 'PDF Report',
      description: 'Download a professional PDF report with full analysis, risk breakdown, and negotiation suggestions.',
      tags: ['Instant download', 'Share ready'],
    },
    {
      icon: <Lock size={22} className="text-emerald-400" />,
      iconBg: 'bg-emerald-500/10 border-emerald-500/20',
      title: 'Bank-Level Security',
      description: 'Your contracts are encrypted at rest and in transit. We never store your documents longer than needed.',
      tags: ['AES-256', 'Zero retention'],
    },
    {
      icon: <Zap size={22} className="text-amber-400" />,
      iconBg: 'bg-amber-500/10 border-amber-500/20',
      title: 'Multiple Formats',
      description: 'Upload PDF or DOCX contracts. Our AI handles both formats with equal accuracy and speed.',
      tags: ['PDF', 'DOCX'],
    },
  ];

  return (
    <section className="bg-[#0a0a0f] py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                          bg-indigo-500/8 border border-indigo-500/15
                          text-indigo-400 text-xs font-medium mb-4">
            Features
          </div>
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400
                             bg-clip-text text-transparent">
              review contracts
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            From risk scoring to deadline tracking — ContractSense gives you
            a complete picture of every contract in seconds.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <div key={i}
              className="group relative bg-[#0f0f1a] border border-white/6
                         rounded-2xl p-6 hover:border-white/12
                         hover:bg-[#12121f] transition-all duration-300
                         hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30">

              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                              transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(99,102,241,0.05), transparent 70%)' }} />

              <div className={`w-11 h-11 rounded-xl border ${feature.iconBg}
                               flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>

              <h3 className="text-base font-semibold text-white mb-2">
                {feature.title}
              </h3>

              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                {feature.description}
              </p>

              <div className="flex gap-2">
                {feature.tags.map(tag => (
                  <span key={tag}
                    className="text-xs px-2.5 py-1 rounded-full
                               bg-white/4 border border-white/8 text-slate-500">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// ── How It Works ──────────────────────────────────────
const HowItWorks = () => (
  <section className="bg-[#0a0a0f] py-24">
    <div className="max-w-5xl mx-auto px-6">

      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                        bg-purple-500/8 border border-purple-500/15
                        text-purple-400 text-xs font-medium mb-4">
          How it works
        </div>
        <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
          Three steps to full{' '}
          <span className="bg-gradient-to-r from-purple-400 to-violet-400
                           bg-clip-text text-transparent">
            contract clarity
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">

        {/* Connector line */}
        <div className="absolute top-8 left-1/4 right-1/4 h-px
                        bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent
                        hidden md:block" />

        {[
          {
            step: '01',
            title: 'Upload your contract',
            description: 'Drag and drop any PDF or DOCX contract. No size limit, no format restrictions.',
            icon: <FileText size={20} className="text-indigo-400" />,
          },
          {
            step: '02',
            title: 'AI analyzes instantly',
            description: 'Our AI reads every clause, scores risk levels, and extracts all key information in under 30 seconds.',
            icon: <Zap size={20} className="text-purple-400" />,
          },
          {
            step: '03',
            title: 'Review and download',
            description: 'Get your full risk report, review every clause in plain English, and download a PDF report.',
            icon: <CheckCircle size={20} className="text-emerald-400" />,
          },
        ].map((item, i) => (
          <div key={i} className="relative text-center group">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl
                            bg-gradient-to-br from-[#0f0f1a] to-[#14141f]
                            border border-white/8 flex items-center justify-center
                            group-hover:border-indigo-500/30 transition-all duration-300
                            shadow-lg shadow-black/30">
              {item.icon}
              <div className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full
                              bg-gradient-to-br from-indigo-600 to-purple-600
                              flex items-center justify-center
                              text-white text-xs font-bold shadow-lg shadow-indigo-500/30">
                {i + 1}
              </div>
            </div>
            <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs mx-auto">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Testimonials ──────────────────────────────────────
const Testimonials = () => (
  <section className="bg-[#0a0a0f] py-24 border-t border-white/5">
    <div className="max-w-5xl mx-auto px-6">

      <div className="text-center mb-14">
        <div className="flex items-center justify-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
          ))}
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Trusted by freelancers and founders
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            quote: "I found a 5-year non-compete clause buried on page 11. ContractSense flagged it in seconds. Saved me from a terrible deal.",
            name: "Sarah K.",
            role: "Freelance Designer",
            avatar: "SK",
          },
          {
            quote: "We review 50+ vendor contracts per month. This tool cut our review time from 2 hours to 10 minutes. Absolute game changer.",
            name: "Marcus T.",
            role: "Startup Founder",
            avatar: "MT",
          },
          {
            quote: "The deadline detection alone is worth it. I almost missed a 90-day cancellation window on a $40k annual contract.",
            name: "Priya M.",
            role: "Product Manager",
            avatar: "PM",
          },
        ].map((t, i) => (
          <div key={i}
            className="bg-[#0f0f1a] border border-white/6 rounded-2xl p-6
                       hover:border-white/12 transition-all duration-300
                       hover:-translate-y-0.5">
            <div className="flex gap-0.5 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={13} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-5">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br
                              from-indigo-600 to-purple-600
                              flex items-center justify-center
                              text-white text-xs font-bold shrink-0">
                {t.avatar}
              </div>
              <div>
                <div className="text-sm font-medium text-white">{t.name}</div>
                <div className="text-xs text-slate-500">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── CTA ───────────────────────────────────────────────
const CTA = () => (
  <section className="bg-[#0a0a0f] py-24">
    <div className="max-w-4xl mx-auto px-6">
      <div className="relative rounded-3xl overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-violet-600/20" />
        <div className="absolute inset-0 border border-white/8 rounded-3xl" />
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full
                        bg-indigo-600/20 blur-[80px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full
                        bg-purple-600/20 blur-[80px]" />

        <div className="relative px-8 py-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Stop signing contracts{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400
                             bg-clip-text text-transparent">
              blind.
            </span>
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
            Join thousands of freelancers and founders who use ContractSense
            to protect themselves every time they sign.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/register"
              className="group flex items-center gap-2 px-8 py-3.5 rounded-xl
                         bg-gradient-to-r from-indigo-600 to-purple-600
                         hover:from-indigo-500 hover:to-purple-500
                         text-white font-semibold text-base
                         shadow-xl shadow-indigo-500/30
                         transition-all duration-300 hover:-translate-y-0.5">
              Start for free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <CheckCircle size={15} className="text-emerald-400" />
              No credit card required
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ── Footer ────────────────────────────────────────────
const Footer = () => (
  <footer className="bg-[#0a0a0f] border-t border-white/5 py-12">
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600
                          flex items-center justify-center">
            <ShieldCheck size={14} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-white">ContractSense</span>
        </div>

        <div className="flex items-center gap-6">
          {['Privacy', 'Terms', 'Security', 'Contact'].map(item => (
            <a key={item} href="#"
              className="text-xs text-slate-500 hover:text-slate-300
                         transition-colors duration-200">
              {item}
            </a>
          ))}
        </div>

        <div className="text-xs text-slate-600">
          © {new Date().getFullYear()} ContractSense. Built by{' '}
          <a href="https://github.com/farhannaeem00" target="_blank"
            rel="noreferrer"
            className="text-slate-500 hover:text-white transition-colors">
            Farhan Naeem
          </a>
        </div>

      </div>
    </div>
  </footer>
);

// ── Main Export ───────────────────────────────────────
export default function Landing() {
  useEffect(() => {
    document.title = 'ContractSense | AI Contract Intelligence';
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}