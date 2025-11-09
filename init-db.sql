-- init-db.sql
USE bookmate_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'USER',
    member_since TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Books Table
CREATE TABLE IF NOT EXISTS books (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    isbn VARCHAR(20) UNIQUE,
    genre VARCHAR(50),
    description TEXT,
    cover_image_url VARCHAR(500),
    rating DECIMAL(2, 1) DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Cart Table
CREATE TABLE IF NOT EXISTS cart (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    book_id BIGINT NOT NULL,
    quantity INT DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);

-- Ratings Table
CREATE TABLE IF NOT EXISTS ratings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    book_id BIGINT NOT NULL,
    rating DECIMAL(2, 1) NOT NULL,
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_book (user_id, book_id)
);

-- Insert Sample Admin User (password: admin123)
INSERT INTO users (full_name, email, password, role) 
VALUES ('Admin User', 'admin@bookmate.com', 'admin123', 'ADMIN');

-- Insert Sample Regular User (password: user123)
INSERT INTO users (full_name, email, password, role) 
VALUES ('John Doe', 'user@bookmate.com', 'user123', 'USER');

-- Insert Sample Books
INSERT INTO books (title, author, price, stock, isbn, genre, description, cover_image_url, rating) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 12.99, 45, '978-0-7432-7356-5', 'Fiction', 'A classic American novel set in the Jazz Age', 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg', 4.7),
('To Kill a Mockingbird', 'Harper Lee', 14.99, 32, '978-0-06-112008-4', 'Fiction', 'A gripping tale of racial injustice and childhood innocence', 'https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg', 4.8),
('1984', 'George Orwell', 13.99, 58, '978-0-452-28423-4', 'Dystopian', 'A dystopian social science fiction novel', 'https://covers.openlibrary.org/b/isbn/9780452284234-L.jpg', 4.6),
('Pride and Prejudice', 'Jane Austen', 11.99, 40, '978-0-14-143951-8', 'Romance', 'A romantic novel of manners', 'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg', 4.9),
('The Hobbit', 'J.R.R. Tolkien', 15.99, 25, '978-0-547-92822-7', 'Fantasy', 'A fantasy adventure novel', 'https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg', 4.8),
('Harry Potter', 'J.K. Rowling', 16.99, 50, '978-0-439-70818-8', 'Fantasy', 'The magical world of wizardry', 'https://covers.openlibrary.org/b/isbn/9780439708180-L.jpg', 4.9);
