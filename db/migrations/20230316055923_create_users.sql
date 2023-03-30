-- migrate:up
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    social_id BIGINT NULL,
    email VARCHAR(200) NOT NULL,
    nickname VARCHAR(100) NOT NULL,
    access_user BIT NOT NULL,
    profile_image VARCHAR(3000) NULL,
    day_count INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

-- migrate:down
DROP TABLE users