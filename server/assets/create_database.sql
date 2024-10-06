CREATE TABLE precipitation
(
    id          integer generated always as identity
        primary key,
    file_name   varchar(255),
    path        text,
    atime       timestamptz,
    mtime       timestamptz,
    ctime       timestamptz,
    birthtime  timestamptz,
    updated_at  timestamptz DEFAULT now(),
    created_at  timestamptz DEFAULT now()
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