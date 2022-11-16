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