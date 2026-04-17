import React from 'react';
import { 
  FileText, Package, Tag, Calculator,
  AlertTriangle, MapPin, BarChart3, LogOut,
  ChevronLeft, ChevronRight
} from 'lucide-react';

const MODULES = [
  { id: 'Document', name: 'Document', icon: FileText },
  { id: 'Shipment', name: 'Shipment', icon: Package },
  { id: 'HSN', name: 'HSN Codes', icon: Tag },
  { id: 'DutyTax', name: 'Duty & Tax', icon: Calculator },
  { id: 'Risk', name: 'Risk Analysis', icon: AlertTriangle },
  { id: 'Tracking', name: 'Tracking', icon: MapPin },
  { id: 'Analytics', name: 'Analytics', icon: BarChart3 },
];

export default function Sidebar({ activePage, setActivePage, showToast, user = { name: 'Admin', initials: 'A' }, collapsed, setCollapsed }) {
  return (
    <aside style={{
      background: '#1a2744',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
      transition: 'none',
      width: '100%',   /* fill the grid column exactly */
    }}>
      {/* Logo / Brand */}
      <div
        onClick={() => setActivePage('Landing')}
        style={{ borderBottom: '1px solid #374151', padding: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', minHeight: '72px', overflow: 'hidden' }}
      >
        <img
          src="/shnoor-logo.png"
          alt="Shnoor"
          style={{ height: '32px', objectFit: 'contain', flexShrink: 0 }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        {!collapsed && (
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontWeight: 700, fontSize: '11px', lineHeight: 1.3, fontFamily: 'EB Garamond, serif', whiteSpace: 'nowrap' }}>
              SHNOOR INTERNATIONAL<br />IMPORT EXPORT AI
            </div>
            <div style={{ color: '#14b8a6', fontSize: '10px', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Import-Export Intelligence
            </div>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '12px 0' }}>
        {MODULES.map(mod => {
          const isActive = activePage === mod.id;
          const Icon = mod.icon;
          return (
            <div
              key={mod.id}
              onClick={() => setActivePage(mod.id)}
              title={mod.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: collapsed ? 0 : '14px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                padding: collapsed ? '14px 0' : '12px 20px',
                cursor: 'pointer',
                background: isActive ? 'rgba(37,99,235,0.2)' : 'transparent',
                color: isActive ? '#60a5fa' : '#d1d5db',
                borderLeft: isActive ? '3px solid #2563eb' : '3px solid transparent',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#1e293b'; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
            >
              <Icon size={18} style={{ flexShrink: 0 }} />
              {!collapsed && <span style={{ fontSize: '13px', fontWeight: isActive ? 600 : 400 }}>{mod.name}</span>}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #374151' }}>
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(c => !c)}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start',
            gap: '8px', padding: collapsed ? '12px 0' : '12px 20px',
            background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '12px',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.color = 'white'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9ca3af'; }}
        >
          {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span>Collapse</span></>}
        </button>

        {/* User */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', padding: collapsed ? '12px 0' : '12px 16px', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0, textTransform: 'uppercase' }}>
              {user.initials}
            </div>
            {!collapsed && (
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
                <div style={{ fontSize: '11px', color: '#9ca3af' }}>Trade Analyst</div>
              </div>
            )}
          </div>
          {!collapsed && (
            <button style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '4px', display: 'flex' }}>
              <LogOut size={15} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
