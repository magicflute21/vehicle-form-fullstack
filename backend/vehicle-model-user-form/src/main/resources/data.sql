TRUNCATE manufacturers, series, car_models RESTART IDENTITY CASCADE;

INSERT INTO manufacturers (name) VALUES
('Mercedes-Benz'),
('BMW'),
('Audi'),
('Citroën'),
('Muu');

INSERT INTO series (name, manufacturer_id) VALUES
-- Mercedes
('C klass', 1),
-- BMW
('3 seeria', 2),
('4 seeria', 2),
('5 seeria', 2),
-- Audi
('A seeria', 3),
('e-tron', 3),
('Q seeria', 3),
('RS seeria', 3),
('TT', 3);


INSERT INTO car_models (name, series_id) VALUES
-- Mercedes C class models (series_id 1)
('C 160', 1),
('C 180', 1),
('C 200', 1),
('C 220', 1),

-- BMW 3 series models (series_id 2)
('315', 2),
('316', 2),
('317', 2),
('318', 2),
('319', 2),

-- BMW 5 series models (series_id 4)
('518', 4),
('520', 4),
('523', 4),
('524', 4),
('525', 4),

-- Audi Q series models (series_id 7)
('Q2', 7),
('Q3', 7),
('Q4', 7),
('Q5', 7),
('Q7', 7),

-- Audi RS series models (series_id 8)
('RS4', 8),
('RS5', 8),
('RS6', 8);