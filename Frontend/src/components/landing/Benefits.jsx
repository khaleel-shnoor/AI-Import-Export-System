import React from 'react';
import { TrendingUp, Clock, Shield, DollarSign, Users, Globe } from 'lucide-react';

const BENEFITS = [
  {
    title: "Increased Efficiency",
    description: "Automate manual data entry and classification to save over 40 hours per month for your operations team.",
    icon: <Clock size={24} />,
    stat: "40 hrs/mo"
  },
  {
    title: "Cost Reduction",
    description: "Identify the most cost-effective shipping routes and avoid unnecessary duties with smart HSN mapping.",
    icon: <DollarSign size={24} />,
    stat: "22% Saved"
  },
  {
    title: "Risk Mitigation",
    description: "Predict delays and compliance issues before they happen, reducing penalties and port storage fees.",
    icon: <Shield size={24} />,
    stat: "99% Secure"
  },
  {
    title: "Global Scalability",
    description: "Easily expand into new markets with built-in support for customs regulations in 200+ jurisdictions.",
    icon: <Globe size={24} />,
    stat: "200+ Regions"
  }
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          <div className="flex-1 space-y-8">
            <h2 className="text-brand-blue font-bold tracking-widest uppercase text-xs">The Advantage</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-brand-navy tracking-tight leading-tight">
              Why leading enterprises <br className="hidden md:block" /> trust the Shnoor ecosystem.
            </h3>
            <p className="text-slate-500 text-lg font-medium">
              We don't just provide software; we provide a strategic platform to help your business dominate global trade with data-driven confidence.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
               <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-3xl font-black text-brand-navy mb-1">5,000+</div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Active Users</p>
               </div>
               <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-3xl font-black text-brand-navy mb-1">60+</div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Countries Covered</p>
               </div>
            </div>

            <button className="bg-brand-blue text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-brand-blue/20">
               Partner With Us
            </button>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {BENEFITS.map((benefit, index) => (
              <div 
                key={index} 
                className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-6">
                  {benefit.icon}
                </div>
                <div className="text-2xl font-black text-brand-blue mb-2">{benefit.stat}</div>
                <h4 className="text-xl font-bold text-brand-navy mb-3">{benefit.title}</h4>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
