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

select
  name,
  price
FROM
  products
WHERE
  price >(
    select
      avg(price)
    FROM
      products
  );

select
  department
FROM
  products
WHERE
  price < 100;

select
  name,
  department
FROM
  products
WHERE
  department not in (
    select
      department
    FROM
      products
    WHERE
      price < 100
  );

select
  name,
  department,
  price
FROM
  products
WHERE
  price > (
    select
      MAX(price)
    FROM
      products
    WHERE
      department = 'Industrial'
  );

select
  name,
  department,
  price
FROM
  products
WHERE
  price > ALL (
    select
      price
    from
      products
    WHERE
      department = 'Industrial'
  );

select
  name,
  department,
  price
FROM
  products
WHERE
  price > SOME (
    select
      price
    from
      products
    WHERE
      department = 'Industrial'
  );

select
  name,
  department,
  price
FROM
  products As p1
WHERE
  p1.price = (
    select
      Max(price)
    FROM
      products as p2
    WHERE
      p1.department = p2.department
  );

select
  p1.name,
  (
    select
      COUNT(*)
    FROM
      orders as o1
    WHERE
      o1.product_id = p1.id
  ) as num_orders
from
  products as p1;

select
  (
    select
      max(price)
    FROM
      products
  );

select
  (
    (
      select
        max(price)
      FROM
        products
    ) / (
      select
        MIN(price)
      FROM
        products
    )
  );

select
  DISTINCT department,
  name
FROM
  products;

-- distinct over one single column!!!
select
  COUNT(DISTINCT department)
FROM
  products;

select
  GREATEST(20, 10, 30);

select
  name,
  weight,
  GREATEST(30, 2 * weight)
FROM
  products;

select
  LEAST(20, 10, 30);

select
  name,
  price,
  LEAST(price * 0.5, 400)
FROM
  products;

select
  name,
  price,
  CASE
    WHEN price > 600 THEN 'high'
    when price > 300 THEN 'medium'
    ELSE 'cheap'
  END
FROM
  products;