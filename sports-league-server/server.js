const express = require("express");
// const cors = require("cors");
const server = express();
const port = process.env.PORT || 3001;
const fs = require("fs");

// Middleware to parse JSON request bodies
server.use(express.json());
// server.use(cors());

// Serve your db.json file
server.get("/api/data", (req, res) => {
  // Use fs.readFile to read the JSON file
  fs.readFile("./db.json", (err, data) => {
    if (err) {
      console.error("Error reading db.json:", err);
      res.status(500).send("Internal Server Error");
    } else {
      try {
        const jsonData = JSON.parse(data);
        res.json(jsonData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        res.status(500).send("Internal Server Error");
      }
    }
  });
});

// Start the Express server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = server;
