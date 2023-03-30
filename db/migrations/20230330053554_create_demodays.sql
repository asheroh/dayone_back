-- migrate:up
CREATE TABLE demodays (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description LONGTEXT NOT NULL,
    location VARCHAR(200) NOT NULL,
    capacity INT NOT NULL,
    start_registeration_date TIMESTAMP NOT NULL,
    end_registration_date TIMESTAMP,
    event_date DATE NOT NULL,
    meeting_time TIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

-- migrate:down
DROP TABLE demodays