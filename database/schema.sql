-- Dedicated Shipment Tracking System Database
-- Focus: Real-time logistics, coordinates, and vessel tracking

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS shipments (
    id SERIAL PRIMARY KEY,
    tracking_number VARCHAR(100) UNIQUE NOT NULL, -- e.g. B/L or Container
    booking_number VARCHAR(100) UNIQUE,
    bl_number VARCHAR(100) UNIQUE,
    container_number VARCHAR(100) UNIQUE,
    
    origin_country VARCHAR(100),
    destination_country VARCHAR(100),
    status VARCHAR(100), -- e.g. "Arrived at Port", "At Sea", "Disrupted"
    
    carrier VARCHAR(100),
    vessel_name VARCHAR(100),
    estimated_arrival TIMESTAMP WITH TIME ZONE,
    
    current_latitude FLOAT,
    current_longitude FLOAT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP WITH TIME ZONE,
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS shipment_updates (
    id SERIAL PRIMARY KEY,
    shipment_id INTEGER REFERENCES shipments(id),
    status VARCHAR(100),
    location VARCHAR(100),
    description TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
