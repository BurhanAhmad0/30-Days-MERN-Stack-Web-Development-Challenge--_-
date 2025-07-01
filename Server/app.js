const express = require("express");
const app = express();

// Middleware, routes, DB, etc.
app.use(express.json());
app.use("/api/users", require("./Routes/User/user.route"));

module.exports = app; // 👈 export app only (no listen)
