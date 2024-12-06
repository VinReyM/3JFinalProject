CREATE DATABASE massage_booking;
USE massage_booking;


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_info VARCHAR(100),
    special_requests TEXT
);


CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    date DATE,
    time TIME,
    service_name VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
