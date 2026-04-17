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

  // HSN AI Data
  const [hsnDescription, setHsnDescription] = useState('');
  const [predictionResult, setPredictionResult] = useState(null);
  const [isClassifying, setIsClassifying] = useState(false);

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
    try {
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

  const handleClassify = async (e) => {
    e.preventDefault();
    if (!hsnDescription) return;
    setIsClassifying(true);
    setPredictionResult(null);
    try {
      const response = await axios.post(`${API_BASE}/hsn/classify`, {
        product_description: hsnDescription
      });
      setPredictionResult(response.data);
      if (view === 'admin') fetchHsnRecords();
    } catch (err) {
      setError("Failed to classify product. Check backend connection.");
    }
    setIsClassifying(false);
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
            <button className={view === 'hsn' ? 'active' : ''} onClick={() => setView('hsn')}>AI Prediction</button>
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
              <div style={{animation: 'fadeIn 0.5s ease'}}>
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
                </div>

                {trackingData.ai_prediction && (
                  <div className="card ai-card">
                    <div style={{position: 'relative', zIndex: 1}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                        <h3 style={{margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: 'white'}}>
                          <span style={{fontSize: '1.2rem'}}>🤖</span> Logistics AI Prediction
                        </h3>
                        <span className="ai-badge">Model: {trackingData.ai_prediction.prediction_model}</span>
                      </div>
                      
                      <div className="grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px'}}>
                        <div>
                          <span className="ai-label">Expected Arrival Date</span>
                          <span className="ai-value" style={{color: 'var(--accent)', fontSize: '1.5rem'}}>
                            {new Date(trackingData.ai_prediction.expected_arrival_date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        <div>
                          <span className="ai-label">Total Delivery Time</span>
                          <span className="ai-value">{trackingData.ai_prediction.total_delivery_time_days} Days</span>
                        </div>
                        <div>
                          <span className="ai-label">AI Confidence</span>
                          <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px'}}>
                            <div style={{flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px'}}>
                              <div style={{width: `${trackingData.ai_prediction.confidence_score}%`, height: '100%', background: 'var(--primary)', borderRadius: '3px'}}></div>
                            </div>
                            <span style={{fontSize: '0.8rem', fontWeight: 700, color: 'white'}}>{trackingData.ai_prediction.confidence_score}%</span>
                          </div>
                        </div>
                      </div>

                      <div style={{marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px'}}>
                        <div>
                          <span className="ai-label">Distance</span>
                          <span style={{fontSize: '0.9rem', color: 'white'}}>{trackingData.ai_prediction.distance_nm.toLocaleString()} Nautical Miles</span>
                        </div>
                        <div>
                          <span className="ai-label">Weather Impact</span>
                          <span style={{fontSize: '0.9rem', color: 'white'}}>
                            {trackingData.ai_prediction.weather_condition} ({trackingData.ai_prediction.weather_severity} Impact)
                          </span>
                        </div>
                        <div>
                          <span className="ai-label">Port Status</span>
                          <span style={{fontSize: '0.9rem', color: 'white'}}>{trackingData.ai_prediction.port_status} - {trackingData.ai_prediction.port_delay_description}</span>
                        </div>
                      </div>

                      <div style={{marginTop: '16px', fontSize: '0.8rem', opacity: 0.7, fontStyle: 'italic', color: 'white'}}>
                        * {trackingData.ai_prediction.prediction_message}
                      </div>
                    </div>
                  </div>
                )}

                <div className="card">
                  <h3 style={{marginTop: 0, borderBottom: '2px solid #f1f5f9', paddingBottom: '12px'}}>Journey Timeline</h3>
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

        {view === 'hsn' && (
          <div style={{maxWidth: '900px', margin: '0 auto'}}>
            <h1 className="title">AI Product Classification</h1>
            <div className="card glass">
              <p style={{marginBottom: '20px', color: 'var(--secondary)'}}>
                Use our deep learning engine to predict HS Codes and Customs Duties for international trade compliance.
              </p>
              <form onSubmit={handleClassify}>
                <div style={{display: 'flex', gap: '12px'}}>
                  <input 
                    className="input"
                    type="text" 
                    placeholder="Describe your product (e.g. 'high-performance gaming laptop with 32GB RAM')" 
                    value={hsnDescription}
                    onChange={(e) => setHsnDescription(e.target.value)}
                  />
                  <button type="submit" className="button" disabled={isClassifying}>
                    {isClassifying ? 'Analyzing...' : 'Predict HS Code'}
                  </button>
                </div>
              </form>
            </div>

            {predictionResult && (
              <div className="card" style={{animation: 'fadeIn 0.5s ease'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                  <h2 style={{margin: 0}}>Classification Result</h2>
                  <div className="badge badge-success" style={{background: 'var(--success)', color: 'white'}}>
                    Confidence: {(predictionResult.confidence_score * 100).toFixed(1)}%
                  </div>
                </div>

                <div className="grid">
                  <div style={{background: '#f1f5f9', padding: '20px', borderRadius: '12px'}}>
                    <label className="timeline-meta">Predicted HS Code</label>
                    <p style={{fontSize: '2rem', fontWeight: 800, margin: '8px 0', color: 'var(--primary)'}}>
                      {predictionResult.predicted_hsn_code}
                    </p>
                  </div>
                  <div>
                    <label className="timeline-meta">Product Description</label>
                    <p style={{fontWeight: 600, marginTop: '8px'}}>{predictionResult.product_description}</p>
                    <div style={{marginTop: '16px'}}>
                       <button className="button" style={{padding: '8px 16px', fontSize: '0.85rem'}} onClick={() => handleAutoCreate(predictionResult.id)}>
                         Create Shipment with this Result
                       </button>
                    </div>
                  </div>
                </div>
                
                <div style={{marginTop: '32px', padding: '16px', borderTop: '1px solid #e2e8f0'}}>
                  <p className="timeline-meta">
                    <strong>AI Note:</strong> This prediction is based on global trade taxonomies. Always verify with local customs authorities before final submission.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
