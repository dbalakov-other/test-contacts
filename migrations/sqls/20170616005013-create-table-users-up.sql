CREATE TABLE "Users" (
  "id"       SERIAL  PRIMARY KEY,
  "email"    VARCHAR NOT NULL UNIQUE,
  "name"     VARCHAR NOT NULL,
  "surname"  VARCHAR NOT NULL,
  "password" VARCHAR NOT NULL
);