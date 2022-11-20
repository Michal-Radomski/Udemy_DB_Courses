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

show data_directory;

select
  oid,
  datname
from
  pg_database
select
  *
from
  pg_class;

Create index on users (username);

-- Or
Create index usrs_username_idx on users (username);

Drop index users_username_idx;

explain analyze
select
  *
from
  users
where
  username = 'Emil30';

select
  pg_size_pretty(pg_relation_size('users'));

select
  pg_size_pretty(pg_relation_size('users_username_idx'));

select
  relname,
  relkind
from
  pg_class
where
  relkind = 'i';

create extension pageinspect;

select
  *
from
  bt_metap('users_username_idx');

select
  *
from
  bt_page_items('users_username_idx', 3)