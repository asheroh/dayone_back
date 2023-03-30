-- migrate:up
CREATE TABLE posts (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    book_id BIGINT NOT NULL,
    day_count BIGINT NOT NULL,
    passage LONGTEXT NOT NULL,
    comment LONGTEXT NOT NULL,
    sympathy_count BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT posts_fk_user_id FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT posts_fk_book_id FOREIGN KEY (book_id) REFERENCES books (id)
)

-- migrate:down
DROP TABLE posts