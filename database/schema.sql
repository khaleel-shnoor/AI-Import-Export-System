-- AI-Powered Import Export Intelligence System
-- Database Schema (PostgreSQL)

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS shipments (
    id SERIAL PRIMARY KEY,
    tracking_number VARCHAR(100) UNIQUE NOT NULL,
    booking_number VARCHAR(100) UNIQUE,
    bl_number VARCHAR(100) UNIQUE,
    container_number VARCHAR(100) UNIQUE,
    origin_country VARCHAR(100),
    destination_country VARCHAR(100),
    status VARCHAR(50),
    carrier VARCHAR(100),
    vessel_name VARCHAR(100),
    estimated_arrival TIMESTAMP WITH TIME ZONE,
    current_latitude FLOAT,
    current_longitude FLOAT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP WITH TIME ZONE,
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    document_type VARCHAR(50) NOT NULL,
    s3_url VARCHAR(512),
    extracted_data TEXT,
    shipment_id INTEGER REFERENCES shipments(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    is_manual BOOLEAN DEFAULT FALSE,
    risk_level VARCHAR(20) DEFAULT 'LOW'
);

CREATE TABLE IF NOT EXISTS hsn_results (
    id SERIAL PRIMARY KEY,
    product_description TEXT,
    predicted_hsn_code VARCHAR(20),
    confidence_score FLOAT,
    document_id INTEGER REFERENCES documents(id),
    product_category_id INTEGER REFERENCES product_categories(id),
    is_manual_override BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS duties (
    id SERIAL PRIMARY KEY,
    shipment_id INTEGER REFERENCES shipments(id),
    total_duty FLOAT,
    tax_breakdown TEXT,
    currency VARCHAR(10) DEFAULT 'USD'
);

CREATE TABLE IF NOT EXISTS financial_analytics (
    id SERIAL PRIMARY KEY,
    date DATE DEFAULT CURRENT_DATE,
    total_revenue FLOAT DEFAULT 0.0,
    paid_amounts FLOAT DEFAULT 0.0,
    pending_amounts FLOAT DEFAULT 0.0
);

CREATE TABLE IF NOT EXISTS product_performance (
    id SERIAL PRIMARY KEY,
    date DATE DEFAULT CURRENT_DATE,
    product_category_id INTEGER REFERENCES product_categories(id),
    revenue_generated FLOAT DEFAULT 0.0,
    shipment_count INTEGER DEFAULT 0
);
