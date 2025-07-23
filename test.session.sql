--@block
CREATE TABLE users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(256) NOT NULL,
    phone VARCHAR(20),
    role ENUM('customer', 'professional') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
--@block
-- Professional user
INSERT INTO users (name, email, password_hash, phone, role)
VALUES (
        'Arjun Rao',
        'arjun@fixit.com',
        'hashed_password_123',
        '9876543210',
        'professional'
    );
-- Customer user
INSERT INTO users (name, email, password_hash, phone, role)
VALUES (
        'Meera Joshi',
        'meera@gmail.com',
        'hashed_password_abc',
        '9123456789',
        'customer'
    );
--@block
CREATE TABLE professional_details (
    professional_id BIGINT PRIMARY KEY,
    rating DECIMAL(2, 1) DEFAULT 0.0,
    profile_bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (professional_id) REFERENCES users(user_id) ON DELETE CASCADE
);
--@block
INSERT INTO professional_details (professional_id, rating, profile_bio)
VALUES (
        1,
        4.7,
        'Expert in AC, refrigerator, and washing machine repair. 10+ years of experience.'
    );
--@block
CREATE TABLE services (
    service_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    description TEXT,
    duration_minutes INT NOT NULL DEFAULT 60
);
--@block
-- AC Repair Service
INSERT INTO services (name, category, description, duration_minutes)
VALUES (
        'AC Repair',
        'Appliances',
        'Diagnose and fix air conditioner cooling or noise issues.',
        90
    );
-- House Cleaning Service
INSERT INTO services (name, category, description, duration_minutes)
VALUES (
        'House Cleaning',
        'Cleaning',
        'Complete deep cleaning of all rooms, kitchen, and bathrooms.',
        120
    );
-- Haircut at Home
INSERT INTO services (name, category, description, duration_minutes)
VALUES (
        'Haircut',
        'Grooming',
        'Professional haircut and grooming service at home.',
        45
    );
-- Plumbing
INSERT INTO services (name, category, description, duration_minutes)
VALUES (
        'Plumbing',
        'Maintenance',
        'Fix leaky taps, blocked drains, and pipe installations.',
        60
    );
-- Pest Control
INSERT INTO services (name, category, description, duration_minutes)
VALUES (
        'Pest Control',
        'Health & Safety',
        'Full-house pest and insect control using eco-friendly chemicals.',
        90
    );
--@block 
CREATE TABLE professional_services (
    professional_id BIGINT,
    service_id BIGINT,
    PRIMARY KEY (professional_id, service_id),
    FOREIGN KEY (professional_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(service_id) ON DELETE CASCADE
);
--@block
INSERT INTO professional_services (professional_id, service_id)
VALUES (1, 1),
    -- Arjun offers AC Repair
    (1, 2),
    -- Arjun offers House Cleaning
    (1, 4);
-- Arjun offers Plumbing
--@block
INSERT INTO users (name, email, password_hash, phone, role)
VALUES (
        'Nisha Verma',
        'nisha@homehelp.com',
        'hashed_password_xyz',
        '9988776655',
        'professional'
    );
INSERT INTO professional_details (professional_id, rating, profile_bio)
VALUES (
        2,
        4.9,
        'Certified professional specializing in pest control and grooming services.'
    );
INSERT INTO professional_services (professional_id, service_id)
VALUES (2, 5),
    -- Nisha offers Pest Control
    (2, 3);
-- Nisha offers Haircut
--@block
CREATE TABLE professional_availability (
    availability_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    professional_id BIGINT,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    is_booked BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (professional_id) REFERENCES users(user_id) ON DELETE CASCADE
);
--@block
INSERT INTO professional_availability (professional_id, start_time, end_time)
VALUES (1, '2025-07-22 10:00:00', '2025-07-22 11:30:00'),
    (1, '2025-07-22 14:00:00', '2025-07-22 15:30:00'),
    (1, '2025-07-23 09:00:00', '2025-07-23 10:30:00');
INSERT INTO professional_availability (professional_id, start_time, end_time)
VALUES (2, '2025-07-22 12:00:00', '2025-07-22 13:00:00'),
    (2, '2025-07-22 16:00:00', '2025-07-22 17:00:00'),
    (2, '2025-07-23 11:00:00', '2025-07-23 12:30:00');
--@block
SELECT *
FROM professional_availability
WHERE professional_id = 2
    AND is_booked = FALSE;
--@block
CREATE TABLE bookings (
    booking_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    professional_id BIGINT,
    service_id BIGINT,
    scheduled_start DATETIME NOT NULL,
    scheduled_end DATETIME NOT NULL,
    status ENUM('BOOKED', 'CANCELLED', 'COMPLETED') NOT NULL DEFAULT 'BOOKED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (professional_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(service_id) ON DELETE CASCADE
);
--@block
CREATE TABLE professional_reviews (
    review_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    booking_id BIGINT,
    rating INT NOT NULL CHECK (
        rating BETWEEN 1 AND 5
    ),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE
);
--@block
INSERT INTO bookings (
        user_id,
        professional_id,
        service_id,
        scheduled_start,
        scheduled_end
    )
VALUES (
        2,
        -- Meera's user_id
        1,
        -- Arjun's user_id
        1,
        -- AC Repair service_id
        '2025-07-22 10:00:00',
        '2025-07-22 11:30:00'
    );
UPDATE professional_availability
SET is_booked = TRUE
WHERE professional_id = 1
    AND start_time = '2025-07-22 10:00:00'
    AND end_time = '2025-07-22 11:30:00';
--@block
SELECT b.booking_id,
    u.name AS customer_name,
    p.name AS professional_name,
    s.name AS service_name,
    b.scheduled_start,
    b.status
FROM bookings b
    JOIN users u ON b.user_id = u.user_id
    JOIN users p ON b.professional_id = p.user_id
    JOIN services s ON b.service_id = s.service_id;
--@block
INSERT INTO professional_reviews (booking_id, rating, comment)
VALUES (
        1,
        -- assumes this is the booking_id for Meera's AC Repair
        5,
        'Arjun was professional and quick. Fixed the AC in no time!'
    );
--@block
SELECT r.review_id,
    u.name AS customer_name,
    r.rating,
    r.comment,
    r.created_at
FROM professional_reviews r
    JOIN bookings b ON r.booking_id = b.booking_id
    JOIN users u ON b.user_id = u.user_id
WHERE b.professional_id = 1;
-- Arjun's user_id
--@block
CREATE PROCEDURE GetAllServices() BEGIN
SELECT *
FROM services;
END;
CALL GetAllServices();
--@block
SELECT *
FROM services;
--@block
ALTER TABLE users
MODIFY COLUMN role ENUM('customer', 'professional', 'admin');
--@block
UPDATE users
SET role = 'admin'
WHERE user_id = 11;
--@block
DELETE FROM services
WHERE service_id IN (6, 7);
--@block
SELECT *
FROM professional_availability;
--@block
SELECT *
from bookings;
--@block
-- Delete all current availability records
DELETE FROM professional_availability;
DELETE FROM bookings;
--@block
INSERT INTO professional_availability (professional_id, start_time, end_time, is_booked)
SELECT p.professional_id,
    -- 10:00 AM IST → 04:30 AM UTC
    DATE_ADD(CURDATE(), INTERVAL day_offset DAY) + INTERVAL 4.5 HOUR AS start_time,
    -- 5:00 PM IST → 11:30 AM UTC
    DATE_ADD(CURDATE(), INTERVAL day_offset DAY) + INTERVAL 11.5 HOUR AS end_time,
    FALSE AS is_booked
FROM professional_details p
    JOIN (
        SELECT 0 AS day_offset
        UNION ALL
        SELECT 1
        UNION ALL
        SELECT 2
        UNION ALL
        SELECT 3
        UNION ALL
        SELECT 4
        UNION ALL
        SELECT 5
        UNION ALL
        SELECT 6
        UNION ALL
        SELECT 7
        UNION ALL
        SELECT 8
        UNION ALL
        SELECT 9
    ) days;
--@block ist
INSERT INTO professional_availability (professional_id, start_time, end_time, is_booked)
SELECT p.professional_id,
    DATE_ADD(CURDATE(), INTERVAL day_offset DAY) + INTERVAL 10 HOUR AS start_time,
    DATE_ADD(CURDATE(), INTERVAL day_offset DAY) + INTERVAL 17 HOUR AS end_time,
    FALSE AS is_booked
FROM professional_details p
    JOIN (
        SELECT 0 AS day_offset
        UNION ALL
        SELECT 1
        UNION ALL
        SELECT 2
        UNION ALL
        SELECT 3
        UNION ALL
        SELECT 4
        UNION ALL
        SELECT 5
        UNION ALL
        SELECT 6
        UNION ALL
        SELECT 7
        UNION ALL
        SELECT 8
        UNION ALL
        SELECT 9
    ) days;
--@block 
SELECT *
from professional_availability;
--@block 
SELECT pa.availability_id,
    pa.professional_id,
    pa.start_time,
    pa.end_time
FROM professional_availability pa
    JOIN professional_services ps ON pa.professional_id = ps.professional_id
WHERE ps.service_id = 1
    AND DATE(pa.start_time) = '2025-07-25'
    AND pa.is_booked = false;
--@block
SELECT *
FROM professional_availability
WHERE professional_id = 18
ORDER BY start_time;
--@block
ALTER TABLE bookings
MODIFY COLUMN status VARCHAR(20) NOT NULL DEFAULT 'BOOKED';
--@block
ALTER TABLE bookings
ADD CONSTRAINT chk_booking_status CHECK (
        status IN ('BOOKED', 'COMPLETED', 'CANCELED', 'RESCHEDULED')
    );
--@block
UPDATE professional_details pd
    JOIN (
        SELECT b.professional_id,
            ROUND(AVG(r.rating), 1) AS avg_rating
        FROM professional_reviews r
            JOIN bookings b ON r.booking_id = b.booking_id
        GROUP BY b.professional_id
    ) as ratings ON pd.professional_id = ratings.professional_id
SET pd.rating = ratings.avg_rating;
--@block
SELECT *
FROM professional_details;
--@block
SELECT *
from professional_reviews;
--@block
SELECT *
from bookings;
--@block
SELECT *
from professional_availability
WHERE professional_id = 16;
--@block
CREATE PROCEDURE SP_GetTopBookedProfessionals() BEGIN
SELECT u.user_id,
    u.name AS professional_name,
    pd.rating,
    pd.profile_bio,
    GROUP_CONCAT(
        DISTINCT s.name
        ORDER BY s.name SEPARATOR ', '
    ) AS services_offered,
    COUNT(b.booking_id) AS total_bookings
FROM users u
    JOIN bookings b ON u.user_id = b.professional_id
    LEFT JOIN professional_reviews r ON b.booking_id = r.booking_id
    LEFT JOIN professional_details pd ON u.user_id = pd.professional_id
    LEFT JOIN professional_services ps ON u.user_id = ps.professional_id
    LEFT JOIN services s ON ps.service_id = s.service_id
WHERE u.role = 'professional'
GROUP BY u.user_id,
    u.name,
    pd.rating,
    pd.profile_bio
ORDER BY total_bookings DESC
LIMIT 3;
END;
--@block
call SP_GetTopBookedProfessionals();
--@block
CREATE PROCEDURE SP_GetUpcomingBookingsForUser(IN p_userId BIGINT) BEGIN
SELECT b.booking_id,
    b.user_id,
    b.professional_id,
    b.service_id,
    b.scheduled_start,
    b.scheduled_end,
    b.status,
    s.name AS service_name,
    p.name AS professional_name
FROM bookings b
    JOIN services s ON b.service_id = s.service_id
    JOIN users p ON b.professional_id = p.user_id
WHERE b.user_id = p_userId
    AND b.scheduled_start > UTC_TIMESTAMP()
    AND b.status IN ('BOOKED', 'RESCHEDULED')
ORDER BY b.scheduled_start ASC;
END;