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
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
