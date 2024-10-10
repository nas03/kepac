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

create table if not exists public.avg_precipitation
(
    id                integer generated always as identity
        primary key,
    district_id       integer,
    avg_precipitation double precision,
    geo_id            varchar(255),
    district_name     varchar(255),
    geo_type          varchar(255),
    time              timestamp,
    updated_at        timestamp,
    created_at        timestamp
);


create trigger set_updated_at
    before update
    on public.avg_precipitation
    for each row
execute procedure public.update_updated_at_column();

