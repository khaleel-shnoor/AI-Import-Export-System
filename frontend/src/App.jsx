import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Placeholder Pages
const Home = () => <div className="page"><h1>Home - Live Ticker & Updates</h1></div>;
const Schedules = () => <div className="page"><h1>Schedules & Routings</h1></div>;
const Tracking = () => <div className="page"><h1>Live ETA Tracking</h1></div>;
const Quotations = () => <div className="page"><h1>Get a Quote in 30 Seconds</h1></div>;
const Booking = () => <div className="page"><h1>Vessel Booking</h1></div>;
const ComplianceUploads = () => <div className="page"><h1>Upload BL Drafts & VGM</h1></div>;
const RiskModule = () => <div className="page"><h1>Risk Assessment & Custom Categories</h1></div>;
const AnalyticsDashboard = () => <div className="page"><h1>Financial Analytics Dashboard</h1></div>;

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedules" element={<Schedules />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/quotations" element={<Quotations />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/compliance" element={<ComplianceUploads />} />
            <Route path="/risk-module" element={<RiskModule />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
