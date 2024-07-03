CREATE TABLE metrics (
       created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
       instance_id VARCHAR NOT NULL,
       type VARCHAR NOT NULL,
       visitor_id VARCHAR NOT NULL,
       user_id VARCHAR NOT NULL,
       org_id VARCHAR,
       folder_id VARCHAR,
       record_public_id VARCHAR,
       record_id VARCHAR,
       meta JSON NOT NULL,
       ip VARCHAR NOT NULL,
       useragent VARCHAR NOT NULL,
       browser VARCHAR,
       browser_version VARCHAR,
       os VARCHAR,
       os_version VARCHAR,
       device VARCHAR,
       device_version VARCHAR,
       utm_medium VARCHAR,
       utm_source VARCHAR,
       utm_campaign VARCHAR,
       referrer VARCHAR NOT NULL,
       lat VARCHAR,
       lng VARCHAR,
       city VARCHAR,
       postal VARCHAR,
       country_code VARCHAR,
       country VARCHAR
);

-- Create the TimescaleDB extension if it does not already exist
CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

-- Convert the metrics table into a hypertable
SELECT create_hypertable('metrics', 'created_at');
