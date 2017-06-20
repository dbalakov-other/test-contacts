CREATE TABLE "ContactItems" (
  "id"      SERIAL  PRIMARY KEY,
  "contact" SERIAL  REFERENCES "Contacts" ("id"),
  "type"    VARCHAR NOT NULL,
  "text"    VARCHAR NOT NULL
);