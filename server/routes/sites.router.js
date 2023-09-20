const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET all sites
 */
router.get("/", (req, res) => {
  pool
    .query(
      "SELECT DISTINCT ON (sites.id) sites.id, sites.street, sites.city, sites.state, sites.zip, sites.latitude, sites.longitude, sites.site_name, sites.architect, sites.year_built, sites.description, site_photos.photo_id, site_photos.photo_name, site_photos.url_id, site_photos.size, site_photos.sites_id FROM sites LEFT OUTER JOIN site_photos ON sites.id = site_photos.sites_id;"
    )
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
/**
 * GET filtered sites
 */
// req.body should be an array with objects containing field, and input value
// const sampleBody = [
//   { field: "architect", input: "williaM purvy" },
//   { field: "street", input: "penn" },
// ];
router.get("/filtered", (req, res) => {
  const whereStatement =
    JSON.parse(req.query.filters).length > 0
      ? "WHERE " +
        JSON.parse(req.query.filters)
          .map(
            (filter) =>
              `${filter.input
                .split(" ")
                .map((input) => `${filter.field} ILIKE '%${input}%'`)
                .join(" AND ")} `
          )
          .join("AND ")
      : "";
  const queryText = `
  SELECT DISTINCT ON (sites.id) sites.id, sites.street, sites.city, sites.state, sites.zip, sites.latitude, sites.longitude, sites.site_name, sites.architect, sites.year_built, sites.description, site_photos.photo_id, site_photos.photo_name, site_photos.url_id, site_photos.size, site_photos.sites_id FROM sites LEFT OUTER JOIN site_photos ON sites.id = site_photos.sites_id ${whereStatement};`;
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
/**
 * GET all columns in sites table
 */
router.get("/columns", (req, res) => {
  pool
    .query(
      `
    SELECT *
    FROM information_schema.columns
    WHERE table_name   = 'sites';
    `
    )
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

/**
 * Adds new Site to database
 */
router.post("/", (req, res) => {
  const queryText = `
        INSERT INTO sites 
        (street, city, state, zip, latitude, longitude, site_name, architect, year_built, description)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
    `;
  const queryArgs = [
    req.body.street,
    req.body.city,
    req.body.state,
    req.body.zip,
    req.body.longitude,
    req.body.latitude,
    req.body.site_name,
    req.body.site_name,
    req.body.year_built,
    req.body.description,
  ];
  pool
    .query(queryText, queryArgs)
    .then((response) => res.sendStatus(200))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

/**
 * Edit site in database
 */
router.put("/", (req, res) => {
  const queryText = `
        UPDATE sites 
        SET street =$1, city =$2, state =$3, zip =$4, latitude =$5, longitude =$6, site_name =$7, architect =$8, year_built =$9, description =$10
        WHERE $11 = id;
        
    `;
  const queryArgs = [
    req.body.street,
    req.body.city,
    req.body.state,
    req.body.zip,
    req.body.latitude,
    req.body.longitude,
    req.body.site_name,
    req.body.architect,
    req.body.year_built,
    req.body.description,
    req.body.id,
  ];
  pool
    .query(queryText, queryArgs)
    .then((response) => res.sendStatus(200))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

/**
 * Delete
 */
router.delete("/:id", (req, res) => {
  const queryText = `
        DELETE FROM sites 
        WHERE id = $1;
    `;
  const queryArgs = [req.params.id];
  pool
    .query(queryText, queryArgs)
    .then((response) => res.sendStatus(204))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
