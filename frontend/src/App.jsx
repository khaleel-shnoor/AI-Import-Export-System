import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const API_BASE = 'http://127.0.0.1:8000/api/v1';

function App() {
  const [view, setView] = useState('track'); // track, admin, hsn
  const [identifier, setIdentifier] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Admin Data
  const [shipments, setShipments] = useState([]);
  const [hsnRecords, setHsnRecords] = useState([]);
  const [newShipment, setNewShipment] = useState({
    origin_country: '',
    destination_country: '',
    status: 'Booked',
    carrier: '',
    vessel_name: ''
  });

  useEffect(() => {
    if (view === 'admin') {
      fetchShipments();
      fetchHsnRecords();
    }
  }, [view]);

  const fetchShipments = async () => {
    try {
      const res = await axios.get(`${API_BASE}/shipments/`);
      setShipments(res.data);
    } catch (err) {
      console.error("Failed to fetch shipments", err);
    }
  };

  const fetchHsnRecords = async () => {
    // Note: Assuming there's a list endpoint for HSN, if not we'll just show empty
    try {
      // If there's no list endpoint, we might need to add one or use mock
      // For now, let's assume it exists or fail gracefully
      const res = await axios.get(`${API_BASE}/hsn/classifications`).catch(() => ({data: []}));
      setHsnRecords(res.data);
    } catch (err) {}
  };

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTrackingData(null);
    try {
      const response = await axios.get(`${API_BASE}/shipments/track/${identifier}`);
      setTrackingData(response.data);
    } catch (error) {
      setError("No shipment found with that identifier.");
    }
    setLoading(false);
  };

  const handleCreateShipment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/shipments/`, newShipment);
      alert("Shipment created successfully!");
      fetchShipments();
    } catch (err) {
      alert("Failed to create shipment");
    }
  };

  const handleAutoCreate = async (hsnId) => {
    try {
      await axios.post(`${API_BASE}/shipments/auto-create/${hsnId}`);
      alert("Shipment auto-created from HSN!");
      fetchShipments();
    } catch (err) {
      alert("Failed to auto-create shipment");
    }
  };

  const handleUpdateStatus = async (shipmentId) => {
    const status = prompt("Enter new status:");
    const location = prompt("Enter current location:");
    const description = prompt("Enter update description:");
    
    if (status && location) {
      try {
        await axios.post(`${API_BASE}/shipments/${shipmentId}/updates`, {
          status, location, description
        });
        alert("Status updated!");
        fetchShipments();
      } catch (err) {
        alert("Failed to update status");
      }
    }
  };

  return (
    <div>
      <nav>
        <div className="nav-content">
          <div style={{fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)'}}>SHNOOR LOGISTICS</div>
          <div className="nav-links">
            <button className={view === 'track' ? 'active' : ''} onClick={() => setView('track')}>Track</button>
            <button className={view === 'admin' ? 'active' : ''} onClick={() => setView('admin')}>Admin Portal</button>
          </div>
        </div>
      </nav>

      <div className="container">
        {view === 'track' && (
          <div style={{maxWidth: '800px', margin: '0 auto'}}>
            <h1 className="title">Track Your Cargo</h1>
            <div className="card glass">
              <form onSubmit={handleTrack}>
                <div style={{display: 'flex', gap: '12px'}}>
                  <input 
                    className="input"
                    type="text" 
                    placeholder="Enter Container / Booking / BL / Tracking Number" 
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                  <button type="submit" className="button" disabled={loading}>
                    {loading ? 'Searching...' : 'Track Now'}
                  </button>
                </div>
              </form>
              {error && <p style={{color: 'var(--error)', marginTop: '12px', fontWeight: 600}}>{error}</p>}
            </div>

            {trackingData && (
              <div className="card">
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '24px'}}>
                  <div>
                    <h2 style={{margin: 0}}>{trackingData.vessel_name || 'N/A'}</h2>
                    <p className="timeline-meta">Tracking: {trackingData.tracking_number}</p>
                  </div>
                  <div className="badge badge-info">{trackingData.status}</div>
                </div>

                <div className="grid">
                  <div>
                    <label className="timeline-meta">Origin</label>
                    <p style={{fontWeight: 600}}>{trackingData.origin_country}</p>
                  </div>
                  <div>
                    <label className="timeline-meta">Destination</label>
                    <p style={{fontWeight: 600}}>{trackingData.destination_country}</p>
                  </div>
                  <div>
                    <label className="timeline-meta">ETA</label>
                    <p style={{fontWeight: 600}}>{trackingData.estimated_arrival ? new Date(trackingData.estimated_arrival).toLocaleDateString() : 'TBA'}</p>
                  </div>
                </div>

                <h3 style={{marginTop: '40px', borderBottom: '2px solid #f1f5f9', paddingBottom: '12px'}}>Journey Timeline</h3>
                <div className="timeline">
                  {trackingData.updates && trackingData.updates.length > 0 ? (
                    trackingData.updates.map((update, i) => (
                      <div className="timeline-item" key={i}>
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                          <div className="timeline-status">{update.status}</div>
                          <div style={{fontSize: '0.95rem', marginBottom: '4px'}}>{update.location}</div>
                          <div className="timeline-meta">{update.description}</div>
                          <div className="timeline-meta" style={{fontSize: '0.75rem', marginTop: '4px'}}>
                            {new Date(update.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="timeline-meta">No tracking updates available yet.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {view === 'admin' && (
          <div>
            <h1 className="title">Admin Logistics Terminal</h1>
            
            <div className="grid">
              <div className="card">
                <h3>Create Manual Shipment</h3>
                <form onSubmit={handleCreateShipment}>
                  <div style={{display: 'grid', gap: '12px'}}>
                    <input className="input" placeholder="Origin Country" value={newShipment.origin_country} onChange={e => setNewShipment({...newShipment, origin_country: e.target.value})} required />
                    <input className="input" placeholder="Destination Country" value={newShipment.destination_country} onChange={e => setNewShipment({...newShipment, destination_country: e.target.value})} required />
                    <input className="input" placeholder="Carrier Name" value={newShipment.carrier} onChange={e => setNewShipment({...newShipment, carrier: e.target.value})} />
                    <input className="input" placeholder="Vessel Name" value={newShipment.vessel_name} onChange={e => setNewShipment({...newShipment, vessel_name: e.target.value})} />
                    <button type="submit" className="button">Register Shipment</button>
                  </div>
                </form>
              </div>

              <div className="card">
                <h3>Auto-Creation (HSN Drafts)</h3>
                <p className="timeline-meta">Create shipments directly from recent HSN classifications.</p>
                <div style={{marginTop: '16px'}}>
                  {hsnRecords.length > 0 ? hsnRecords.map(hsn => (
                    <div key={hsn.id} style={{padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <div>
                        <div style={{fontWeight: 600, fontSize: '0.9rem'}}>{hsn.product_description}</div>
                        <div className="timeline-meta">HSN: {hsn.predicted_hsn_code}</div>
                      </div>
                      <button className="button" style={{padding: '6px 12px', fontSize: '0.8rem'}} onClick={() => handleAutoCreate(hsn.id)}>Ship</button>
                    </div>
                  )) : <p className="timeline-meta">No recent HSN classifications found.</p>}
                  {/* Mock for demo if none */}
                  {hsnRecords.length === 0 && (
                     <div style={{padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.7}}>
                        <div>
                          <div style={{fontWeight: 600, fontSize: '0.9rem'}}>Electronics - Laptop Components</div>
                          <div className="timeline-meta">HSN: 8471.30.00</div>
                        </div>
                        <button className="button" style={{padding: '6px 12px', fontSize: '0.8rem'}} onClick={() => alert("This is a demo record. Use the HSN module to create real ones.")}>Ship</button>
                      </div>
                  )}
                </div>
              </div>
            </div>

            <div className="card" style={{marginTop: '24px'}}>
              <h3>Active Shipments</h3>
              <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '16px'}}>
                <thead>
                  <tr style={{textAlign: 'left', borderBottom: '2px solid #f1f5f9'}}>
                    <th style={{padding: '12px'}}>Tracking ID</th>
                    <th style={{padding: '12px'}}>Status</th>
                    <th style={{padding: '12px'}}>Route</th>
                    <th style={{padding: '12px'}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shipments.map(s => (
                    <tr key={s.id} style={{borderBottom: '1px solid #f1f5f9'}}>
                      <td style={{padding: '12px', fontWeight: 600}}>{s.tracking_number}</td>
                      <td style={{padding: '12px'}}><span className="badge badge-info">{s.status}</span></td>
                      <td style={{padding: '12px', fontSize: '0.9rem'}}>{s.origin_country} → {s.destination_country}</td>
                      <td style={{padding: '12px'}}>
                        <button className="button" style={{padding: '4px 8px', fontSize: '0.75rem', background: 'var(--secondary)'}} onClick={() => handleUpdateStatus(s.id)}>Update Status</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {shipments.length === 0 && <p className="timeline-meta" style={{textAlign: 'center', padding: '40px'}}>No shipments found in database.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
