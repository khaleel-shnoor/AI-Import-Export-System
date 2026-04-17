import React, { useState } from 'react';
import { 
  Zap, 
  FileText, 
  Package, 
  Tag, 
  Calculator, 
  AlertTriangle, 
  BarChart3, 
  Check, 
  ArrowRight,
  Globe,
  ShieldCheck,
  Zap as Flash
} from 'lucide-react';

const LandingPage = ({ onLaunch, onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen w-full bg-white font-sans overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="w-full bg-[#1a2744] text-white flex items-center justify-between px-8 py-5 shrink-0 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <img 
            src="/shnoor-logo.png" 
            alt="Shnoor" 
            className="h-8 object-contain"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span className="text-xl font-bold font-serif tracking-wide">
            SHNOOR INTERNATIONAL IMPORT EXPORT AI
          </span>
        </div>
        <div className="flex items-center gap-8 text-sm font-medium">
          <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
          <a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a>
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <button 
            onClick={onLaunch}
            className="px-6 py-2.5 bg-[#2563eb] hover:bg-blue-600 text-white rounded transition-colors font-semibold"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="w-full bg-[#1a2744] flex flex-col items-center justify-center text-center px-4 py-28 relative">
        <div className="inline-block px-4 py-1.5 border border-teal-500 rounded-full mb-8">
          <span className="text-xs text-teal-400 font-medium tracking-wider uppercase">
            Powered by GPT-4o + OCR Engine
          </span>
        </div>

        {/* USE THE PROVIDED LOGO IN THE ABOVE HERO */}
        <div className="mb-8">
          <img 
            src="/shnoor-logo.png" 
            alt="Shnoor International Logo" 
            className="h-32 md:h-40 object-contain mx-auto"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif tracking-tight">
          SHNOOR INTERNATIONAL
        </h1>
        <h2 className="text-2xl md:text-3xl text-blue-300 mb-6 font-serif">
          Import & Export AI Intelligence Platform
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mb-12 leading-relaxed">
          Automate your trade workflows — from invoice extraction to HSN classification, duty calculation, and shipment management. All in one intelligent platform.
        </p>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={onLaunch}
            className="px-8 py-3.5 bg-[#2563eb] hover:bg-blue-600 text-white font-semibold rounded transition-colors text-lg"
          >
            Get Started — Login
          </button>
          <a 
            href="#about"
            className="px-8 py-3.5 bg-transparent border-2 border-white hover:bg-white hover:text-[#1a2744] text-white font-semibold rounded transition-colors text-lg"
          >
            Learn More
          </a>
        </div>
      </main>



      {/* About Section */}
      <section id="about" className="bg-gray-50 py-24 px-8 w-full">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-[#1a2744] font-serif">About Shnoor International</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Shnoor International is a global import-export company operating across 100+ countries, specializing in trade compliance, logistics intelligence, shipment management, and AI-powered customs documentation. 
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                By leveraging advanced digital transformation and artificial intelligence, we ensure reliability and compliance across complex global trade networks. Our platform is designed to streamline operations, reduce compliance risks, and provide actionable insights for international supply chains.
              </p>
            </div>
            <div className="bg-white p-8 border border-gray-200 shadow-sm rounded">
              <ul className="space-y-6">
                <li className="flex flex-col">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Founded</span>
                  <span className="text-lg text-[#1a2744] font-medium">2025</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Headquarters</span>
                  <span className="text-lg text-[#1a2744] font-medium">10009 Mount Tabor Road, Odessa, Missouri, United States</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Services</span>
                  <span className="text-lg text-[#1a2744] font-medium">Import/Export, Trade Compliance, AI Documentation</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Contact</span>
                  <span className="text-lg text-[#2563eb] font-medium">info@shnoor.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white py-24 px-8 w-full">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#1a2744] font-serif">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-gray-200 bg-gray-50 rounded shadow-sm hover:shadow-md transition-shadow">
              <FileText className="w-10 h-10 text-[#2563eb] mb-6" />
              <h3 className="text-xl font-bold mb-3 text-[#1a2744] font-serif">Document Processing</h3>
              <p className="text-gray-600 leading-relaxed">Upload invoices, extract data with AI OCR</p>
            </div>
            <div className="p-8 border border-gray-200 bg-gray-50 rounded shadow-sm hover:shadow-md transition-shadow">
              <Package className="w-10 h-10 text-[#2563eb] mb-6" />
              <h3 className="text-xl font-bold mb-3 text-[#1a2744] font-serif">Shipment Management</h3>
              <p className="text-gray-600 leading-relaxed">Track and manage all your shipments</p>
            </div>
            <div className="p-8 border border-gray-200 bg-gray-50 rounded shadow-sm hover:shadow-md transition-shadow">
              <Tag className="w-10 h-10 text-[#2563eb] mb-6" />
              <h3 className="text-xl font-bold mb-3 text-[#1a2744] font-serif">HSN Classification</h3>
              <p className="text-gray-600 leading-relaxed">AI assigns correct HS codes instantly</p>
            </div>
            <div className="p-8 border border-gray-200 bg-gray-50 rounded shadow-sm hover:shadow-md transition-shadow">
              <Calculator className="w-10 h-10 text-[#2563eb] mb-6" />
              <h3 className="text-xl font-bold mb-3 text-[#1a2744] font-serif">Duty Calculation</h3>
              <p className="text-gray-600 leading-relaxed">Auto-calculate duties, taxes, and landed cost</p>
            </div>
            <div className="p-8 border border-gray-200 bg-gray-50 rounded shadow-sm hover:shadow-md transition-shadow">
              <AlertTriangle className="w-10 h-10 text-[#2563eb] mb-6" />
              <h3 className="text-xl font-bold mb-3 text-[#1a2744] font-serif">Risk Assessment</h3>
              <p className="text-gray-600 leading-relaxed">Flag high-risk shipments before they ship</p>
            </div>
            <div className="p-8 border border-gray-200 bg-gray-50 rounded shadow-sm hover:shadow-md transition-shadow">
              <BarChart3 className="w-10 h-10 text-[#2563eb] mb-6" />
              <h3 className="text-xl font-bold mb-3 text-[#1a2744] font-serif">Analytics</h3>
              <p className="text-gray-600 leading-relaxed">Revenue, cost, and profit trends at a glance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="features" className="bg-gray-50 py-24 px-8 w-full">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-10 text-[#1a2744] font-serif">Why Choose Shnoor International</h2>
          <ul className="space-y-6 text-lg text-gray-700">
            <li className="flex items-center gap-4 bg-white p-4 border border-gray-200 rounded shadow-sm">
              <div className="bg-green-100 p-2 rounded-full shrink-0">
                <Check className="w-6 h-6 text-[#16a34a]" />
              </div>
              <span className="font-medium">End-to-end trade documentation automation</span>
            </li>
            <li className="flex items-center gap-4 bg-white p-4 border border-gray-200 rounded shadow-sm">
              <div className="bg-green-100 p-2 rounded-full shrink-0">
                <Check className="w-6 h-6 text-[#16a34a]" />
              </div>
              <span className="font-medium">Real-time shipment tracking and compliance</span>
            </li>
            <li className="flex items-center gap-4 bg-white p-4 border border-gray-200 rounded shadow-sm">
              <div className="bg-green-100 p-2 rounded-full shrink-0">
                <Check className="w-6 h-6 text-[#16a34a]" />
              </div>
              <span className="font-medium">AI-powered HSN and duty classification</span>
            </li>
            <li className="flex items-center gap-4 bg-white p-4 border border-gray-200 rounded shadow-sm">
              <div className="bg-green-100 p-2 rounded-full shrink-0">
                <Check className="w-6 h-6 text-[#16a34a]" />
              </div>
              <span className="font-medium">Trusted by importers and exporters across 100+ countries</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-white py-20 px-8 w-full border-t border-gray-200">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-sm font-bold tracking-[0.2em] mb-12 text-gray-500 uppercase">OUR PARTNERS</h2>
          <div className="flex flex-wrap justify-center gap-12 items-center">
            <div className="px-6 py-3 border border-gray-200 rounded text-gray-600 font-bold bg-gray-50 text-lg shadow-sm">Google Partner</div>
            <div className="px-6 py-3 border border-gray-200 rounded text-gray-600 font-bold bg-gray-50 text-lg shadow-sm">SEMrush</div>
            <div className="px-6 py-3 border border-gray-200 rounded text-gray-600 font-bold bg-gray-50 text-lg shadow-sm">Meta Business Partner</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a2744] py-16 px-8 w-full border-t border-gray-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <h4 className="text-white font-bold mb-4 font-serif text-xl">Shnoor International</h4>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Global import-export company specializing in trade compliance, logistics intelligence, and AI documentation.
            </p>
            <p className="text-gray-400 text-sm mb-2">10009 Mount Tabor Road</p>
            <p className="text-gray-400 text-sm mb-4">Odessa, Missouri, United States</p>
            <p className="text-[#2563eb] text-sm font-medium">info@shnoor.com</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 font-serif text-lg">Other Services</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>Cloud Management</li>
              <li>Enterprise Management</li>
              <li>Data & AI</li>
              <li>Consulting & Staffing</li>
              <li>Background Verification</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 font-serif text-lg">For Clients</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>Browse Services</li>
              <li>Client Login</li>
              <li>Get a Quote</li>
              <li>Trade Alerts</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 font-serif text-lg">Connect With Us</h4>
            <div className="flex gap-4 mb-4">
              <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center text-white hover:bg-blue-600 transition-colors cursor-pointer">In</div>
              <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center text-white hover:bg-blue-600 transition-colors cursor-pointer">Fb</div>
              <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center text-white hover:bg-blue-600 transition-colors cursor-pointer">Ig</div>
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 text-sm">
          <div className="text-gray-500 mb-4 md:mb-0">
            © 2025 Shnoor International LLC. All rights reserved.
          </div>
          <div className="flex gap-6 text-gray-400">
            <button onClick={() => onNavigate('Privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => onNavigate('Terms')} className="hover:text-white transition-colors">Terms & Conditions</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
