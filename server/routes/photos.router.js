const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/:id", (req, res) => {
  const queryText = `SELECT * FROM "site_photos" WHERE sites_id = $1;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
      console.log("Photo details from server:", result.rows);
    })
    .catch((error) => {
      console.log("Error completing SELECT sites query", error);
      res.sendStatus(500);
    });
});
/**
 * GET All Photos
 */
router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "site_photos";`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
      console.log("All  photos from server:", result.rows);
    })
    .catch((error) => {
      console.log("Error completing SELECT All images query", error);
      res.sendStatus(500);
    });
});

/**
 * Adds new Photo to database
 */
router.post("/", (req, res) => {
  const queryText = `
        INSERT INTO site_photos 
        (photo_name, photo_credit, url_id, size, sites_id)
        VALUES
        ($1, $2, $3, $4, $5);
    `;
  const queryArgs = [
    req.body.photo_name,
    req.body.photo_credit,
    req.body.url_id,
    req.body.size,
    req.body.sites_id,
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
 * Edit Photo in database
 */
router.put("/", (req, res) => {
  const queryText = `
        UPDATE site_photos 
        SET photo_name =$1, photo_credit =$2, url_id =$3, size =$4, sites_id =$5
        WHERE $6 = photo_id;
        
    `;
  const queryArgs = [
    req.body.photo_name,
    req.body.photo_credit,
    req.body.url_id,
    req.body.size,
    req.body.sites_id,
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
 * Delete Photo from Database
 */
router.delete("/:id", (req, res) => {
  const queryText = `
        DELETE FROM site_photos 
        WHERE photo_id = $1;
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
