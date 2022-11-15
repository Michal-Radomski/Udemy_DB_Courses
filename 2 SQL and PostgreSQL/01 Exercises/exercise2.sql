CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50)
);

INSERT INTO
  users (username)
VALUES
  ('monahan93'),
  ('pferrer'),
  ('si93onis'),
  ('99stroman');

-- Removes photos when user is deleted
CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  url VARCHAR(200),
  user_id INTEGER REFERENCES users(id) on DELETE CASCADE;

-- * Set null for deleted users
--  user_id INTEGER REFERENCES users(id) on DELETE SET NULL
);

INSERT INTO
  photos (url, user_id)
VALUES
  ('http://one.jpg', 4);

INSERT INTO
  photos (url, user_id)
VALUES
  ('http://two.jpg', 1),
  ('http://25.jpg', 1),
  ('http://36.jpg', 1),
  ('http://754.jpg', 2),
  ('http://35.jpg', 3),
  ('http://256.jpg', 4);

SELECT
  *
FROM
  photos
WHERE
  user_id = 4;

SELECT
  *
FROM
  photos
  JOIN users on users.id = photos.user_id;

SELECT
  url,
  username
FROM
  photos
  JOIN users on users.id = photos.user_id;

-- NO user associated with this photo
INSERT INTO
  photos (url, user_id)
VALUES
  ('http://one.jpg', NULL);

DROP TABLE photos