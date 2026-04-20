import React from 'react';
import { ArrowRight, Search, Globe, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] -mr-64 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] -ml-48 -mb-32"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/5 border border-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
              </span>
              AI-Powered Trade Intelligence
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-brand-navy leading-tight tracking-tight">
              Master Global Trade with <span className="text-brand-blue">AI Logic.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              The only end-to-end OS for modern exporters. Automate HSN classification, track shipments in real-time, and mitigate risks with predictive analytics.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button className="w-full sm:w-auto bg-brand-navy text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group">
                Get Started Free
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto bg-white border border-slate-200 text-brand-navy px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group">
                <Search size={20} className="text-slate-400 group-hover:text-brand-blue transition-colors" />
                Track Shipment
              </button>
            </div>

            <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 opacity-60">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                <Globe size={18} />
                Global Network
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                <Shield size={18} />
                Security Verified
              </div>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-xl lg:max-w-none">
            {/* Dashboard Mockup / Image */}
            <div className="relative z-10 rounded-[2.5rem] p-4 bg-slate-100 border border-white shadow-2xl overflow-hidden glass-card">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2070" 
                alt="AI Logistics Dashboard" 
                className="rounded-[2rem] shadow-sm w-full h-auto object-cover"
              />
              {/* Floating Element */}
              <div className="absolute top-1/2 left-0 -translate-x-10 -translate-y-1/2 p-6 bg-white rounded-3xl shadow-2xl border border-slate-100 hidden md:block">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                       <Shield size={24} />
                    </div>
                    <div>
                       <p className="text-xs font-bold text-slate-400 uppercase">HSN Verified</p>
                       <p className="text-lg font-black text-slate-900">99.9% Accuracy</p>
                    </div>
                 </div>
              </div>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-blue/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
