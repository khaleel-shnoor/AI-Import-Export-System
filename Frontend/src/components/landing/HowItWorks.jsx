import React from 'react';
import { UserPlus, Upload, Cpu, TrendingUp } from 'lucide-react';

const STEPS = [
  {
    title: "Create Account",
    description: "Sign up in seconds and connect your existing ERP or logistics data sources via secure API.",
    icon: <UserPlus size={24} />,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
  },
  {
    title: "Import Data",
    description: "Upload your shipment documents. Our AI extracts key data points and identifies HSN codes automatically.",
    icon: <Upload size={24} />,
    image: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&q=80&w=2070"
  },
  {
    title: "AI Processing",
    description: "The intelligence engine analyzes routes, verifies compliance, and generates risk mitigation reports.",
    icon: <Cpu size={24} />,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070"
  },
  {
    title: "Ship & Scale",
    description: "Execute shipments with confidence. Monitor progress via the live dashboard and optimize on the go.",
    icon: <TrendingUp size={24} />,
    image: "https://images.unsplash.com/photo-1581404196904-da212c49-0cf?auto=format&fit=crop&q=80&w=2070"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-brand-blue font-bold tracking-widest uppercase text-xs">The Flow</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-brand-navy tracking-tight">
            How Shnoor powers <br /> your operations.
          </h3>
        </div>

        <div className="space-y-32">
          {STEPS.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}
            >
              <div className="flex-1 space-y-6">
                <div className="w-12 h-12 rounded-xl bg-brand-navy text-white flex items-center justify-center font-bold text-xl shadow-lg ring-4 ring-brand-navy/5">
                  {index + 1}
                </div>
                <h4 className="text-3xl font-bold text-brand-navy">{step.title}</h4>
                <p className="text-slate-500 text-lg font-medium leading-relaxed">
                  {step.description}
                </p>
                <div className="flex items-center gap-3 text-brand-blue font-bold">
                   <div className="p-2 bg-brand-blue/10 rounded-lg">
                      {step.icon}
                   </div>
                   <span>Instant Deployment</span>
                </div>
              </div>
              
              <div className="flex-1 w-full">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-brand-blue/5 rounded-[2.5rem] blur-2xl group-hover:bg-brand-blue/10 transition-all"></div>
                  <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-80 lg:h-96 object-cover hover:scale-105 transition-transform duration-[1.5s]"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
