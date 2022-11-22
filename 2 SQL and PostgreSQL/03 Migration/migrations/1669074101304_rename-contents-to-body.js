/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
  ALTER TABLE comments RENAME COLUMN contents TO body;
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
  ALTER TABLE comments RENAME COLUMN body TO contents; 
  `);
};

// To run:
// DATABASE_URL=postgres://<user>:<password>@localhost:5432/social_network npm run migrate up
