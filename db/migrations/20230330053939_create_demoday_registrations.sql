-- migrate:up
CREATE TABLE demoday_registrations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    demoday_id BIGINT NOT NULL,
    registration_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_demoday_registrations_user_id FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_demoday_registrations_demoday_id FOREIGN KEY (demoday_id) REFERENCES demodays(id)
);

-- migrate:down
DROP TABLE demoday_registrations;
