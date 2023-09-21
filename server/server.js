const express = require("express");
require("dotenv").config();

const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route includes
const userRouter = require("./routes/user.router");
const sitesRouter = require("./routes/sites.router");
const detailsRouter = require("./routes/details.router");
const photosRouter = require("./routes/photos.router");
const usersRouter = require("./routes/users.router");

// Express middleware
app.use(express.json());

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use("/api/sites", sitesRouter);
app.use("/api/details", detailsRouter);
app.use("/api/photos", photosRouter);
app.use("/api/users", usersRouter);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 8002;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
