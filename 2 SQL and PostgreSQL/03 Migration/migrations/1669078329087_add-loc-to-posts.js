/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
ALTER TABLE posts ADD COLUMN loc POINT;
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
  ALTER TABLE posts DROP COLUMN loc;
    `);
};

// To run:
// DATABASE_URL=postgres://<user>:<password>@localhost:5432/social_network npm run migrate up
