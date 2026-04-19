import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Database, Globe, Mail, Clock, FileText, AlertTriangle } from 'lucide-react';

const PrivacyPolicy = () => {
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
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Shield size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
            <p className="text-sm text-slate-400 font-bold">Last updated: April 17, 2026</p>
          </div>
        </div>
        <p className="text-slate-500 font-medium leading-relaxed border-b border-slate-100 pb-8">
          Shnoor International Logistics Group ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered logistics platform. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access the platform.
        </p>
      </section>

      {/* Content */}
      <section className="px-8 pb-20 max-w-4xl mx-auto space-y-10">

        {/* 1. Company Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><FileText size={18} /></div>
            <h2 className="text-xl font-black text-slate-900">1. About Shnoor International Logistics Group</h2>
          </div>
          <div className="pl-11 space-y-3 text-slate-600 font-medium leading-relaxed">
            <p>Shnoor International Logistics Group is an AI-powered trade and logistics technology company incorporated in the United Arab Emirates, with operational offices in Dubai, UAE. We provide enterprise-grade software solutions for import/export businesses, freight forwarders, customs brokers, and supply chain professionals globally.</p>
            <p><strong className="text-slate-800">Registered Address:</strong> Shnoor Tower, Trade City Complex, Dubai, United Arab Emirates</p>
            <p><strong className="text-slate-800">Data Controller Contact:</strong> <a href="mailto:privacy@shnoor.com" className="text-blue-600 font-bold hover:underline">privacy@shnoor.com</a></p>
            <p><strong className="text-slate-800">Platform Scope:</strong> This policy applies to the Shnoor web platform, APIs, AI services (HSN classification, OCR document processing, shipment intelligence), and all associated services provided by Shnoor International Logistics Group.</p>
          </div>
        </div>

        {/* 2. Information We Collect */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Database size={18} /></div>
            <h2 className="text-xl font-black text-slate-900">2. Information We Collect</h2>
          </div>
          <div className="pl-11 space-y-3 text-slate-600 font-medium leading-relaxed">
            <p><strong className="text-slate-800">Personal Information:</strong> When you register for an account, we collect your name, email address, phone number, company name, and role designation.</p>
            <p><strong className="text-slate-800">Shipment Data:</strong> We process shipment details including product descriptions, HSN codes, origin/destination countries, quantities, unit prices, and total values that you submit through our platform.</p>
            <p><strong className="text-slate-800">Document Data:</strong> When you upload shipping documents (invoices, bills of lading, certificates of origin, packing lists), our AI-powered OCR system extracts text and metadata for classification and compliance purposes.</p>
            <p><strong className="text-slate-800">Financial Data:</strong> We may collect duty estimates, declared values, and transaction-related data for risk assessment and compliance reporting. We do not store payment card details directly; these are handled by certified payment processors.</p>
            <p><strong className="text-slate-800">Usage Data:</strong> We automatically collect information about how you interact with our platform, including IP addresses, browser type and version, device information, pages visited, actions taken, and session timestamps.</p>
            <p><strong className="text-slate-800">Communication Data:</strong> If you contact our support team or Shnoor AI assistant, we may retain records of those communications to improve our services and resolve disputes.</p>
          </div>
        </div>

        {/* 3. How We Use Your Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Eye size={18} /></div>
            <h2 className="text-xl font-black text-slate-900">3. How We Use Your Information</h2>
          </div>
          <div className="pl-11 space-y-2 text-slate-600 font-medium leading-relaxed">
            <ul className="list-disc list-inside space-y-2">
              <li>To provide, operate, and maintain our AI logistics platform</li>
              <li>To process and classify shipment documents using our AI/ML models</li>
              <li>To generate HSN code predictions, duty estimations, and risk assessments</li>
              <li>To provide real-time shipment tracking and predictive analytics</li>
              <li>To improve our machine learning models for higher accuracy and compliance coverage</li>
              <li>To communicate with you about account updates, security alerts, and service changes</li>
              <li>To comply with legal obligations and regulatory requirements in international trade</li>
              <li>To detect, prevent, and address technical issues, fraud, and security violations</li>
              <li>To conduct internal analytics for platform improvement and feature development</li>
              <li>To send relevant marketing communications where you have given consent</li>
            </ul>
          </div>
        </div>

        {/* 4. Data Security */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-violet-50 text-violet-600 rounded-lg"><Lock size={18} /></div>
            <h2 className="text-xl font-black text-slate-900">4. Data Security</h2>
          </div>
          <div className="pl-11 space-y-3 text-slate-600 font-medium leading-relaxed">
            <p>We implement industry-standard and enterprise-grade security measures to protect your data:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>End-to-end encryption for all data in transit (TLS 1.3)</li>
              <li>AES-256 encryption for data at rest</li>
              <li>Role-based access control (RBAC) for platform users and administrators</li>
              <li>Regular security audits and third-party penetration testing (annually)</li>
              <li>Secure password hashing using bcrypt algorithms with salting</li>
              <li>JWT-based authentication with configurable token expiration</li>
              <li>Multi-factor authentication (MFA) available for all enterprise accounts</li>
              <li>Regular automated vulnerability scans and dependency audits</li>
              <li>Data backed up daily with geographic redundancy across multiple cloud regions</li>
            </ul>
            <p className="mt-2">While we use commercially reasonable efforts to protect your data, no security system is impenetrable. In the event of a data breach that poses a risk to your rights, we will notify you within 72 hours as required by applicable regulations.</p>
          </div>
        </div>

        {/* 5. Data Retention */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Clock size={18} /></div>
            <h2 className="text-xl font-black text-slate-900">5. Data Retention</h2>
          </div>
          <div className="pl-11 space-y-3 text-slate-600 font-medium leading-relaxed">
            <p>We retain your personal data for as long as your account is active or as needed to provide services:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-slate-800">Account Data:</strong> Retained for the duration of your account, plus 2 years after closure for legal compliance</li>
              <li><strong className="text-slate-800">Shipment Records:</strong> Retained for 7 years to meet international customs and trade law retention requirements</li>
              <li><strong className="text-slate-800">Uploaded Documents:</strong> Retained for 5 years unless deleted earlier by the user (subject to regulatory requirements)</li>
              <li><strong className="text-slate-800">Usage Logs:</strong> Retained for 12 months, then anonymized for analytics</li>
              <li><strong className="text-slate-800">Support Communications:</strong> Retained for 3 years</li>
            </ul>
            <p>You may request deletion of your account and associated data at any time, subject to legal retention obligations.</p>
          </div>
        </div>

        {/* 6. Data Sharing & Third Parties */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Globe size={18} /></div>
            <h2 className="text-xl font-black text-slate-900">6. Data Sharing &amp; Third Parties</h2>
          </div>
          <div className="pl-11 space-y-3 text-slate-600 font-medium leading-relaxed">
            <p>We do not sell your personal information. We may share data with:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-slate-800">Customs Authorities:</strong> When required by law for trade compliance and duty calculation</li>
              <li><strong className="text-slate-800">Shipping Partners:</strong> Limited shipment data necessary for tracking and delivery confirmation</li>
              <li><strong className="text-slate-800">AI Service Providers:</strong> Anonymized document data for model improvement (with your explicit consent)</li>
              <li><strong className="text-slate-800">Cloud Infrastructure:</strong> We use enterprise cloud providers (with DPA agreements in place) for hosting and compute</li>
              <li><strong className="text-slate-800">Legal Requirements:</strong> When required by court order or regulatory bodies in applicable jurisdictions</li>
              <li><strong className="text-slate-800">Business Transfers:</strong> In the event of a merger, acquisition, or sale, user data may be transferred as a business asset with prior notice</li>
            </ul>
          </div>
        </div>

        {/* 7. Cookies */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-50 text-pink-600 rounded-lg"><AlertTriangle size={18} /></div>
            <h2 className="text-xl font-black text-slate-900">7. Cookies &amp; Tracking Technologies</h2>
          </div>
          <div className="pl-11 space-y-3 text-slate-600 font-medium leading-relaxed">
            <p>We use cookies and similar tracking technologies to enhance your experience:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-slate-800">Essential Cookies:</strong> Required for authentication, session management, and core platform functionality</li>
              <li><strong className="text-slate-800">Analytics Cookies:</strong> Help us understand how the platform is used (can be opted out)</li>
              <li><strong className="text-slate-800">Preference Cookies:</strong> Store your display settings and dashboard preferences</li>
            </ul>
            <p>You can control cookie preferences through your browser settings or the cookie settings panel in your account. Disabling essential cookies may affect platform functionality.</p>
          </div>
        </div>

        {/* 8. Your Rights */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg"><Mail size={18} /></div>
            <h2 className="text-xl font-black text-slate-900">8. Your Rights</h2>
          </div>
          <div className="pl-11 space-y-3 text-slate-600 font-medium leading-relaxed">
            <p>Under applicable data protection laws (including GDPR and UAE PDPL), you have the right to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Access, correct, or delete your personal data</li>
              <li>Withdraw consent for data processing at any time</li>
              <li>Request a copy of your data in a portable, machine-readable format</li>
              <li>Object to automated decision-making, including AI-based risk scoring</li>
              <li>Restrict processing of your data in certain circumstances</li>
              <li>Lodge a complaint with your local data protection authority</li>
            </ul>
            <p className="mt-4">To exercise any of these rights, contact us at <a href="mailto:privacy@shnoor.com" className="text-blue-600 font-bold hover:underline">privacy@shnoor.com</a>. We will respond to all legitimate requests within 30 days.</p>
          </div>
        </div>

        {/* 9. International Transfers */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-50 text-teal-600 rounded-lg"><Globe size={18} /></div>
            <h2 className="text-xl font-black text-slate-900">9. International Data Transfers</h2>
          </div>
          <div className="pl-11 space-y-3 text-slate-600 font-medium leading-relaxed">
            <p>As a global logistics platform, your data may be transferred to and processed in countries other than your country of residence. We ensure such transfers comply with applicable data protection laws through:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Standard Contractual Clauses (SCCs) approved by relevant regulatory bodies</li>
              <li>Data Processing Agreements (DPAs) with all third-party service providers</li>
              <li>Adequacy decisions where applicable</li>
            </ul>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            <strong className="text-slate-700">Changes to This Policy:</strong> We may update this Privacy Policy from time to time. We will notify you of any significant changes by email and by posting the new policy on this page with an updated "Last updated" date. For material changes, we will provide at least 30 days notice. Your continued use of the platform after changes constitutes acceptance of the revised policy.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
          <p className="text-sm text-blue-800 font-medium leading-relaxed">
            <strong>Questions?</strong> Contact our Data Protection Officer at <a href="mailto:privacy@shnoor.com" className="font-bold underline">privacy@shnoor.com</a> or write to us at Shnoor International Logistics Group, Trade City Complex, Dubai, UAE.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 px-8 text-center">
        <div className="flex items-center justify-center gap-6 text-xs font-bold text-slate-500 uppercase tracking-widest">
          <p>© 2026 Shnoor International Logistics Group. All rights reserved.</p>
          <Link to="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
