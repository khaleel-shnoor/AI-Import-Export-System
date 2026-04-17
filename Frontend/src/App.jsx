import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DocumentPage from './pages/DocumentPage';
import ShipmentPage from './pages/ShipmentPage';
import HSNPage from './pages/HSNPage';
import LandingPage from './pages/LandingPage';
import { Info } from 'lucide-react';

import TextPage from './pages/TextPage';
import LoginPage from './pages/LoginPage';
import DutyTaxPage from './pages/DutyTaxPage';
import RiskAnalysisPage from './pages/RiskAnalysisPage';

export default function App() {
  const [activePage, setActivePage] = useState('Landing');
  const [toast, setToast] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState({
    name: 'Sneha Jadhav',
    initials: 'SJ',
    email: 'admin@shnoor.com'
  });
  
  // Global State for data flowing between modules
  const [globalData, setGlobalData] = useState({
    documentData: null,
    shipmentData: null,
    hsnData: null,
    dutyData: null,
    riskData: null,
  });

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  if (activePage === 'Landing') {
    return <LandingPage onLaunch={() => setActivePage('Login')} onNavigate={setActivePage} />;
  }

  if (activePage === 'Login') {
    return (
      <LoginPage 
        onLoginSuccess={(userData) => {
          if (userData) setUser(userData);
          setActivePage('Document');
        }} 
        onBack={() => setActivePage('Landing')} 
      />
    );
  }

  if (activePage === 'Privacy') {
    return <TextPage title="Privacy Policy" content={["This is a placeholder for the Shnoor International Privacy Policy. Please consult your legal team for the full policy details.", "We are committed to protecting your personal information and your right to privacy."]} onBack={() => setActivePage('Landing')} />;
  }

  if (activePage === 'Terms') {
    return <TextPage title="Terms & Conditions" content={["This is a placeholder for the Shnoor International Terms & Conditions.", "By using this application, you agree to our terms of service."]} onBack={() => setActivePage('Landing')} />;
  }

  const renderPageContent = () => {
    switch (activePage) {
      case 'Document':
        return (
          <DocumentPage 
            showToast={showToast} 
            globalData={globalData} 
            setGlobalData={setGlobalData} 
            navigate={(page) => setActivePage(page)} 
          />
        );
      case 'Shipment':
        return (
          <ShipmentPage 
            showToast={showToast} 
            globalData={globalData} 
            setGlobalData={setGlobalData} 
            navigate={(page) => setActivePage(page)} 
          />
        );
      case 'HSN':
        return (
          <HSNPage 
            showToast={showToast} 
            globalData={globalData} 
            setGlobalData={setGlobalData} 
            navigate={(page) => setActivePage(page)} 
          />
        );
      case 'DutyTax':
        return (
          <DutyTaxPage
            showToast={showToast}
            globalData={globalData}
            setGlobalData={setGlobalData}
            navigate={(page) => setActivePage(page)}
          />
        );
      case 'Risk':
        return (
          <RiskAnalysisPage
            showToast={showToast}
            globalData={globalData}
            setGlobalData={setGlobalData}
            navigate={(page) => setActivePage(page)}
          />
        );
      default:
        return <div className="p-8">Module under construction.</div>;
    }
  };

  const pageTitles = {
    'Document': { title: 'Document Processing', subtitle: 'AI-powered invoice analysis and field extraction' },
    'Shipment': { title: 'Shipment Management', subtitle: 'Create and manage import-export shipments' },
    'HSN':      { title: 'HSN Classification', subtitle: 'AI-powered HS code assignment for customs clearance' },
    'DutyTax':  { title: 'Duty & Tax', subtitle: 'Calculate applicable duties, GST and landed cost' },
    'Risk':     { title: 'Risk Analysis', subtitle: 'AI-powered clearance risk assessment' },
  };

  const currentTitle = pageTitles[activePage] || { title: activePage, subtitle: '' };
  const sidebarWidth = collapsed ? 64 : 240;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `${sidebarWidth}px 1fr`, height: '100vh', width: '100%', overflow: 'hidden', fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        showToast={showToast}
        user={user}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      
      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#f9fafb' }}>
        {/* Header */}
        <header style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#1a2744', fontFamily: 'EB Garamond, serif', margin: 0 }}>{currentTitle.title}</h1>
            <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px', margin: '4px 0 0' }}>{currentTitle.subtitle}</p>
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '14px' }}>
            {user.initials}
          </div>
        </header>

        {/* Toast */}
        {toast && (
          <div style={{ position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 999 }}>
            <div style={{ background: '#1a2744', color: 'white', padding: '12px 24px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 500, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
              <Info size={18} color="#60a5fa" />
              {toast}
            </div>
          </div>
        )}

        {/* Page Content — centered */}
        <div style={{ flex: 1, overflowY: 'auto', background: '#f9fafb' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
            {renderPageContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
