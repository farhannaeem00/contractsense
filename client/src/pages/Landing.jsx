import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck, FileText, Zap, ArrowRight,
  CheckCircle, Star, Lock, Clock,
  TrendingUp, AlertTriangle, ChevronRight,
  Github, Twitter, Linkedin, ExternalLink,
  Menu, X, Sparkles
} from 'lucide-react';

// ── Animated Counter ──────────────────────────────────
const Counter = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime;
    const duration = 2000;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, end]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

// ── Magnetic Button ───────────────────────────────────
const MagneticBtn = ({ children, className, ...props }) => {
  const ref = useRef(null);
  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };
  const handleMouseLeave = () => {
    ref.current.style.transform = 'translate(0,0)';
    ref.current.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
  };
  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className={`inline-block transition-transform duration-100 ${className}`} {...props}>
      {children}
    </div>
  );
};

// ── Noise texture overlay ─────────────────────────────
const Noise = () => (
  <div className="pointer-events-none fixed inset-0 z-[999] opacity-[0.015]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
      backgroundSize: '128px 128px',
    }} />
);

// ── NAVBAR ────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['Features', 'How it works', 'Pricing', 'Docs'];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-0'
          : 'py-3'
      }`}>

        {/* Top announcement bar */}
        <div className={`w-full bg-gradient-to-r from-indigo-600/90 via-violet-600/90 to-purple-600/90
                         text-white text-xs font-medium text-center py-2 px-4
                         transition-all duration-500 ${scrolled ? 'opacity-0 -translate-y-full h-0 py-0 overflow-hidden' : 'opacity-100'}`}>
          <span className="flex items-center justify-center gap-2">
            <Sparkles size={12} />
            AI-powered contract analysis — free for the first 5 contracts
            <ChevronRight size={12} />
          </span>
        </div>

        {/* Main nav */}
        <div className={`transition-all duration-500 ${
          scrolled
            ? 'mx-4 mt-3 rounded-2xl bg-[#0a0a0f]/80 backdrop-blur-2xl border border-white/8 shadow-2xl shadow-black/50'
            : 'bg-transparent'
        }`}>
          <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600
                                opacity-80 group-hover:opacity-100 transition-opacity duration-300
                                blur-sm scale-110" />
                <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600
                                flex items-center justify-center shadow-lg">
                  <ShieldCheck size={15} className="text-white" />
                </div>
              </div>
              <span className="text-[15px] font-semibold text-white tracking-tight">
                Contract<span className="text-indigo-400">Sense</span>
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {links.map(link => (
                <a key={link} href="#"
                  onMouseEnter={() => setActiveLink(link)}
                  onMouseLeave={() => setActiveLink('')}
                  className="relative px-4 py-2 text-sm text-slate-400 hover:text-white
                             transition-colors duration-200 rounded-lg group">
                  <span className="relative z-10">{link}</span>
                  <div className={`absolute inset-0 rounded-lg bg-white/5 transition-opacity duration-200
                                   ${activeLink === link ? 'opacity-100' : 'opacity-0'}`} />
                </a>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login"
                className="text-sm text-slate-400 hover:text-white transition-colors duration-200 px-3 py-1.5">
                Sign in
              </Link>
              <MagneticBtn>
                <Link to="/register"
                  className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm
                             font-semibold text-white overflow-hidden group">
                  {/* Button bg */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600
                                  group-hover:from-indigo-500 group-hover:to-purple-500
                                  transition-all duration-300" />
                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                                  transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
                      backgroundSize: '200% 100%',
                      animation: 'shine 1.5s ease infinite',
                    }} />
                  <span className="relative z-10">Get started free</span>
                  <ArrowRight size={14} className="relative z-10 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </MagneticBtn>
            </div>

            {/* Mobile hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center
                         rounded-lg bg-white/5 border border-white/8
                         text-slate-400 hover:text-white transition-colors">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden mx-4 mt-2 rounded-2xl bg-[#0f0f1a]/95 backdrop-blur-2xl
                         border border-white/8 overflow-hidden
                         transition-all duration-300 ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="p-4 flex flex-col gap-1">
            {links.map(link => (
              <a key={link} href="#"
                className="px-4 py-2.5 text-sm text-slate-400 hover:text-white
                           hover:bg-white/5 rounded-xl transition-all duration-200">
                {link}
              </a>
            ))}
            <div className="border-t border-white/8 mt-2 pt-3 flex flex-col gap-2">
              <Link to="/login" className="px-4 py-2.5 text-sm text-slate-400 hover:text-white
                                          hover:bg-white/5 rounded-xl transition-all duration-200">
                Sign in
              </Link>
              <Link to="/register"
                className="px-4 py-2.5 text-sm font-semibold text-white text-center
                           bg-gradient-to-r from-indigo-600 to-purple-600
                           rounded-xl transition-all duration-200">
                Get started free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Shine keyframe */}
      <style>{`
        @keyframes shine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 1; }
          70%, 100% { transform: scale(1.2); opacity: 0; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.7s cubic-bezier(0.34,1.56,0.64,1) both; }
        .animate-slide-up-delay-1 { animation: slide-up 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.15s both; }
        .animate-slide-up-delay-2 { animation: slide-up 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.3s both; }
        .animate-slide-up-delay-3 { animation: slide-up 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.45s both; }
        .animate-fade-in { animation: fade-in 1s ease both; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delay { animation: float-delay 8s ease-in-out infinite 1s; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .gradient-text-animated {
          background: linear-gradient(270deg, #818cf8, #c084fc, #818cf8);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 4s ease infinite;
        }
        .glow-indigo { box-shadow: 0 0 40px rgba(99,102,241,0.3), 0 0 80px rgba(99,102,241,0.15); }
        .card-hover {
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(99,102,241,0.1);
        }
      `}</style>
    </>
  );
};

// ── HERO ──────────────────────────────────────────────
const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center
                        overflow-hidden bg-[#0a0a0f] pt-32">

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full
                        bg-indigo-600/25 blur-[130px] animate-float" />
        <div className="absolute -top-20 right-1/4 w-[400px] h-[400px] rounded-full
                        bg-purple-600/20 blur-[120px] animate-float-delay" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]
                        bg-violet-800/15 blur-[100px]" />

        {/* Interactive orb following mouse */}
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full
                        bg-indigo-500/10 blur-[80px] pointer-events-none transition-transform duration-700 ease-out"
          style={{ transform: `translate(calc(-50% + ${mousePos.x}px), calc(-50% + ${mousePos.y}px))` }} />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
        }} />

      {/* Rotating ring decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[800px] h-[800px] rounded-full
                      border border-indigo-500/5 animate-spin-slow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[600px] h-[600px] rounded-full
                      border border-purple-500/8 pointer-events-none"
        style={{ animation: 'spin-slow 15s linear infinite reverse' }} />

      <div className="relative max-w-5xl mx-auto px-6 text-center">

        {/* Pill badge */}
        <div className="animate-slide-up inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                        bg-white/4 border border-white/10 text-sm font-medium mb-8
                        hover:bg-white/6 transition-all duration-300 cursor-default
                        backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wide">New</span>
          </div>
          <div className="w-px h-3.5 bg-white/15" />
          <span className="text-slate-300">AI-powered contract analysis is here</span>
          <ChevronRight size={14} className="text-slate-500" />
        </div>

        {/* Main headline */}
        <h1 className="animate-slide-up-delay-1 text-[clamp(40px,7vw,80px)] font-bold
                       tracking-tight leading-[1.05] mb-6 text-white">
          Review contracts
          <br />
          <span className="gradient-text-animated">10x faster</span>
          {' '}with AI.
        </h1>

        {/* Subheadline */}
        <p className="animate-slide-up-delay-2 text-lg sm:text-xl text-slate-400
                      max-w-2xl mx-auto leading-relaxed mb-10">
          Upload any legal contract and get instant AI analysis —
          risk scoring, clause extraction, deadline detection,
          and a full PDF report. In under 30 seconds.
        </p>

        {/* CTA row */}
        <div className="animate-slide-up-delay-3 flex items-center justify-center gap-4 flex-wrap mb-6">
          <MagneticBtn>
            <Link to="/register"
              className="group relative flex items-center gap-2.5 px-8 py-4 rounded-2xl
                         text-base font-semibold text-white overflow-hidden
                         glow-indigo transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600
                              group-hover:from-indigo-500 group-hover:to-purple-500
                              transition-all duration-300" />
              <div className="absolute inset-[1px] rounded-[15px] bg-gradient-to-r
                              from-white/10 to-transparent opacity-0
                              group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Start analyzing for free</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
          </MagneticBtn>

          <Link to="/login"
            className="group flex items-center gap-2 px-8 py-4 rounded-2xl
                       text-base font-medium text-slate-300
                       bg-white/4 hover:bg-white/8
                       border border-white/8 hover:border-white/15
                       transition-all duration-300 backdrop-blur-sm">
            Sign in
            <ChevronRight size={16} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Trust row */}
        <div className="flex items-center justify-center gap-6 flex-wrap mb-16">
          {[
            { icon: <Lock size={12} />, text: 'SOC 2 Compliant' },
            { icon: <Zap size={12} />, text: '< 30 seconds' },
            { icon: <CheckCircle size={12} />, text: 'No credit card' },
            { icon: <Star size={12} />, text: '4.9 rating' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="text-slate-600">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>

        {/* Hero Card Visual */}
        <div className="animate-float relative max-w-2xl mx-auto">
          {/* Glow ring */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20
                          to-violet-500/20 rounded-3xl blur-2xl" />

          {/* Card */}
          <div className="relative bg-[#0d0d18] border border-white/10 rounded-2xl
                          overflow-hidden shadow-2xl shadow-black/60">

            {/* Card top bar */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/6
                            bg-white/2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 px-4 py-1 rounded-md
                                bg-white/4 border border-white/6 text-xs text-slate-500">
                  <div className="w-3 h-3 rounded-sm bg-indigo-500/60 flex items-center justify-center">
                    <ShieldCheck size={8} className="text-white" />
                  </div>
                  contractsense.app/analysis
                </div>
              </div>
            </div>

            {/* Card content */}
            <div className="p-6">

              {/* File info */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/25
                                  flex items-center justify-center">
                    <FileText size={18} className="text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">service-agreement-2024.pdf</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      12 pages · Analyzed 2 seconds ago
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                                bg-amber-500/10 border border-amber-500/20 shrink-0">
                  <AlertTriangle size={11} className="text-amber-400" />
                  <span className="text-xs font-semibold text-amber-400">Medium Risk</span>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: 'Risk Score', value: '64', suffix: '/100', color: 'from-amber-500/20 to-amber-600/20 border-amber-500/20', text: 'text-amber-400' },
                  { label: 'Clauses Found', value: '23', suffix: '', color: 'from-indigo-500/20 to-indigo-600/20 border-indigo-500/20', text: 'text-indigo-400' },
                  { label: 'Deadlines', value: '4', suffix: '', color: 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/20', text: 'text-emerald-400' },
                ].map((stat, i) => (
                  <div key={i} className={`bg-gradient-to-br ${stat.color} border rounded-xl p-3.5`}>
                    <div className={`text-xl font-bold ${stat.text}`}>
                      {stat.value}
                      <span className="text-xs font-normal opacity-60">{stat.suffix}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Clause list */}
              <div className="space-y-2">
                {[
                  { type: 'High Risk', severity: 'bg-red-500/10 border-red-500/20', tag: 'text-red-400 bg-red-500/15', text: 'Non-compete extends to 5 years globally — unusual and enforceable' },
                  { type: 'Warning', severity: 'bg-amber-500/8 border-amber-500/20', tag: 'text-amber-400 bg-amber-500/15', text: 'Auto-renewal with 90-day cancellation window required' },
                  { type: 'Info', severity: 'bg-blue-500/8 border-blue-500/20', tag: 'text-blue-400 bg-blue-500/15', text: 'Liability cap set to total contract value — standard clause' },
                ].map((clause, i) => (
                  <div key={i}
                    className={`flex items-start gap-3 p-3 rounded-xl border ${clause.severity}
                                transition-transform duration-200 hover:scale-[1.01] cursor-default`}>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${clause.tag}`}>
                      {clause.type}
                    </span>
                    <span className="text-xs text-slate-400 leading-relaxed">{clause.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <div className="absolute -left-12 top-1/3 animate-float-delay hidden lg:block">
            <div className="bg-[#0f0f1a] border border-white/10 rounded-2xl px-4 py-3
                            shadow-xl shadow-black/40 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/20
                                flex items-center justify-center">
                  <CheckCircle size={14} className="text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Analysis complete</div>
                  <div className="text-[10px] text-slate-500">28 seconds</div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -right-10 bottom-1/3 animate-float hidden lg:block">
            <div className="bg-[#0f0f1a] border border-white/10 rounded-2xl px-4 py-3
                            shadow-xl shadow-black/40 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-red-500/15 border border-red-500/20
                                flex items-center justify-center">
                  <AlertTriangle size={14} className="text-red-400" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">3 risks flagged</div>
                  <div className="text-[10px] text-slate-500">Review before signing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ── Stats ─────────────────────────────────────────────
const Stats = () => (
  <section className="relative py-20 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 via-purple-600/5 to-violet-600/5" />
    <div className="absolute inset-y-0 left-0 right-0 border-y border-white/5" />
    <div className="relative max-w-5xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { end: 10000, suffix: '+', label: 'Contracts analyzed', color: 'text-indigo-400' },
          { end: 30, suffix: 's', label: 'Avg analysis time', color: 'text-purple-400' },
          { end: 94, suffix: '%', label: 'Risk accuracy', color: 'text-violet-400' },
          { end: 5000, suffix: '+', label: 'Happy users', color: 'text-cyan-400' },
        ].map((stat, i) => (
          <div key={i} className="text-center group cursor-default">
            <div className={`text-4xl font-bold mb-1.5 ${stat.color}
                            group-hover:scale-110 transition-transform duration-300 inline-block`}>
              <Counter end={stat.end} suffix={stat.suffix} />
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
      icon: <ShieldCheck size={22} />,
      gradient: 'from-indigo-500 to-violet-600',
      glow: 'rgba(99,102,241,0.2)',
      title: 'AI Risk Scoring',
      description: 'Every clause is analyzed and scored 0–100 for risk. Know exactly how dangerous a contract is before you sign.',
    },
    {
      icon: <FileText size={22} />,
      gradient: 'from-purple-500 to-pink-600',
      glow: 'rgba(168,85,247,0.2)',
      title: 'Clause Extraction',
      description: 'Automatically identify non-compete, liability, termination, payment, and 15+ other clause types.',
    },
    {
      icon: <Clock size={22} />,
      gradient: 'from-violet-500 to-indigo-600',
      glow: 'rgba(139,92,246,0.2)',
      title: 'Deadline Detection',
      description: 'Never miss a renewal or cancellation deadline. AI extracts all time-sensitive dates with days remaining.',
    },
    {
      icon: <TrendingUp size={22} />,
      gradient: 'from-cyan-500 to-blue-600',
      glow: 'rgba(6,182,212,0.2)',
      title: 'PDF Reports',
      description: 'Download a professional PDF report with full analysis, risk breakdown, and negotiation suggestions.',
    },
    {
      icon: <Lock size={22} />,
      gradient: 'from-emerald-500 to-teal-600',
      glow: 'rgba(16,185,129,0.2)',
      title: 'Bank-Level Security',
      description: 'Your contracts are encrypted at rest and in transit. We never store your documents longer than needed.',
    },
    {
      icon: <Zap size={22} />,
      gradient: 'from-amber-500 to-orange-600',
      glow: 'rgba(245,158,11,0.2)',
      title: 'Multi-Format Support',
      description: 'Upload PDF or DOCX contracts. Our AI handles both formats with equal accuracy and speed.',
    },
  ];

  return (
    <section className="bg-[#0a0a0f] py-28">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                          bg-indigo-500/8 border border-indigo-500/15
                          text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-5">
            Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
            Everything you need to{' '}
            <span className="gradient-text-animated">
              review contracts
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            From risk scoring to deadline tracking — a complete AI-powered contract intelligence suite.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <div key={i}
              className="card-hover group relative bg-[#0d0d18] border border-white/6
                         rounded-2xl p-6 cursor-default overflow-hidden">

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                              transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 30% 30%, ${feature.glow}, transparent 70%)` }} />

              {/* Icon */}
              <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient}
                               flex items-center justify-center text-white mb-5 shadow-lg
                               group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
                <div className="absolute inset-0 rounded-xl bg-white/10" />
              </div>

              <h3 className="text-base font-semibold text-white mb-2.5 group-hover:text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Bottom border glow on hover */}
              <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${feature.gradient}
                               opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── How It Works ──────────────────────────────────────
const HowItWorks = () => (
  <section className="bg-[#0a0a0f] py-28 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[800px] h-[400px] bg-indigo-900/10 blur-[100px] rounded-full" />
    </div>

    <div className="relative max-w-5xl mx-auto px-6">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                        bg-purple-500/8 border border-purple-500/15
                        text-purple-400 text-xs font-semibold uppercase tracking-widest mb-5">
          How it works
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          From upload to insight{' '}
          <span className="gradient-text-animated">in 30 seconds</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Connector */}
        <div className="absolute top-12 left-[calc(33%+24px)] right-[calc(33%+24px)] h-px
                        bg-gradient-to-r from-indigo-500/40 via-purple-500/40 to-violet-500/40
                        hidden md:block" />

        {[
          {
            step: '01',
            title: 'Upload your contract',
            description: 'Drag and drop any PDF or DOCX. No size limits, no restrictions.',
            icon: <FileText size={24} />,
            gradient: 'from-indigo-600 to-indigo-700',
            glow: 'shadow-indigo-500/40',
          },
          {
            step: '02',
            title: 'AI reads everything',
            description: 'Our AI reads every clause, scores risks, and extracts all key dates and terms.',
            icon: <Zap size={24} />,
            gradient: 'from-purple-600 to-violet-700',
            glow: 'shadow-purple-500/40',
          },
          {
            step: '03',
            title: 'Review and download',
            description: 'Get your full risk report in plain English. Download a PDF summary instantly.',
            icon: <CheckCircle size={24} />,
            gradient: 'from-violet-600 to-purple-700',
            glow: 'shadow-violet-500/40',
          },
        ].map((item, i) => (
          <div key={i} className="relative group text-center">

            {/* Number bubble */}
            <div className={`relative w-20 h-20 mx-auto mb-6 rounded-2xl
                             bg-gradient-to-br ${item.gradient}
                             flex items-center justify-center text-white
                             shadow-xl ${item.glow}
                             group-hover:scale-110 transition-transform duration-300`}>
              <div className="absolute inset-0 rounded-2xl bg-white/10" />
              <span className="relative z-10">{item.icon}</span>
              <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full
                              bg-[#0a0a0f] border border-white/15
                              flex items-center justify-center
                              text-xs font-bold text-white">
                {i + 1}
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
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
  <section className="bg-[#0a0a0f] py-28 border-t border-white/5">
    <div className="max-w-6xl mx-auto px-6">

      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-0.5 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
          ))}
        </div>
        <h2 className="text-4xl font-bold text-white tracking-tight mb-3">
          Loved by{' '}
          <span className="gradient-text-animated">5,000+ users</span>
        </h2>
        <p className="text-slate-400">Real stories from real users who avoided costly contract mistakes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            quote: "Found a 5-year global non-compete buried on page 11. ContractSense flagged it in seconds. Saved me from a career-ending deal.",
            name: "Sarah K.",
            role: "Freelance Designer",
            avatar: "SK",
            gradient: 'from-indigo-500 to-purple-600',
          },
          {
            quote: "We review 50+ vendor contracts per month. Cut our review time from 2 hours to 10 minutes. The ROI is insane.",
            name: "Marcus T.",
            role: "Startup Founder",
            avatar: "MT",
            gradient: 'from-purple-500 to-pink-600',
          },
          {
            quote: "The deadline detection alone is worth it. Almost missed a 90-day cancellation window on a $40k annual contract.",
            name: "Priya M.",
            role: "Product Manager",
            avatar: "PM",
            gradient: 'from-violet-500 to-indigo-600',
          },
        ].map((t, i) => (
          <div key={i}
            className="card-hover group bg-[#0d0d18] border border-white/6 rounded-2xl p-6 relative overflow-hidden">

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                            transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 50% 0%, rgba(99,102,241,0.06), transparent 60%)' }} />

            <div className="flex gap-0.5 mb-5">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={13} className="text-amber-400 fill-amber-400" />
              ))}
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6 relative z-10">
              &ldquo;{t.quote}&rdquo;
            </p>

            <div className="flex items-center gap-3 relative z-10">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient}
                               flex items-center justify-center text-white text-xs font-bold
                               shadow-lg shrink-0`}>
                {t.avatar}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{t.name}</div>
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
  <section className="bg-[#0a0a0f] py-28">
    <div className="max-w-4xl mx-auto px-6">
      <div className="relative rounded-3xl overflow-hidden border border-white/8">

        {/* Animated gradient bg */}
        <div className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.15), rgba(139,92,246,0.15))',
          }} />
        <div className="absolute inset-0 bg-[#0a0a0f]/60" />

        {/* Orbs */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full
                        bg-indigo-600/25 blur-[80px]" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full
                        bg-purple-600/25 blur-[80px]" />

        {/* Dot pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }} />

        <div className="relative px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                          bg-white/6 border border-white/10
                          text-slate-300 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Join 5,000+ professionals
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-5">
            Stop signing contracts
            <br />
            <span className="gradient-text-animated">blind.</span>
          </h2>

          <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto">
            Your next contract could cost you — or protect you.
            The difference is 30 seconds with ContractSense.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <MagneticBtn>
              <Link to="/register"
                className="group relative flex items-center gap-2.5 px-9 py-4 rounded-2xl
                           text-base font-bold text-white overflow-hidden
                           shadow-2xl shadow-indigo-500/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600
                                group-hover:from-indigo-500 group-hover:to-purple-500 transition-all duration-300" />
                <span className="relative z-10">Start for free — no card needed</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticBtn>
          </div>

          <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
            {['Free for first 5 contracts', '30-second analysis', 'Cancel anytime'].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-slate-500">
                <CheckCircle size={12} className="text-emerald-500" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ── FOOTER ────────────────────────────────────────────
const Footer = () => (
  <footer className="bg-[#0a0a0f] border-t border-white/5">

    {/* Main footer */}
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

        {/* Brand column */}
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2.5 mb-4 group w-fit">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600
                              opacity-60 blur-sm scale-110 group-hover:opacity-80 transition-opacity" />
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600
                              flex items-center justify-center">
                <ShieldCheck size={17} className="text-white" />
              </div>
            </div>
            <span className="text-base font-bold text-white tracking-tight">
              Contract<span className="text-indigo-400">Sense</span>
            </span>
          </Link>

          <p className="text-sm text-slate-400 leading-relaxed mb-5 max-w-xs">
            AI-powered contract intelligence for freelancers, founders,
            and teams who want to sign smarter.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              { icon: <Github size={16} />, href: 'https://github.com/farhannaeem00' },
              { icon: <Twitter size={16} />, href: '#' },
              { icon: <Linkedin size={16} />, href: '#' },
            ].map((social, i) => (
              <a key={i} href={social.href} target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/4 border border-white/8
                           flex items-center justify-center text-slate-400
                           hover:text-white hover:bg-white/8 hover:border-white/15
                           transition-all duration-200">
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        {[
          {
            title: 'Product',
            links: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
          },
          {
            title: 'Company',
            links: ['About', 'Blog', 'Careers', 'Press'],
          },
          {
            title: 'Legal',
            links: ['Privacy', 'Terms', 'Security', 'Cookies'],
          },
        ].map((col, i) => (
          <div key={i}>
            <div className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
              {col.title}
            </div>
            <div className="flex flex-col gap-3">
              {col.links.map(link => (
                <a key={link} href="#"
                  className="text-sm text-slate-400 hover:text-white
                             transition-colors duration-200 flex items-center gap-1.5 group w-fit">
                  {link}
                  <ExternalLink size={11} className="opacity-0 group-hover:opacity-100
                                                      transition-opacity duration-200" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-600">
            © {new Date().getFullYear()} ContractSense. All rights reserved.
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            Built with
            <span className="text-red-400 animate-pulse">♥</span>
            by{' '}
            <a href="https://github.com/farhannaeem00" target="_blank" rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors duration-200">
              Farhan Naeem
            </a>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                          bg-emerald-500/8 border border-emerald-500/15">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-emerald-400 font-medium">All systems operational</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

// ── Main Export ───────────────────────────────────────
export default function Landing() {
  useEffect(() => {
    document.title = 'ContractSense | AI Contract Intelligence';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] antialiased">
      <Noise />
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