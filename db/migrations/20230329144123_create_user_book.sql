-- migrate:up
CREATE TABLE user_book (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    book_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT user_books_fk_user_id FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT user_books_fk_book_id FOREIGN KEY (book_id) REFERENCES books(id)
)

-- migrate:down
DROP TABLE books