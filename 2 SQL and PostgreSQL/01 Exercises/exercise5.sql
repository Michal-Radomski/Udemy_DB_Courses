alter table
  products
alter column
  price
set
  not null;

Alter table
  products
alter column
  price
set
  default 999;

alter table
  products
add
  unique (name);

alter table
  products drop constraint products_name_key;

alter table
  products
add
  unique (name, department);

alter table
  products
add
  check (price > 0);

create table orders (
  id serial primary key,
  name varchar(40) not null,
  created_at Timestamp not null,
  est_delivery timestamp not null check (created_at < est_delivery)
);

insert into
  orders (name, created_at, est_delivery)
values
  (
    'shirt',
    '2022-nov-17 01:00AM',
    '2022-nov-22 01:00AM'
  );

select
  coalesce(null, 5);

select
  coalesce((5) :: Boolean :: Integer, 0);