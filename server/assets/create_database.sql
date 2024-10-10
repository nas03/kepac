CREATE TABLE precipitation
(
    id          integer generated always as identity
        primary key,
    file_name   varchar(255),
    path        text,
    atime       timestamp,
    mtime       timestamp,
    ctime       timestamp,
    birthtime  timestamp,
    updated_at  timestamp DEFAULT now(),
    created_at  timestamp DEFAULT now()
);
CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON precipitation
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();