const express = require("express");
const path = require("path");
const app = express(); // using express for this api
const port = 8888;

// static files from the root directory
app.use(express.static(__dirname));

app.get("/curated", (req, res) => {
  res.sendFile(path.join(__dirname, "curated.html"));
});

app.get("/logged", (req, res) => {
  res.sendFile(path.join(__dirname, "logged.html"));
});
app.get("/favicon.ico", (req, res) => res.status(204));

// starting server using node authenticate.js
app.listen(port, () => console.info(`Listening on port ${port}`));
