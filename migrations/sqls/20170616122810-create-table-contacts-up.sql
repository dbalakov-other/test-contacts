CREATE EXTENSION btree_gin;
CREATE EXTENSION pg_trgm;

CREATE TABLE "Contacts" (
  "id"      SERIAL  PRIMARY KEY,
  "user"    SERIAL  REFERENCES "Users" ("id"),
  "name"    TEXT    NOT NULL,
  "surname" TEXT    NOT NULL
);

CREATE INDEX "Contacts_user_idx" ON "Contacts" ("user");
CREATE INDEX "Contacts_search_idx" ON "Contacts" USING GIN (lower("name") gin_trgm_ops, lower("surname") gin_trgm_ops);