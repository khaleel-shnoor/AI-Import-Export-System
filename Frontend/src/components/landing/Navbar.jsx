import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-white shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] py-2 border-slate-100' 
          : 'bg-white/95 backdrop-blur-md py-4 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo Placement: Top-Left, Clickable to Home */}
        <a href="#home" className="flex items-center gap-6 py-1 group">
          <Logo className="h-16 md:h-20" />
          <div className="hidden lg:flex flex-col -space-y-1">
            <span className="text-2xl font-black tracking-tighter text-[#0a3967]">SHNOOR</span>
            <span className="text-[0.65rem] font-bold tracking-[0.3em] text-[#64748b]">INTERNATIONAL LLC</span>
          </div>
        </a>

        {/* Navigation Bar: Right Aligned */}
        <nav className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="text-[13px] font-black uppercase tracking-[0.2em] text-[#1E3A8A]/70 hover:text-[#1E3A8A] transition-all relative py-2 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#06B6D4] transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
          
          {/* Top-Right Login Button (Cyan #06B6D4) */}
          <Link 
            to="/login" 
            className="px-8 py-3 bg-[#06B6D4] hover:bg-[#0891B2] text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#06B6D4]/20 active:scale-95 flex items-center gap-2 group"
          >
            Login
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-[#0a3967] hover:bg-slate-50 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu: Collapsible Hamburger */}
      <div className={`fixed inset-0 bg-[#1E3A8A] z-[200] transition-all duration-500 ease-in-out md:hidden ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center bg-white/5 backdrop-blur-xl border-b border-white/10">
          <Logo className="h-12 invrt" />
          <button 
            className="p-3 text-white bg-white/10 rounded-full hover:bg-white/20 transition-all active:scale-90"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={32} />
          </button>
        </div>

        <nav className="h-full flex flex-col justify-center px-10 gap-10">
          <ul className="space-y-8">
            {navLinks.map((link, i) => (
              <li 
                key={link.name}
                className={`transition-all duration-700 delay-[${i * 100}ms] ${mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
              >
                <a 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="text-4xl font-black text-white uppercase tracking-tighter hover:text-[#06B6D4] transition-colors flex items-center gap-4 group"
                >
                  <span className="text-xs font-black text-[#06B6D4] tracking-[0.3em]">0{i+1}</span>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <Link 
            to="/login" 
            onClick={() => setMobileMenuOpen(false)}
            className={`w-full py-6 bg-[#06B6D4] text-white rounded-3xl flex items-center justify-center font-black uppercase tracking-widest text-xl shadow-3xl shadow-[#06B6D4]/30 transition-all duration-700 delay-500 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            Access Core
            <ArrowRight size={24} className="ml-3" />
          </Link>
        </nav>

        {/* Decorative corner element */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#06B6D4]/10 rounded-full blur-[100px] -mr-32 -mb-32"></div>
      </div>
    </header>
  );
};

export default Navbar;
