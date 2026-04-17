import React from 'react';
import { Info, ArrowRight, ArrowLeft, Package, CheckCircle, Clock, Lock } from 'lucide-react';

export default function ShipmentPage({ showToast, globalData, navigate }) {
  const data = globalData?.shipmentData;

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded border border-gray-200">
        <Package className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-[#1a2744] font-serif mb-2">No Active Shipment</h2>
        <p className="text-gray-500 mb-6 text-center">Please process a document first to create a shipment record.</p>
        <button 
          onClick={() => navigate('Document')}
          className="px-6 py-2.5 bg-[#2563eb] text-white font-semibold rounded hover:bg-blue-600 transition-colors"
        >
          Go to Document Module
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Blue info banner */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded flex items-center gap-3">
        <Info className="w-5 h-5 text-[#2563eb]" />
        <span className="font-semibold text-[#1a2744]">Shipment created — proceed to HSN classification to continue</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shipment Record Card */}
        <div className="lg:col-span-2 bg-white p-6 border border-gray-200 rounded shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <h2 className="text-xl font-bold text-[#1a2744] font-serif flex items-center gap-2">
              <Package className="w-5 h-5 text-[#2563eb]" />
              Shipment Record
            </h2>
            <span className="px-3 py-1 bg-amber-100 text-[#d97706] text-xs font-bold uppercase tracking-wider rounded">
              {data.status || 'Pending'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Shipment ID</span>
              <span className="text-lg font-medium text-[#1a2744]">{data.id}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Product</span>
              <span className="text-lg font-medium text-[#1a2744]">{data.productName}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Origin</span>
              <span className="text-lg font-medium text-[#1a2744]">{data.origin}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Destination</span>
              <span className="text-lg font-medium text-[#1a2744]">{data.destination}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Quantity</span>
              <span className="text-lg font-medium text-[#1a2744]">{data.quantity}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Value</span>
              <span className="text-lg font-medium text-[#1a2744]">{data.totalValue}</span>
            </div>
            <div className="flex flex-col md:col-span-2">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Invoice Ref</span>
              <span className="text-lg font-medium text-[#1a2744]">{data.invoiceNumber}</span>
            </div>
          </div>
        </div>

        {/* Timeline Sidebar */}
        <div className="bg-white p-6 border border-gray-200 rounded shadow-sm">
          <h3 className="text-lg font-bold text-[#1a2744] font-serif mb-6 pb-3 border-b border-gray-100">Shipment Timeline</h3>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <CheckCircle className="w-5 h-5 text-[#16a34a]" />
              </div>
              <div className="w-[calc(100%-2rem)] ml-4">
                <h4 className="font-semibold text-[#1a2744]">Shipment Created</h4>
                <p className="text-sm text-gray-500">Data mapped</p>
              </div>
            </div>
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-[#2563eb] bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <div className="w-2 h-2 bg-[#2563eb] rounded-full"></div>
              </div>
              <div className="w-[calc(100%-2rem)] ml-4">
                <h4 className="font-semibold text-[#2563eb]">HSN Classification</h4>
                <p className="text-sm text-[#2563eb]/80">Pending action</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-gray-200 bg-gray-50 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Lock className="w-3 h-3 text-gray-400" />
              </div>
              <div className="w-[calc(100%-2rem)] ml-4">
                <h4 className="font-medium text-gray-400">Duty Calculation</h4>
                <p className="text-sm text-gray-400">Locked</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-gray-200 bg-gray-50 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Lock className="w-3 h-3 text-gray-400" />
              </div>
              <div className="w-[calc(100%-2rem)] ml-4">
                <h4 className="font-medium text-gray-400">Clearance</h4>
                <p className="text-sm text-gray-400">Locked</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
        <button 
          onClick={() => navigate('Document')}
          className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Document
        </button>
        <button 
          onClick={() => navigate('HSN')}
          className="px-6 py-2.5 bg-[#2563eb] text-white font-semibold rounded hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-sm"
        >
          Run HSN Classification <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
