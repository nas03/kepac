CREATE TABLE precipitation
(
    id         integer GENERATED ALWAYS AS IDENTITY
        PRIMARY KEY,
    file_name  varchar(255),
    path       text,
    birthtime  timestamp,
    updated_at timestamp DEFAULT NOW(),
    created_at timestamp DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS avg_precipitation
(
    id                integer GENERATED ALWAYS AS IDENTITY
        PRIMARY KEY,
    district_id       integer,
    avg_precipitation double precision,
    geo_id            varchar(255),
    province_name varchar(255),
    district_name varchar(255),
    district_code     varchar(255),
    geo_type          varchar(255),
    time              timestamp,
    updated_at        timestamp,
    created_at        timestamp
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
    BEFORE UPDATE
    ON avg_precipitation
    FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER set_updated_at
    BEFORE UPDATE
    ON precipitation
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
Ï

