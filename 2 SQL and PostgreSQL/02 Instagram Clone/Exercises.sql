select
  *
from
  users
order by
  id desc
limit
  3
select
  username,
  caption
from
  users
  join posts on posts.user_id = users.id
where
  posts.user_id = 200;

select
  username,
  count(*)
from
  users
  join likes on likes.user_id = users.id
group by
  username;