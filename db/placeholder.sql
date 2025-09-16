INSERT INTO account (name, image)
VALUES
('svinoshpatel', 'http://localhost:3000/uploads/goatskull.png'),
('hruk', 'http://localhost:3000/uploads/moth.jpg'),
('zirkul', 'http://localhost:3000/uploads/2b-arch-wallpaper-no-text.png'),
('bambam', 'http://localhost:3000/uploads/spider.jpg'),
('bombom', 'http://localhost:3000/uploads/woman.jpg'),
('adam', 'http://localhost:3000/uploads/deer.jpg');

INSERT INTO auction (image, author_id, title, description, start_time, end_time)
VALUES
('http://localhost:3000/uploads/goatskull.png',
 2,
 'Goat Skull Auction',
 'A rare goat skull from the mountains',
 '2025-09-01 10:00:00',
 '2025-09-15 10:00:00'),

('http://localhost:3000/uploads/moth.jpg',
 3,
 'Moth Wings Collection',
 'Beautiful intricately patterned moth wings',
 '2025-09-03 12:00:00',
 '2025-09-20 12:00:00'),

('http://localhost:3000/uploads/2b-arch-wallpaper-no-text.png',
 4,
 '2B Arch Wallpaper',
 'High resolution wallpaper inspired by 2B from Nier',
 '2025-08-25 09:00:00',
 '2025-09-30 09:00:00'),

('http://localhost:3000/uploads/spider.jpg',
 5,
 'Spider Sculpture',
 'Handmade spider sculpture in metal',
 '2025-09-05 14:00:00',
 '2025-09-25 14:00:00'),

('http://localhost:3000/uploads/woman.jpg',
 6,
 'Portrait Painting',
 'Oil painting portrait of a woman',
 '2025-09-07 16:00:00',
 '2025-09-22 16:00:00'),

('http://localhost:3000/uploads/deer.jpg',
 7,
 'Deer in Forest',
 'Photograph of deer in a forest setting',
 '2025-09-10 08:00:00',
 '2025-09-24 08:00:00');
