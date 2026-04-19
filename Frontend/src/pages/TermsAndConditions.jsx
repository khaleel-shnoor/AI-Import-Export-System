import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, AlertTriangle, CheckSquare, Globe, Scale, Clock, Ban, Mail } from 'lucide-react';

const TermsAndConditions = () => {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50 px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">S</div>
          <span className="font-black text-xl tracking-tight text-slate-900 uppercase">Shnoor</span>
        </Link>
        <Link to="/" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-12 px-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-slate-900 text-white rounded-xl">
            <Scale size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Terms &amp; Conditions</h1>
            <p className="text-sm text-slate-400 font-bold">Last updated: April 17, 2026</p>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
          <p className="text-amber-800 font-medium text-sm leading-relaxed">
            <strong>Important:</strong> Please read these Terms and Conditions carefully before using the Shnoor platform. By accessing or using our services, you agree to be bound by these terms. If you disagree with any part of these terms, you may not access the service.
          </p>
        </div>
        <p className="text-slate-500 font-medium leading-relaxed border-b border-slate-100 pb-8">
          These Terms and Conditions ("Terms") constitute a legally binding agreement between you (the user or the organisation you represent) and Shnoor International Logistics Group ("Shnoor", "we", "us", or "our"), governing your access to and use of the Shnoor AI-powered logistics platform and all associated services.
        </p>
      </section>

      {/* Content */}
      <section className="px-8 pb-20 max-w-4xl mx-auto space-y-10">

        {/* 1. Company Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><FileText size={18} /></div>
            <h2 className="text-xl font-black text-slate-900">1. Company Information</h2>
          </div>
          <div className="pl-11 space-y-3 text-slate-600 font-medium leading-relaxed">
            <p>Shnoor International Logistics Group is a technology company registered in the United Arab Emirates, operating a software-as-a-service (SaaS) platform for international trade, logistics management, and AI-driven compliance.</p>
            <p><strong className="text-slate-800">Registered Name:</strong> Shnoor International Logistics Group LLC</p>
            <p><strong className="text-slate-800">Registered Office:</strong> Shnoor Tower, Trade City Complex, Dubai, United Arab Emirates</p>
            <p><strong className="text-slate-800">Trade License:</strong> Issued by the Dubai Department of Economic Development</p>
            <p><strong className="text-slate-800">Email:</strong> <a href="mailto:legal@shnoor.com" className="text-blue-600 font-bold hover:underline">legal@shnoor.com</a></p>
          </div>
        </div>

        {/* 2. Acceptance of Terms */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><CheckSquare size={18} /></div>
            <h2 className="text-xl font-black text-slate-900">2. Acceptance of Terms</h2>
          </div>
          <div className="pl-11 space-y-3 text-slate-600 font-medium leading-relaxed">
            <p>By registering for, accessing, or using the Shnoor platform, you confirm that:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>You are at least 18 years of age</li>
              <li>You have the legal authority to enter into binding contracts on behalf of yourself or your organisation</li>
              <li>You have read, understood, and agree to be bound by these Terms and our Privacy Policy</li>
              <li>All information you provide during registration and use of the platform is accurate and current</li>
            </ul>
          </div>
        </div>

        {/* 3. Platform Services */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Globe size={18} /></div>
            <h2 className="text-xl font-black text-slate-900">3. Platform Services</h2>
          </div>
          <div className="pl-11 space-y-3 text-slate-600 font-medium leading-relaxed">
            <p>Shnoor provides the following core services through its platform:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-slate-800">AI Document Processing:</strong> Optical character recognition (OCR) and automated extraction of data from trade documents including invoices, bills of lading, and certificates of origin</li>
              <li><strong className="text-slate-800">HSN Classification:</strong> AI-powered prediction and verification of Harmonised System Nomenclature (HSN) codes for trade compliance</li>
              <li><strong className="text-slate-800">Shipment Intelligence:</strong> Real-time tracking, predictive analytics, and status monitoring across multiple carriers and modes of transport</li>
              <li><strong className="text-slate-800">Duty &amp; Risk Analysis:</strong> Automated duty estimation, trade route risk scoring, and compliance flag generation</li>
              <li><strong className="text-slate-800">AI Assistance:</strong> 24/7 intelligent chatbot for trade queries, document guidance, and platform support</li>
            </ul>
            <p>Shnoor reserves the right to modify, suspend, or discontinue any aspect of the platform at any time with reasonable notice to users.</p>
          </div>
        </div>

        {/* 4. User Accounts */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-violet-50 text-violet-600 rounded-lg"><FileText size={18} /></div>
            <h2 className="text-xl font-black text-slate-900">4. User Accounts &amp; Credentials</h2>
          </div>
          <div className="pl-11 space-y-3 text-slate-600 font-medium leading-relaxed">
            <p>To access the Platform, you must create an account. You are responsible for:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Maintaining the confidentiality of your login credentials</li>
              <li>All activities that occur under your account</li>
              <li>Immediately notifying Shnoor of any unauthorised use of your account</li>
              <li>Ensuring your account information is current and accurate at all times</li>
              <li>Not sharing credentials with third parties or allowing concurrent access by multiple users under a single individual account</li>
            </ul>
            <p>Shnoor is not liable for any loss or damage arising from your failure to maintain adequate account security.</p>
          </div>
        </div>

        {/* 5. Acceptable Use */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><AlertTriangle size={18} /></div>
            <h2 className="text-xl font-black text-slate-900">5. Acceptable Use Policy</h2>
          </div>
          <div className="pl-11 space-y-3 text-slate-600 font-medium leading-relaxed">
            <p>You agree to use the Shnoor platform only for lawful purposes and in a manner that does not infringe the rights of others. You must not:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Upload false, fraudulent, or misleading trade documents or data</li>
              <li>Use the platform to facilitate illegal trade, sanctions evasion, or customs fraud</li>
              <li>Attempt to reverse-engineer, decompile, or extract source code from the platform</li>
              <li>Perform automated scraping, crawling, or data harvesting without prior written consent</li>
              <li>Introduce malware, viruses, or any malicious code into the system</li>
              <li>Circumvent, disable, or interfere with security-related features of the platform</li>
              <li>Use the platform in any way that could damage, overburden, or impair our servers or networks</li>
              <li>Resell, sublicense, or redistribute platform access without authorisation</li>
            </ul>
          </div>
        </div>

        {/* 6. AI Services Disclaimer */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg"><AlertTriangle size={18} /></div>
            <h2 className="text-xl font-black text-slate-900">6. AI Services &amp; Accuracy Disclaimer</h2>
          </div>
          <div className="pl-11 space-y-3 text-slate-600 font-medium leading-relaxed">
            <p>Shnoor's AI-powered services (including HSN classification, OCR extraction, and risk scoring) are provided to assist trade professionals. Users acknowledge and agree that:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>AI-generated classifications, codes, and assessments are <strong className="text-slate-800">suggestions only</strong> and do not constitute legal or customs advice</li>
              <li>Final determination of HSN codes, duty rates, and compliance obligations rests with the user and/or their licensed customs broker</li>
              <li>Shnoor does not guarantee 100% accuracy of AI outputs and accepts no liability for decisions made solely on the basis of AI-generated results</li>
              <li>Users should always verify AI outputs against current official customs tariff schedules and regulations of the relevant jurisdiction</li>
              <li>Shnoor continuously improves its models but cannot guarantee output consistency during model updates</li>
            </ul>
          </div>
        </div>

        {/* 7. Intellectual Property */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Scale size={18} /></div>
            <h2 className="text-xl font-black text-slate-900">7. Intellectual Property</h2>
          </div>
          <div className="pl-11 space-y-3 text-slate-600 font-medium leading-relaxed">
            <p>The Shnoor platform, including its source code, AI models, design, trademarks, and all content created by Shnoor, is the exclusive intellectual property of Shnoor International Logistics Group. You are granted a limited, non-exclusive, non-transferable licence to use the platform for its intended purpose.</p>
            <p>You retain ownership of all data and documents you upload to the platform. By uploading content, you grant Shnoor a limited licence to process that content solely for the purpose of delivering the requested services.</p>
          </div>
        </div>

        {/* 8. Subscription & Payment */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg"><CheckSquare size={18} /></div>
            <h2 className="text-xl font-black text-slate-900">8. Subscription &amp; Payment Terms</h2>
          </div>
          <div className="pl-11 space-y-3 text-slate-600 font-medium leading-relaxed">
            <ul className="list-disc list-inside space-y-2">
              <li>Access to certain features requires a paid subscription. Pricing is published on our website and may be updated with 30 days notice</li>
              <li>Subscriptions auto-renew unless cancelled at least 7 days before the renewal date</li>
              <li>All fees are exclusive of applicable taxes (VAT, GST, etc.) which will be added at the point of sale</li>
              <li>Refunds are considered on a case-by-case basis; please contact billing@shnoor.com within 14 days of a charge</li>
              <li>Failure to pay may result in suspension or termination of account access</li>
            </ul>
          </div>
        </div>

        {/* 9. Limitation of Liability */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 text-red-600 rounded-lg"><Ban size={18} /></div>
            <h2 className="text-xl font-black text-slate-900">9. Limitation of Liability</h2>
          </div>
          <div className="pl-11 space-y-3 text-slate-600 font-medium leading-relaxed">
            <p>To the fullest extent permitted by applicable law, Shnoor International Logistics Group shall not be liable for:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Any indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, business, or goodwill</li>
              <li>Customs penalties or duties arising from reliance on AI-generated HSN codes or classifications</li>
              <li>Service interruptions due to force majeure events, third-party service failures, or maintenance</li>
              <li>Unauthorised access to your account due to inadequate security practices on your part</li>
            </ul>
            <p>Shnoor's total aggregate liability arising under or in connection with these Terms shall not exceed the total fees paid by you in the 12 months preceding the claim.</p>
          </div>
        </div>

        {/* 10. Termination */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 text-slate-600 rounded-lg"><Clock size={18} /></div>
            <h2 className="text-xl font-black text-slate-900">10. Termination</h2>
          </div>
          <div className="pl-11 space-y-3 text-slate-600 font-medium leading-relaxed">
            <p>Either party may terminate the agreement:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-slate-800">By the user:</strong> Cancel your subscription and close your account at any time through account settings</li>
              <li><strong className="text-slate-800">By Shnoor:</strong> We may suspend or terminate access immediately if you breach these Terms, engage in fraudulent activity, or pose a risk to other users or the platform</li>
              <li>Upon termination, your right to access the platform ceases immediately; data will be retained per our Privacy Policy retention schedule</li>
            </ul>
          </div>
        </div>

        {/* 11. Governing Law */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Globe size={18} /></div>
            <h2 className="text-xl font-black text-slate-900">11. Governing Law &amp; Dispute Resolution</h2>
          </div>
          <div className="pl-11 space-y-3 text-slate-600 font-medium leading-relaxed">
            <p>These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates, specifically the laws of the Emirate of Dubai. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.</p>
            <p>Before initiating formal proceedings, both parties agree to attempt resolution through good-faith negotiation for a minimum of 30 days.</p>
          </div>
        </div>

        {/* 12. Contact */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg"><Mail size={18} /></div>
            <h2 className="text-xl font-black text-slate-900">12. Contact &amp; Notices</h2>
          </div>
          <div className="pl-11 space-y-3 text-slate-600 font-medium leading-relaxed">
            <p>For any questions regarding these Terms, please contact:</p>
            <ul className="space-y-1">
              <li><strong className="text-slate-800">Legal Team:</strong> <a href="mailto:legal@shnoor.com" className="text-blue-600 font-bold hover:underline">legal@shnoor.com</a></li>
              <li><strong className="text-slate-800">General Support:</strong> <a href="mailto:support@shnoor.com" className="text-blue-600 font-bold hover:underline">support@shnoor.com</a></li>
              <li><strong className="text-slate-800">Address:</strong> Shnoor International Logistics Group, Trade City Complex, Dubai, UAE</li>
            </ul>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            <strong className="text-slate-700">Changes to These Terms:</strong> We reserve the right to modify these Terms at any time. Material changes will be communicated via email and a platform notification at least 30 days before taking effect. Your continued use of the platform after the effective date constitutes acceptance of the revised Terms.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
          <p className="text-sm text-blue-800 font-medium leading-relaxed">
            <strong>Related Policies:</strong> Please also read our <Link to="/privacy" className="font-bold underline">Privacy Policy</Link> for information on how we handle your personal data. Together, these documents form the complete agreement between you and Shnoor International Logistics Group.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 px-8 text-center">
        <div className="flex items-center justify-center gap-6 text-xs font-bold text-slate-500 uppercase tracking-widest flex-wrap">
          <p>© 2026 Shnoor International Logistics Group. All rights reserved.</p>
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
};

export default TermsAndConditions;
