-- migrate:up
ALTER TABLE users ADD nickname VARCHAR(100) NOT NULL;
ALTER TABLE users ADD access_user BIT NOT NULL;
ALTER TABLE users ADD day_count INT NOT NULL;

-- migrate:down

