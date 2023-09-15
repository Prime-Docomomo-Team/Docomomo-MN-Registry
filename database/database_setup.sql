-- Create new database called 'docomomo_registry'

CREATE TABLE "sites" (
  "id" SERIAL PRIMARY KEY,
  "street" VARCHAR (500),
  "city" VARCHAR (80),
  "state" VARCHAR (80),
  "zip" INT,
  "latitude" REAL,
  "longitude" REAL,
  "site_name" VARCHAR(1000),
  "architect" VARCHAR (500),
  "year_built" VARCHAR (80),
  "description" VARCHAR
);

CREATE TABLE "site_photos" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(1000),
  "url_id" VARCHAR(500),
  "size" INT,
  "sites_id" INT REFERENCES "sites"
);