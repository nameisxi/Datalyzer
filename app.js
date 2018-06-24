const path = require("path");
const express = require("express");
const app = express();
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/built'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/", "index.html"));
})

app.listen(3001);