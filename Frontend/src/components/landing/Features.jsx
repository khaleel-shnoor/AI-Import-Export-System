import React from 'react';
import { MapPin, AlertCircle, Search, ArrowRight, Zap, Target, Box } from 'lucide-react';

const FEATURE_DATA = [
  {
    title: "Omni-Channel Tracking",
    description: "Unified visibility across sea, air, and land. Track every milestone with real-time GPS and port data feeds.",
    icon: <MapPin size={28} />,
    color: "bg-blue-500",
    lightColor: "bg-blue-50 text-blue-600"
  },
  {
    title: "AI Risk Analysis",
    description: "Identify potential delays, port congestions, and compliance risks before they impact your bottom line.",
    icon: <AlertCircle size={28} />,
    color: "bg-amber-500",
    lightColor: "bg-amber-50 text-amber-600"
  },
  {
    title: "HSN Classification",
    description: "Proprietary AI engine for instant, accurate HSN mapping across 200+ jurisdictions. Minimal effort, zero errors.",
    icon: <Search size={28} />,
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50 text-emerald-600"
  },
  {
    title: "Document Automation",
    description: "Automate Bills of Lading, Packing Lists, and Commercial Invoices with OCR-enabled smart processing.",
    icon: <Box size={28} />,
    color: "bg-violet-500",
    lightColor: "bg-violet-50 text-violet-600"
  },
  {
    title: "Smart Targeting",
    description: "Optimize shipping routes based on cost, speed, and real-time carrier performance metrics.",
    icon: <Target size={28} />,
    color: "bg-rose-500",
    lightColor: "bg-rose-50 text-rose-600"
  },
  {
    title: "Instant Velocity",
    description: "Reduce transit times by up to 15% with data-driven predictive arrival estimation.",
    icon: <Zap size={28} />,
    color: "bg-cyan-500",
    lightColor: "bg-cyan-50 text-cyan-600"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-brand-blue font-bold tracking-widest uppercase text-xs">Core Intelligence</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-brand-navy tracking-tight">
            High-performance tools for <br className="hidden md:block" /> global trade operations.
          </h3>
          <p className="text-slate-500 text-lg font-medium">
            Everything you need to move goods across borders, faster and smarter than ever before.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURE_DATA.map((feature, index) => (
            <div 
              key={index} 
              className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-brand-blue/20 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 ${feature.lightColor}`}>
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-brand-navy mb-3">{feature.title}</h4>
              <p className="text-slate-500 font-medium leading-relaxed mb-6">
                {feature.description}
              </p>
              <button className="flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-brand-blue transition-colors group">
                Learn More
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
