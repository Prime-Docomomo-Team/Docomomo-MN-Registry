const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET All Users
 */
router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "user";`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
      console.log("All  users from server:", result.rows);
    })
    .catch((error) => {
      console.log("Error completing SELECT All users query", error);
      res.sendStatus(500);
    });
});

/**
 * Adds new User to database
 */
router.post("/", (req, res) => {
  const queryText = `
        INSERT INTO user 
        (username, password, admin)
        VALUES
        ($1, $2, $3);
    `;
  const queryArgs = [req.body.username, req.body.password, req.body.admin];
  pool
    .query(queryText, queryArgs)
    .then((response) => res.sendStatus(200))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

/**
 * Edit User in database
 */
router.put("/", (req, res) => {
  const queryText = `
        UPDATE user 
        SET username =$1, password =$2, admin =$3
        WHERE $4 = id;
        
    `;
  const queryArgs = [
    req.body.username,
    req.body.password,
    req.body.admin,
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
 * Delete User from Database
 */
router.delete("/:id", (req, res) => {
  const queryText = `
        DELETE FROM user
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
