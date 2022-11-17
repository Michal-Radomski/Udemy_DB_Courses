select
  paid,
  count(*)
from
  orders
group by
  paid;

select
  first_name,
  last_name,
  paid
from
  users
  JOIN orders ON orders.user_id = users.id;

-- default: ASC
select
  *
from
  products
order by
  price DESC;

select
  *
from
  products
order by
  name;

select
  *
from
  products
order by
  price,
  weight;

select
  *
from
  users
limit
  5 offset 40;

select
  *
from
  products
order BY
  price DESC
LIMIT
  5;

(
  select
    *
  FROM
    products
  order BY
    price desc
  LIMIT
    4
)
UNION
(
  select
    *
  FROM
    products
  order BY
    price / weight desc
  LIMIT
    4
);

(
  select
    *
  FROM
    products
  order BY
    price desc
  LIMIT
    4
)
INTERSECT
(
  select
    *
  FROM
    products
  order BY
    price / weight desc
  LIMIT
    4
);

(
  select
    *
  FROM
    products
  order BY
    price desc
  LIMIT
    4
)
EXCEPT
  (
    select
      *
    FROM
      products
    order BY
      price / weight desc
    LIMIT
      4
  );

select
  name,
  price
FROM
  products
WHERE
  price >(
    select
      max(price)
    FROM
      products
    WHERE
      department = 'Toys'
  );

select
  name,
  price,
  (
    select
      max(price)
    FROM
      products
  ) as max_value
FROM
  products
WHERE
  price > 867;

-- Alias: as p
select
  name,
  price_weight_ratio
FROM
  (
    select
      name,
      price / weight as price_weight_ratio
    FROM
      products
  ) as p
WHERE
  price_weight_ratio > 5;

select
  *
FROM
  (
    select
      max(price)
    FROM
      products
  ) as p;

select
  AVG(p.order_count)
from
  (
    select
      user_id,
      count(*) as order_count
    FROM
      orders
    GROUP BY
      user_id
  ) as p;

select
  first_name
FROM
  users
  JOIN (
    select
      user_id
    FROM
      orders
    WHERE
      product_id = 3
  ) as o on o.user_id = users.id;

select
  id
FROM
  orders
WHERE
  product_id IN (
    select
      id
    FROM
      products
    WHERE
      price / weight > 30
  );