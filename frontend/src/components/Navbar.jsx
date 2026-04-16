import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ background: '#0a192f', padding: '1rem', color: 'white', display: 'flex', gap: '15px' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
            <Link to="/schedules" style={{ color: 'white', textDecoration: 'none' }}>Schedules</Link>
            <Link to="/tracking" style={{ color: 'white', textDecoration: 'none' }}>Tracking</Link>
            <Link to="/quotations" style={{ color: 'white', textDecoration: 'none' }}>Quotations</Link>
            <Link to="/booking" style={{ color: 'white', textDecoration: 'none' }}>Booking</Link>
            <Link to="/compliance" style={{ color: 'white', textDecoration: 'none' }}>Compliance</Link>
            <Link to="/risk-module" style={{ color: 'white', textDecoration: 'none' }}>Risk Module</Link>
            <Link to="/analytics" style={{ color: 'white', textDecoration: 'none' }}>Analytics Dashboard</Link>
        </nav>
    );
};

export default Navbar;
