import React, { useState, useRef } from 'react';
import { UploadCloud, X, CheckCircle, Loader2, Download, ArrowRight, FileText, Clock, AlertTriangle } from 'lucide-react';

const BASE = 'http://localhost:8000';

const STEPS = [
  { id: 1, title: 'File Validation', desc: 'Verifying document integrity and format' },
  { id: 2, title: 'Text Extraction', desc: 'AI-powered OCR scanning document' },
  { id: 3, title: 'Field Parsing', desc: 'Mapping extracted data to invoice fields' },
  { id: 4, title: 'Shipment Ready', desc: 'Preparing data for shipment module' }
];

// Map backend extracted_data keys → display labels
const FIELD_LABELS = {
  product_name:        'Product Name',
  quantity:            'Quantity',
  price:               'Unit Price',
  currency:            'Currency',
  country:             'Origin Country',
  destination_country: 'Destination Country',
  description:         'Description',
};

export default function DocumentPage({ showToast, globalData, setGlobalData, navigate }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [polling, setPolling] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [docData, setDocData] = useState(null);          // raw backend document
  const [extracted, setExtracted] = useState(null);      // extracted_data object
  const pollTimer = useRef(null);

  const token = localStorage.getItem('token');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  // ── Upload → poll ──────────────────────────────────────────────
  const handleProcess = async () => {
    if (!file) return;
    setUploading(true);
    setError('');
    setCurrentStep(0);
    setDone(false);

    const form = new FormData();
    form.append('file', file);

    let docId;
    try {
      const res = await fetch(`${BASE}/documents/upload-invoice/`, {
        method: 'POST',
        headers,
        body: form,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || `Upload failed (${res.status})`);
      }
      const json = await res.json();
      docId = json.id;
      setCurrentStep(1);
    } catch (e) {
      setError(e.message);
      setUploading(false);
      return;
    } finally {
      setUploading(false);
    }

    // Simulate step animation while polling
    setPolling(true);
    let step = 1;
    const stepTimer = setInterval(() => {
      step = Math.min(step + 1, STEPS.length - 1);
      setCurrentStep(step);
    }, 1800);

    // Poll GET /documents/{doc_id} until completed or failed
    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch(`${BASE}/documents/${docId}`, { headers });
        if (!res.ok) return;
        const doc = await res.json();

        if (doc.status === 'Completed' || doc.status === 'completed') {
          clearInterval(pollInterval);
          clearInterval(stepTimer);
          setCurrentStep(STEPS.length);
          setPolling(false);
          setDone(true);
          setDocData(doc);
          const ext = doc.extracted_data || {};
          setExtracted(ext);

          // Build globalData shipmentData from backend
          const sid = doc.shipment_id;
          const totalVal = ext.quantity && ext.price
            ? `$${(Number(ext.quantity) * Number(ext.price)).toFixed(2)}`
            : '—';

          setGlobalData(prev => ({
            ...prev,
            documentData: ext,
            shipmentData: {
              id: `SHP-${String(sid).padStart(6, '0')}`,
              numericId: sid,
              productName: ext.product_name || '—',
              quantity: ext.quantity ? `${ext.quantity} Units` : '—',
              unitPrice: ext.price ? `$${Number(ext.price).toFixed(2)}` : '—',
              currency: ext.currency || 'USD',
              origin: ext.country || '—',
              destination: ext.destination_country || '—',
              description: ext.description || '—',
              totalValue: totalVal,
              invoiceNumber: `IN-${docId}`,
              status: 'Pending',
            }
          }));
          showToast('Invoice processed successfully');
        } else if (doc.status === 'Failed' || doc.status === 'Error' || doc.status === 'Failed Validation') {
          clearInterval(pollInterval);
          clearInterval(stepTimer);
          setPolling(false);
          const errMsg = doc.extracted_data?.error || 'Processing failed. Try again.';
          setError(errMsg);
          showToast('Processing failed');
        }
      } catch {
        // network hiccup — keep polling
      }
    }, 2500);

    pollTimer.current = pollInterval;
  };

  const handleReset = () => {
    if (pollTimer.current) clearInterval(pollTimer.current);
    setFile(null);
    setUploading(false);
    setPolling(false);
    setCurrentStep(0);
    setDone(false);
    setError('');
    setDocData(null);
    setExtracted(null);
  };

  const handleCreateShipment = () => navigate('Shipment');

  const isProcessing = uploading || polling;

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div className="space-y-6 animate-fadeIn">

      {/* Upload Section */}
      {!isProcessing && !done && (
        <div className="bg-white p-8 border border-gray-200 rounded shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-[#1a2744] font-serif border-b border-gray-100 pb-4">1. UPLOAD INVOICE</h2>

          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 p-4 rounded flex items-center gap-3 text-red-600">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span className="font-medium text-sm">{error}</span>
            </div>
          )}

          {!file ? (
            <label className="border-2 border-dashed border-gray-300 hover:border-[#2563eb] rounded-lg p-14 flex flex-col items-center justify-center text-center transition-colors bg-gray-50 cursor-pointer block">
              <UploadCloud className="w-14 h-14 text-gray-400 mb-4" />
              <p className="text-lg font-medium text-[#1a2744] mb-1">Drop your invoice here or click to browse</p>
              <p className="text-sm text-gray-500">Accepted formats: PDF, JPG, PNG</p>
              <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => { if (e.target.files?.[0]) { setFile(e.target.files[0]); setError(''); } }} />
            </label>
          ) : (
            <div>
              <div className="flex items-center justify-between p-5 bg-gray-50 border border-gray-200 rounded mb-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center text-[#2563eb]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a2744]">{file.name}</h3>
                    <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB · <span className="text-[#16a34a] font-medium">Ready</span></p>
                  </div>
                </div>
                <button onClick={handleReset} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex gap-3">
                <button onClick={handleProcess} className="px-6 py-2.5 bg-[#2563eb] hover:bg-blue-600 text-white font-semibold rounded transition-colors shadow-sm">
                  Process Invoice
                </button>
                <button onClick={handleReset} className="px-6 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded transition-colors shadow-sm">
                  Change File
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Processing Status */}
      {(isProcessing || done) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 border border-gray-200 rounded shadow-sm">
            <h2 className="text-xl font-bold mb-6 text-[#1a2744] font-serif border-b border-gray-100 pb-4">2. PROCESSING STATUS</h2>
            <div className="relative pl-4">
              {STEPS.map((step, index) => {
                const isCompleted = currentStep > index || done;
                const isActive = currentStep === index && isProcessing;
                return (
                  <div key={step.id} className="mb-7 relative flex items-start">
                    {index < STEPS.length - 1 && (
                      <div className={`absolute left-[11px] top-7 bottom-[-28px] w-[2px] transition-colors duration-500 ${isCompleted ? 'bg-[#16a34a]' : 'bg-gray-200'}`} />
                    )}
                    <div className="relative z-10 w-6 h-6 shrink-0 mt-0.5 flex items-center justify-center bg-white">
                      {isCompleted ? <CheckCircle className="w-6 h-6 text-[#16a34a]" /> :
                       isActive ? <Loader2 className="w-6 h-6 text-[#2563eb] animate-spin" /> :
                       <div className="w-4 h-4 rounded-full bg-gray-200 border-2 border-white shadow-sm" />}
                    </div>
                    <div className="ml-5 flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className={`font-semibold ${isActive || isCompleted ? 'text-[#1a2744]' : 'text-gray-400'}`}>{step.title}</h3>
                        {isCompleted && <span className="px-2 py-0.5 bg-green-100 text-[#16a34a] text-xs font-bold rounded uppercase tracking-wider">Complete</span>}
                      </div>
                      <p className={`text-sm ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-6 border border-gray-200 rounded shadow-sm">
            <h3 className="text-lg font-bold text-[#1a2744] font-serif mb-5 pb-3 border-b border-gray-100 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" /> Processing Log
            </h3>
            <div className="space-y-4 text-sm">
              {STEPS.map((step, index) => {
                const done_ = currentStep > index;
                return (
                  <div key={step.id} className={`flex items-center gap-3 ${done_ ? 'text-[#1a2744]' : 'text-gray-400'}`}>
                    <div className={`w-2 h-2 rounded-full shrink-0 ${done_ ? 'bg-[#16a34a]' : 'bg-gray-300'}`} />
                    <span className={done_ ? 'font-medium' : ''}>{step.title}</span>
                  </div>
                );
              })}
            </div>
            {isProcessing && (
              <div className="mt-5 flex items-center gap-2 text-sm text-[#2563eb] font-medium">
                <Loader2 className="w-4 h-4 animate-spin" /> AI engine processing...
              </div>
            )}
            {done && (
              <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded text-sm text-[#16a34a] font-semibold text-center">
                {Object.keys(extracted || {}).length} fields extracted
              </div>
            )}
          </div>
        </div>
      )}

      {/* Extracted Data */}
      {done && extracted && (
        <div className="space-y-4">
          <div className="bg-[#16a34a]/10 border border-[#16a34a]/30 p-4 rounded flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-[#16a34a]" />
            <span className="font-semibold text-[#16a34a]">Invoice processed successfully</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Extracted fields */}
            <div className="lg:col-span-2 bg-white p-6 border border-gray-200 rounded shadow-sm">
              <h2 className="text-xl font-bold text-[#1a2744] font-serif mb-6 pb-3 border-b border-gray-100 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#2563eb]" /> 3. EXTRACTED DATA
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {Object.entries(FIELD_LABELS).map(([key, label]) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</span>
                    <span className="text-base font-medium text-[#1a2744] bg-gray-50 px-3 py-2 border border-gray-100 rounded">
                      {extracted[key] != null ? String(extracted[key]) : '—'}
                    </span>
                  </div>
                ))}
                {/* Show any extra fields from backend not in our label map */}
                {Object.entries(extracted)
                  .filter(([k]) => !FIELD_LABELS[k] && k !== 'hsn_result')
                  .map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{key.replace(/_/g, ' ')}</span>
                      <span className="text-base font-medium text-[#1a2744] bg-gray-50 px-3 py-2 border border-gray-100 rounded">
                        {typeof value === 'object' ? JSON.stringify(value) : String(value ?? '—')}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Invoice Summary sidebar */}
            <div className="bg-white p-6 border border-gray-200 rounded shadow-sm flex flex-col gap-5">
              <h3 className="text-lg font-bold text-[#1a2744] font-serif pb-3 border-b border-gray-100">Invoice Summary</h3>
              <div className="space-y-3 text-sm flex-1">
                {globalData?.shipmentData && [
                  ['Total Value', globalData.shipmentData.totalValue],
                  ['Unit Price', globalData.shipmentData.unitPrice],
                  ['Quantity', globalData.shipmentData.quantity],
                  ['Currency', globalData.shipmentData.currency],
                  ['Origin', globalData.shipmentData.origin],
                  ['Destination', globalData.shipmentData.destination],
                  ['Shipment ID', globalData.shipmentData.id],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">{label}</span>
                    <span className="font-semibold text-[#1a2744] text-right max-w-[150px] break-words">{val || '—'}</span>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-blue-50 border border-blue-100 rounded text-xs text-center text-gray-500">
                Powered by Shnoor OCR + GPT-4o-mini
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                const blob = new Blob([JSON.stringify(extracted, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a'); a.href = url; a.download = 'extracted_invoice.json'; a.click();
              }}
              className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 rounded transition-colors flex items-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4" /> Export JSON
            </button>
            <button onClick={handleReset} className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 rounded transition-colors shadow-sm">
              Re-upload
            </button>
            <button onClick={handleCreateShipment} className="px-6 py-2.5 bg-[#2563eb] hover:bg-blue-600 text-white font-semibold rounded shadow-sm transition-colors flex items-center gap-2">
              Create Shipment <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
