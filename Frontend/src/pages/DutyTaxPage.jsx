import React, { useState, useEffect } from 'react';
import { Calculator, ArrowLeft, ArrowRight, CheckCircle, Loader2, AlertTriangle, DollarSign, RefreshCw } from 'lucide-react';

const BASE = 'http://localhost:8000';

export default function DutyTaxPage({ showToast, globalData, setGlobalData, navigate }) {
  const shipmentId = globalData?.shipmentData?.id;
  const numericId = globalData?.shipmentData?.numericId || null;

  const [loading, setLoading] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [data, setData] = useState(globalData?.dutyData || null);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };

  const fetchDuty = async () => {
    if (!numericId) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BASE}/duty/${numericId}`, { headers });
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setGlobalData(prev => ({ ...prev, dutyData: json }));
      } else if (res.status !== 404) {
        setError('Failed to fetch duty data.');
      }
    } catch {
      setError('Could not connect to backend.');
    } finally {
      setLoading(false);
    }
  };

  const calculate = async () => {
    if (!numericId) {
      showToast('No backend shipment ID. Using mock data for demo.');
      const mock = {
        shipment_id: 1, hsn_code: '8471.30.00', currency: 'USD',
        assessable_value: 1551.57, duty_rate: 10, tax_rate: 18,
        duty_amount: 155.16, tax_amount: 279.28, other_charges: 0,
        total_cost: 1986.01, rule_source: 'demo'
      };
      setData(mock);
      setGlobalData(prev => ({ ...prev, dutyData: mock }));
      showToast('Duty calculated successfully');
      return;
    }
    setCalculating(true);
    setError('');
    try {
      const res = await fetch(`${BASE}/duty/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ shipment_id: numericId, persist_result: true })
      });
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setGlobalData(prev => ({ ...prev, dutyData: json }));
        showToast('Duty calculated successfully');
      } else {
        const err = await res.json();
        setError(err.detail || 'Calculation failed.');
      }
    } catch {
      setError('Could not connect to backend.');
    } finally {
      setCalculating(false);
    }
  };

  useEffect(() => { fetchDuty(); }, []);

  if (!globalData?.shipmentData) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded border border-gray-200">
        <Calculator className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-[#1a2744] font-serif mb-2">No Active Shipment</h2>
        <p className="text-gray-500 mb-6 text-center">Please complete Document → Shipment → HSN steps first.</p>
        <button onClick={() => navigate('Document')} className="px-6 py-2.5 bg-[#2563eb] text-white font-semibold rounded hover:bg-blue-600 transition-colors">
          Go to Document Module
        </button>
      </div>
    );
  }

  const fmt = (v) => v != null ? `$${Number(v).toFixed(2)}` : '—';
  const pct = (v) => v != null ? `${v}%` : '—';

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* Status banner */}
      {data ? (
        <div className="bg-[#16a34a]/10 border border-[#16a34a]/30 p-4 rounded flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-[#16a34a]" />
          <span className="font-semibold text-[#16a34a]">Duty calculated successfully</span>
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Calculator className="w-5 h-5 text-[#2563eb]" />
            <span className="font-semibold text-[#1a2744]">Duty & Tax calculation pending — run to proceed</span>
          </div>
          <button
            onClick={calculate}
            disabled={calculating}
            className="px-5 py-2 bg-[#2563eb] text-white font-semibold rounded hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-60"
          >
            {calculating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Calculator className="w-4 h-4" />}
            {calculating ? 'Calculating...' : 'Run Duty Calculation'}
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

      {/* Main two-column grid */}
      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Duty Breakdown — 2/3 */}
          <div className="lg:col-span-2 bg-white p-6 border border-gray-200 rounded shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#1a2744] font-serif flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#2563eb]" /> Duty Breakdown
              </h2>
              {data && (
                <button onClick={calculate} disabled={calculating} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#2563eb] transition-colors disabled:opacity-50">
                  <RefreshCw className={`w-4 h-4 ${calculating ? 'animate-spin' : ''}`} /> Recalculate
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                ['HSN Code', data?.hsn_code ?? '—'],
                ['Currency', data?.currency ?? '—'],
                ['Assessable Value', data ? fmt(data.assessable_value) : '—'],
                ['Other Charges', data ? fmt(data.other_charges) : '—'],
                ['Duty Rate', data ? pct(data.duty_rate) : '—'],
                ['GST / Tax Rate', data ? pct(data.tax_rate) : '—'],
                ['Rule Source', data?.rule_source ?? '—'],
                ['Shipment ID', globalData?.shipmentData?.id ?? '—'],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</span>
                  <span className={`text-base font-medium ${data ? 'text-[#1a2744]' : 'text-gray-300'} bg-gray-50 px-3 py-2 border border-gray-100 rounded`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {!data && !calculating && (
              <div className="mt-8 flex justify-center">
                <button onClick={calculate} className="px-8 py-3 bg-[#2563eb] text-white font-semibold rounded shadow-md hover:bg-blue-600 transition-colors flex items-center gap-2">
                  <Calculator className="w-5 h-5" /> Run Duty Calculation
                </button>
              </div>
            )}
            {calculating && (
              <div className="mt-8 flex flex-col items-center gap-3 py-4">
                <Loader2 className="w-10 h-10 text-[#2563eb] animate-spin" />
                <p className="text-sm font-medium text-gray-500">Calculating duty & tax...</p>
              </div>
            )}
          </div>

          {/* Cost Summary — 1/3 */}
          <div className="bg-white p-6 border border-gray-200 rounded shadow-sm">
            <h2 className="text-xl font-bold text-[#1a2744] font-serif mb-6 pb-3 border-b border-gray-100 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-gray-500" /> Cost Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Product Value</span>
                <span className="font-semibold text-[#1a2744]">{data ? fmt(data.assessable_value) : '—'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Duty ({pct(data?.duty_rate)})</span>
                <span className={`font-semibold ${data ? 'text-red-600' : 'text-gray-300'}`}>
                  {data ? `+${fmt(data.duty_amount)}` : '—'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">GST ({pct(data?.tax_rate)})</span>
                <span className={`font-semibold ${data ? 'text-red-600' : 'text-gray-300'}`}>
                  {data ? `+${fmt(data.tax_amount)}` : '—'}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Other Charges</span>
                <span className={`font-semibold ${data ? 'text-[#1a2744]' : 'text-gray-300'}`}>
                  {data ? fmt(data.other_charges) : '—'}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-[#1a2744]">Total Landed Cost</span>
                <span className={`text-xl font-bold ${data ? 'text-[#2563eb]' : 'text-gray-300'}`}>
                  {data ? fmt(data.total_cost) : '—'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
        <button onClick={() => navigate('HSN')} className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
          <ArrowLeft className="w-4 h-4" /> Back to HSN
        </button>
        <button
          onClick={() => navigate('Risk')}
          disabled={!data}
          className="px-6 py-2.5 bg-[#2563eb] text-white font-semibold rounded hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Run Risk Analysis <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
