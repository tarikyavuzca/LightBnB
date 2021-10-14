INSERT INTO users (name, email, password)
VALUES
('Yavuz Tarik Dengiz', 'ytd@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Jamos Bond', 'james@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Pata Pata', 'pata@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Tata Tata', 'tata@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES
(1, 'Small Studio Apartment on Rideau Street', 'description', 'https://a0.muscache.com/im/pictures/2cd55f8d-c363-4870-9182-475013d361a0.jpg?im_w=1200', 'https://a0.muscache.com/im/pictures/64c1f777-5ee7-419e-ad43-f15f21dcdb7a.jpg?im_w=720', 300, 2, 2, 2, 'Canada', 'Rideau', 'Ottawa', 'Ontario', '564789', true),
(2, 'Beautiful Condo In the Heart of Downtown', 'description', 'http://nhoffmanandco.com/blog/blog/wp-content/uploads/2017/04/Awesome-blue-building-cool-house-Favim_com-124117.jpg', 'http://nhoffmanandco.com/blog/blog/wp-content/uploads/2017/04/Awesome-blue-building-cool-house-Favim_com-124117.jpg', 600, 1, 5, 6, 'Canada', 'Foxhound', 'Toronto', 'Ontario', '345678', true),
(3, 'Cozy Cottege on McGregor Lake', 'description', 'https://i.pinimg.com/736x/9b/cf/80/9bcf80905381b887e41fa445761bc634.jpg', 'https://i.pinimg.com/736x/9b/cf/80/9bcf80905381b887e41fa445761bc634.jpg', 450, 2, 4, 4, 'Canada', 'Crepe', 'Montreal', 'Quebec', '234567', true),
(4, 'Kamanik Guesthouse', 'description', 'https://a0.muscache.com/im/pictures/35ac288c-19f5-40dc-b3e7-89fa8cb92ede.jpg?im_w=1200', 'https://a0.muscache.com/im/pictures/576f8133-280e-4c46-9b15-d86b6fb12e3a.jpg?im_w=720', 275, 1, 2, 3, 'Canada', 'Kamanik', 'Gatineau', 'Quebec', '123456', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES
('2018-09-11', '2018-09-26', 3, 2),
('2019-01-04', '2019-02-01', 1, 1),
('2021-10-01', '2021-10-14', 2, 4),
('2014-10-21', '2014-10-21', 4, 4);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES
(2, 3, 1, 2, 'message'),
(1, 1, 2, 4, 'message'),
(4, 2, 3, 4, 'message'),
(2, 4, 4, 5, 'message');