const path = require("path");
const express = require("express");
const app = express();
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/built'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/", "index.html"));
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})