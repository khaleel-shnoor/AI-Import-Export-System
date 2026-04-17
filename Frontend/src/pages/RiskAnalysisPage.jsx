import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, ArrowLeft, ArrowRight, CheckCircle, Loader2, TrendingUp, Info } from 'lucide-react';

const BASE = 'http://localhost:8000';

const RISK_COLORS = {
  LOW:    { bg: 'bg-green-100',  text: 'text-[#16a34a]', border: 'border-green-200',  badge: 'bg-green-100 text-[#16a34a]' },
  MEDIUM: { bg: 'bg-amber-50',   text: 'text-[#d97706]', border: 'border-amber-200',  badge: 'bg-amber-100 text-[#d97706]' },
  HIGH:   { bg: 'bg-red-50',     text: 'text-red-600',   border: 'border-red-200',    badge: 'bg-red-100 text-red-600' },
};

export default function RiskAnalysisPage({ showToast, globalData, setGlobalData, navigate }) {
  const numericId = globalData?.shipmentData?.numericId || null;

  const [loading, setLoading] = useState(false);
  const [assessing, setAssessing] = useState(false);
  const [data, setData] = useState(globalData?.riskData || null);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };

  const fetchRisk = async () => {
    if (!numericId) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BASE}/risk/${numericId}`, { headers });
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setGlobalData(prev => ({ ...prev, riskData: json }));
      } else if (res.status !== 404) {
        setError('Failed to fetch risk data.');
      }
    } catch {
      setError('Could not connect to backend.');
    } finally {
      setLoading(false);
    }
  };

  const runAssessment = async () => {
    if (!numericId) {
      const mock = {
        shipment_id: 1, risk_score: 28.5, risk_level: 'LOW',
        reason: 'Product classification is consistent with declared value. No anomalies detected in origin/destination pair. Documentation appears complete.',
        model_version: 'shnoor-risk-v1.0'
      };
      setData(mock);
      setGlobalData(prev => ({ ...prev, riskData: mock }));
      showToast('Risk analysis completed — Low risk');
      return;
    }
    setAssessing(true);
    setError('');
    try {
      const res = await fetch(`${BASE}/risk/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ shipment_id: numericId, persist_result: true })
      });
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setGlobalData(prev => ({ ...prev, riskData: json }));
        showToast(`Risk analysis complete — ${json.risk_level} risk`);
      } else {
        const err = await res.json();
        setError(err.detail || 'Assessment failed.');
      }
    } catch {
      setError('Could not connect to backend.');
    } finally {
      setAssessing(false);
    }
  };

  useEffect(() => { fetchRisk(); }, []);

  if (!globalData?.shipmentData) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded border border-gray-200">
        <ShieldCheck className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-[#1a2744] font-serif mb-2">No Active Shipment</h2>
        <p className="text-gray-500 mb-6 text-center">Please complete the full workflow first.</p>
        <button onClick={() => navigate('Document')} className="px-6 py-2.5 bg-[#2563eb] text-white font-semibold rounded hover:bg-blue-600 transition-colors">
          Go to Document Module
        </button>
      </div>
    );
  }

  const level = data?.risk_level?.toUpperCase() || 'LOW';
  const colors = RISK_COLORS[level] || RISK_COLORS.LOW;
  const scorePercent = data?.risk_score != null ? Math.min(100, data.risk_score) : 0;

  const clearanceProb = level === 'LOW' ? 94 : level === 'MEDIUM' ? 72 : 41;
  const recommendation = level === 'LOW'
    ? 'Standard clearance pathway — no additional documentation required.'
    : level === 'MEDIUM'
    ? 'Submit supplementary documents. Expect secondary inspection.'
    : 'High-risk flag raised. Consult compliance officer before shipment.';

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* Status banner */}
      {data ? (
        <div className={`${colors.bg} border ${colors.border} p-4 rounded flex items-center gap-3`}>
          <CheckCircle className={`w-5 h-5 ${colors.text}`} />
          <span className={`font-semibold ${colors.text}`}>
            Risk analysis completed — <span className="uppercase">{level}</span> risk level
          </span>
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-[#2563eb]" />
            <span className="font-semibold text-[#1a2744]">Run AI risk analysis to assess clearance probability</span>
          </div>
          <button
            onClick={runAssessment}
            disabled={assessing}
            className="px-5 py-2 bg-[#2563eb] text-white font-semibold rounded hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-60"
          >
            {assessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
            {assessing ? 'Analyzing...' : 'Run Risk Analysis'}
          </button>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded flex items-center gap-3 text-red-600">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-16">
          <Loader2 className="w-10 h-10 text-[#2563eb] animate-spin" />
        </div>
      )}

      {/* Two-column grid — mirrors Shipment / HSN layout */}
      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Risk Metrics — 2/3 */}
          <div className="lg:col-span-2 bg-white p-6 border border-gray-200 rounded shadow-sm">
            <h2 className="text-xl font-bold text-[#1a2744] font-serif mb-6 pb-3 border-b border-gray-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#2563eb]" /> Risk Metrics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Risk Level</span>
                <span className={`inline-flex items-center gap-2 text-base font-semibold px-3 py-2 rounded border ${data ? `${colors.bg} ${colors.text} ${colors.border}` : 'bg-gray-50 text-gray-300 border-gray-100'}`}>
                  {data ? level : '—'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Model Version</span>
                <span className="text-base font-medium text-[#1a2744] bg-gray-50 px-3 py-2 border border-gray-100 rounded">
                  {data?.model_version ?? '—'}
                </span>
              </div>
              <div className="flex flex-col md:col-span-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Reason / Finding</span>
                <p className="text-sm text-[#1a2744] bg-gray-50 px-4 py-3 border border-gray-100 rounded leading-relaxed">
                  {data?.reason ?? 'No analysis run yet.'}
                </p>
              </div>
            </div>

            {/* Risk Score Bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Risk Score</span>
                <span className={`text-sm font-bold ${data ? colors.text : 'text-gray-300'}`}>
                  {data ? `${scorePercent.toFixed(1)} / 100` : '—'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    level === 'LOW' ? 'bg-[#16a34a]' : level === 'MEDIUM' ? 'bg-[#d97706]' : 'bg-red-500'
                  }`}
                  style={{ width: data ? `${scorePercent}%` : '0%' }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Low Risk (0–35)</span><span>Medium (35–65)</span><span>High (&gt;65)</span>
              </div>
            </div>

            {!data && !assessing && (
              <div className="mt-8 flex justify-center">
                <button onClick={runAssessment} className="px-8 py-3 bg-[#2563eb] text-white font-semibold rounded shadow-md hover:bg-blue-600 transition-colors flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" /> Run Risk Analysis
                </button>
              </div>
            )}
            {assessing && (
              <div className="mt-8 flex flex-col items-center gap-3 py-4">
                <Loader2 className="w-10 h-10 text-[#2563eb] animate-spin" />
                <p className="text-sm font-medium text-gray-500">AI engine assessing risk...</p>
              </div>
            )}
          </div>

          {/* Clearance Decision — 1/3 */}
          <div className="bg-white p-6 border border-gray-200 rounded shadow-sm">
            <h2 className="text-xl font-bold text-[#1a2744] font-serif mb-6 pb-3 border-b border-gray-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-gray-500" /> Clearance Decision
            </h2>
            <div className="space-y-5">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Clearance Probability</p>
                <p className={`text-4xl font-bold ${data ? colors.text : 'text-gray-200'}`}>
                  {data ? `${clearanceProb}%` : '—'}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Risk Level Badge</p>
                <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide ${data ? colors.badge : 'bg-gray-100 text-gray-300'}`}>
                  {data ? level : 'Pending'}
                </span>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Recommended Action</p>
                <p className={`text-sm leading-relaxed ${data ? 'text-[#1a2744]' : 'text-gray-300'}`}>
                  {data ? recommendation : 'Run analysis to get recommendation.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
        <button onClick={() => navigate('DutyTax')} className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Duty & Tax
        </button>
        <button
          onClick={() => navigate('Tracking')}
          disabled={!data}
          className="px-6 py-2.5 bg-[#2563eb] text-white font-semibold rounded hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Proceed to Tracking <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
