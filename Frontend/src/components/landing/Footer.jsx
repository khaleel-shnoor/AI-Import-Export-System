import React from 'react';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="space-y-6">
            <Logo className="h-20 transition-all hover:scale-105" />
            <p className="text-slate-500 font-medium max-w-sm leading-relaxed">
              Shnoor International LLC provides professional strategic solutions with a focus on global trade excellence and business credibility.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h5 className="text-[10px] font-black text-[#0a3967] uppercase tracking-[0.3em]">Company</h5>
              <ul className="space-y-4 text-slate-500 font-bold text-sm">
                <li><a href="#home" className="hover:text-blue-600 transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-blue-600 transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-blue-600 transition-colors">Services</a></li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h5 className="text-[10px] font-black text-[#0a3967] uppercase tracking-[0.3em]">Support</h5>
              <ul className="space-y-4 text-slate-500 font-bold text-sm">
                <li><a href="#contact" className="hover:text-blue-600 transition-colors">Help Center</a></li>
                <li><a href="#contact" className="hover:text-blue-600 transition-colors">Contact Panel</a></li>
                <li><a href="mailto:shnoor@gmail.com" className="hover:text-blue-600 transition-colors text-blue-600">shnoor@gmail.com</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h5 className="text-[10px] font-black text-[#0a3967] uppercase tracking-[0.3em]">Operations</h5>
              <ul className="space-y-4 text-slate-500 font-bold text-sm">
                 <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    Verified HQ
                 </li>
                 <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    Global Services
                 </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            © {currentYear} Shnoor International LLC. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-bold text-[#0a3967] uppercase tracking-widest">
             <a href="#" className="hover:underline underline-offset-4">Legal Disclaimer</a>
             <a href="#" className="hover:underline underline-offset-4">Privacy Standards</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
