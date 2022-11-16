-- Default: Inner Join as below:
select
  contents,
  username
FROM
  comments
  JOIN users on users.id = comments.user_id;

select
  url,
  contents,
  username
FROM
  COMMENTS
  JOIN photos on photos.id = comments.photo_id
  JOIN users on users.id = comments.user_id
  AND users.id = photos.user_id;

select
  user_id,
  COUNT(id) as num_comments_created
FROM
  COMMENTS
GROUP BY
  user_id;

select
  COUNT(*)
FROM
  photos;

select
  user_id,
  count(*)
FROM
  COMMENTS
GROUP BY
  user_id;

select
  photo_id,
  count(*)
FROM
  COMMENTS
group BY
  photo_id;

select
  photo_id,
  COUNT(*)
FROM
  COMMENTS
WHERE
  photo_id < 3
group BY
  photo_id
HAVING
  COUNT(*) > 2;

SELECT
  user_id,
  COUNT(*)
FROM
  COMMENTS
WHERE
  photo_id < 50
GROUP BY
  user_id
HAVING
  COUNT(*) > 20;