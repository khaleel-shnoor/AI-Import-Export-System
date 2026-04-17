import React, { useState, useEffect } from 'react';
import { Package, Tag, Loader2, CheckCircle, ArrowLeft, ArrowRight, ShieldCheck, DollarSign, AlertTriangle, RefreshCw } from 'lucide-react';

const BASE = 'http://localhost:8000';

export default function HSNPage({ showToast, globalData, setGlobalData, navigate }) {
  const data = globalData?.shipmentData;
  const numericId = data?.numericId || null;

  const [loading, setLoading] = useState(false);
  const [classifying, setClassifying] = useState(false);
  const [hsnResult, setHsnResult] = useState(null);   // always fresh — never from stale globalData
  const [confirmed, setConfirmed] = useState(false);
  const [inlineError, setInlineError] = useState(''); // only set on user-triggered classify

  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };

  // Auto-fetch existing HSN result for this shipment
  const fetchHSN = async () => {
    if (!numericId) return;
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/hsn/${numericId}`, { headers });
      if (res.ok) {
        const json = await res.json();
        setHsnResult(json);
        setGlobalData(prev => ({ ...prev, hsnData: { ...json, confirmed: false } }));
      }
      // 404 means not classified yet — that's OK
    } catch {
      // silent — backend may not be reachable
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHSN(); }, [numericId]);

  const handleClassify = async () => {
    if (!data) return;
    setClassifying(true);
    setInlineError('');

    // If we have a numericId use the real API, else fall back to mock
    if (!numericId) {
      setTimeout(() => {
        const mock = {
          hsn_code: '8471.30.00',
          confidence_score: 0.91,
          model_version: 'shnoor-hsn-v1.0',
          shipment_id: null,
          // derived display fields
          description: 'Portable automatic data processing machines',
          chapter: '84 — Machinery and mechanical appliances',
          duty_rate: 10,
          gst_rate: 18,
        };
        setHsnResult(mock);
        setGlobalData(prev => ({ ...prev, hsnData: { ...mock, confirmed: false } }));
        showToast(`HSN code assigned — ${Math.round((mock.confidence_score || 0.91) * 100)}% confidence`);
        setClassifying(false);
      }, 1500);
      return;
    }

    try {
      // Step 1: Get AI prediction (always works, no DB needed)
      const predRes = await fetch(`${BASE}/hsn/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ product_name: data.productName, persist_result: false }),
      });
      if (!predRes.ok) {
        const err = await predRes.json().catch(() => ({}));
        setInlineError(err.detail || 'Classification failed. Please try again.');
        return;
      }
      const prediction = await predRes.json();

      // Step 2: Persist to DB if we have a shipment ID
      if (numericId) {
        const saveRes = await fetch(`${BASE}/hsn/`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ product_name: data.productName, shipment_id: numericId, persist_result: true }),
        });
        if (saveRes.ok) {
          const saved = await saveRes.json();
          setHsnResult(saved);
          setGlobalData(prev => ({ ...prev, hsnData: { ...saved, confirmed: false } }));
          const pct = Math.round((saved.confidence_score || 0));
          showToast(`HSN code assigned — ${pct}% confidence`);
          return;
        }
        // If DB save fails, still show prediction
      }

      setHsnResult(prediction);
      setGlobalData(prev => ({ ...prev, hsnData: { ...prediction, confirmed: false } }));
      const pct = Math.round((prediction.confidence_score || 0));
      showToast(`HSN code assigned — ${pct}% confidence`);
    } catch {
      setInlineError('Could not connect to backend. Check server is running.');
    } finally {
      setClassifying(false);
    }
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setGlobalData(prev => ({ ...prev, hsnData: { ...prev.hsnData, confirmed: true } }));
    showToast('HSN confirmed — proceed to Duty & Tax');
  };

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded border border-gray-200">
        <Tag className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-[#1a2744] font-serif mb-2">No Active Shipment</h2>
        <p className="text-gray-500 mb-6 text-center">Please process a document and create a shipment first.</p>
        <button onClick={() => navigate('Document')} className="px-6 py-2.5 bg-[#2563eb] text-white font-semibold rounded hover:bg-blue-600 transition-colors">
          Go to Document Module
        </button>
      </div>
    );
  }

  const confidencePct = hsnResult
    ? Math.round((hsnResult.confidence_score || hsnResult.confidence || 0.91) * (hsnResult.confidence_score <= 1 ? 100 : 1))
    : 0;

  // Derived duty/gst from known patterns or backend result
  const dutyRate = hsnResult?.duty_rate || 10;
  const gstRate = hsnResult?.gst_rate || 18;
  const totalVal = parseFloat(String(data.totalValue || '0').replace(/[^0-9.]/g, '')) || 0;
  const dutyAmt = ((totalVal * dutyRate) / 100).toFixed(2);
  const gstAmt = ((totalVal * gstRate) / 100).toFixed(2);
  const totalLanded = (totalVal + parseFloat(dutyAmt) + parseFloat(gstAmt)).toFixed(2);

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* Product Info + Classify action */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 border border-gray-200 rounded shadow-sm">
          <h2 className="text-lg font-bold text-[#1a2744] font-serif flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
            <Package className="w-5 h-5 text-gray-400" /> Product Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              ['Shipment ID', data.id],
              ['Product', data.productName],
              ['Description', data.description],
              ['Origin', data.origin],
              ['Destination', data.destination],
              ['Total Value', data.totalValue],
            ].map(([label, val]) => (
              <div key={label} className="flex flex-col">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</span>
                <span className="text-base font-medium text-[#1a2744]">{val || '—'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Classify card */}
        <div className="bg-white p-6 border border-gray-200 rounded shadow-sm flex flex-col items-center justify-center gap-4">
          {loading && <Loader2 className="w-8 h-8 text-[#2563eb] animate-spin" />}

          {!loading && !hsnResult && !classifying && (
            <>
              <Tag className="w-10 h-10 text-gray-300" />
              <p className="text-sm text-gray-500 text-center">Run AI classification to assign the correct HSN code</p>
              <button onClick={handleClassify} className="w-full px-6 py-2.5 bg-[#2563eb] text-white font-semibold rounded shadow-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                <Tag className="w-4 h-4" /> Classify Product
              </button>
            </>
          )}

          {!loading && classifying && (
            <div className="flex flex-col items-center gap-3 py-4">
              <Loader2 className="w-10 h-10 text-[#2563eb] animate-spin" />
              <p className="text-sm font-medium text-[#1a2744] text-center">AI Engine classifying...</p>
              <p className="text-xs text-gray-400 text-center">Analyzing description and specs</p>
            </div>
          )}

          {!loading && hsnResult && (
            <div className="flex flex-col items-center gap-3 py-2 w-full">
              <CheckCircle className="w-10 h-10 text-[#16a34a]" />
              <p className="text-sm font-semibold text-[#16a34a] text-center">Classification Complete</p>
              <p className="text-xs text-gray-400 text-center">{confidencePct}% confidence</p>
              <button onClick={handleClassify} disabled={classifying} className="w-full mt-2 px-4 py-1.5 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1.5">
                <RefreshCw className="w-3 h-3" /> Re-classify
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Error — only shown when user clicks Classify and it fails */}
      {inlineError && (
        <div className="bg-red-50 border border-red-200 p-4 rounded flex items-center gap-3 text-red-600">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span className="font-medium text-sm">{inlineError}</span>
        </div>
      )}

      {/* Results Section */}
      {hsnResult && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#16a34a]/10 border border-[#16a34a]/30 p-4 rounded flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-[#16a34a]" />
            <span className="font-semibold text-[#16a34a]">
              HSN code assigned successfully — {confidencePct}% confidence
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Classification Result */}
            <div className="lg:col-span-2 bg-white p-6 border border-gray-200 rounded shadow-sm">
              <h2 className="text-xl font-bold text-[#1a2744] font-serif mb-6 pb-3 border-b border-gray-100 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#2563eb]" /> Classification Result
              </h2>

              <div className="mb-6">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 block">Assigned HSN Code</span>
                <div className="inline-block bg-blue-50 border-2 border-[#2563eb] rounded px-6 py-3">
                  <span className="text-3xl font-bold text-[#2563eb] tracking-widest">{hsnResult.hsn_code}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {[
                  ['Description', hsnResult.description || 'Based on product classification'],
                  ['Chapter', hsnResult.chapter || `HS Chapter ${hsnResult.hsn_code?.split('.')[0]}`],
                  ['Model Version', hsnResult.model_version || '—'],
                  ['Classification ID', hsnResult.classification_id ? `#${hsnResult.classification_id}` : '—'],
                  ['Applicable Duty Rate', `${dutyRate}%`],
                  ['GST Rate', `${gstRate}%`],
                ].map(([label, val]) => (
                  <div key={label} className="flex flex-col">
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</span>
                    <span className="text-base font-medium text-[#1a2744]">{val}</span>
                  </div>
                ))}
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">AI Confidence Score</span>
                  <span className="text-sm font-bold text-[#16a34a]">{confidencePct}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-[#16a34a] h-2.5 rounded-full" style={{ width: `${confidencePct}%`, transition: 'width 1.5s ease-in-out' }} />
                </div>
              </div>
            </div>

            {/* Cost Summary */}
            <div className="bg-white p-6 border border-gray-200 rounded shadow-sm">
              <h2 className="text-xl font-bold text-[#1a2744] font-serif mb-6 pb-3 border-b border-gray-100 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-gray-500" /> Cost Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Product Value</span>
                  <span className="font-semibold text-[#1a2744]">{data.totalValue}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Duty Amount ({dutyRate}%)</span>
                  <span className="font-semibold text-red-600">+${dutyAmt}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">GST Amount ({gstRate}%)</span>
                  <span className="font-semibold text-red-600">+${gstAmt}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold text-[#1a2744]">Total Landed Cost</span>
                  <span className="text-xl font-bold text-[#2563eb]">${totalLanded}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
            <button onClick={() => navigate('Shipment')} className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Shipment
            </button>
            {!confirmed ? (
              <button onClick={handleConfirm} className="px-6 py-2.5 bg-[#2563eb] text-white font-semibold rounded hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-sm">
                Confirm HSN and Proceed <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={() => navigate('DutyTax')} className="px-6 py-2.5 bg-[#16a34a] hover:bg-green-700 text-white font-semibold rounded transition-colors flex items-center gap-2 shadow-sm">
                Proceed to Duty &amp; Tax <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
