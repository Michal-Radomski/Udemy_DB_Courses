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
select
  username,
  contents
from
  users
  join comments on comments.user_id = users.id
where
  username = 'Alyson14';

explain
select
  username,
  contents
from
  users
  join comments on comments.user_id = users.id
where
  username = 'Alyson14';

explain analyze
select
  username,
  contents
from
  users
  join comments on comments.user_id = users.id
where
  username = 'Alyson14';

select
  users.username,
  tags.created_at
from
  users
  join (
    select
      user_id,
      created_at
    from
      caption_tags
    union
    all
    select
      user_id,
      created_at
    from
      photo_tags
  ) as tags on tags.user_id = users.id
where
  tags.created_at < '2010-01-07';

-- Below the same: Common Table Expression:
with tags as (
  select
    user_id,
    created_at
  from
    caption_tags
  union
  all
  select
    user_id,
    created_at
  from
    photo_tags
)
select
  users.username,
  tags.created_at
from
  users
  join tags as tags on tags.user_id = users.id
where
  tags.created_at < '2010-01-07';

-- CTE - Recursive
with recursive countdown(val) as (
  select
    3 as val
  union
  select
    val -1
  from
    countdown
  where
    val > 1
)
select
  *
from
  countdown;

with recursive suggestions(leader_id, follower_id, depth) AS (
  select
    leader_id,
    follower_id,
    1 as depth
  from
    followers
  where
    follower_id = 1000
  union
  select
    followers.leader_id,
    followers.follower_id,
    depth + 1
  from
    followers
    join suggestions on suggestions.leader_id = followers.follower_id
  where
    depth < 3
)
select
  distinct users.id,
  users.username
from
  suggestions
  join users on users.id = suggestions.leader_id
where
  depth > 1
limit
  5;

select
  username,
  count(*)
from
  users
  join (
    select
      user_id
    from
      photo_tags
    union
    all
    select
      user_id
    from
      caption_tags
  ) as tags on tags.user_id = users.id
group by
  username
order by
  count(*) desc;

-- Creating a View
create view tags as (
  select
    id,
    created_at,
    user_id,
    post_id,
    'photo_tag' as type
  from
    photo_tags
  union
  all
  select
    id,
    created_at,
    user_id,
    post_id,
    'caption_tag' as type
  from
    caption_tags
);

select
  *
from
  tags
where
  type = 'caption_tag';

select
  username,
  count(*)
from
  users
  join tags on tags.user_id = users.id
group by
  username
order by
  count(*) desc;

-- ----------------
create view recent_posts as (
  select
    *
  from
    posts
  order by
    created_at desc
  limit
    10
);

select
  *
from
  recent_posts;

create
or replace view recent_posts as (
  select
    *
  from
    posts
  order by
    created_at desc
  limit
    15
);

select
  *
from
  recent_posts;

drop view recent_posts;

-- Materialized View
select
  *
from
  likes
  left join posts on posts.id = likes.post_id
  left join comments on comments.id = likes.comment_id;

create materialized view weekly_likes as (
  select
    date_trunc(
      'week',
      coalesce(posts.created_at, comments.created_at)
    ) as week,
    count(posts.id) as num_posts,
    count (comments.id) as num_comments
  from
    likes
    left join posts on posts.id = likes.post_id
    left join comments on comments.id = likes.comment_id
  group by
    week
  order by
    week
) with data;

select
  *
from
  weekly_likes;

refresh materialized view weekly_likes;

-- Transactions
create table accounts (
  id serial primary key,
  name varchar(20) not null,
  balance integer not null
);

insert into
  accounts (name, balance)
values
  ('Gia', 100),
  ('Alyson', 100);

select
  *
from
  accounts;

Begin;

Commit;

Rollback;

-- -------------------
alter table
  comments rename column contents to body;

-- New Schema -> test:
create schema test;

create table test.users (id serial primary key, username varchar);

insert into
  test.users (username)
values
  ('alex'),
  ('burek');

select
  *
from
  test.users;