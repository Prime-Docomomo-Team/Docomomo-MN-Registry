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
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
