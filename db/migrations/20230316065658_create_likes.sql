-- migrate:up
CREATE TABLE likes (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    post_id BIGINT NOT NULL,
    type VARCHAR(300) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT likes_fk_user_id FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT likes_fk_book_id FOREIGN KEY (post_id) REFERENCES posts(id)
)

-- migrate:down
DROP TABLE likes