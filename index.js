var express = require("express");
var cors = require("cors");
const multer = require("multer");
require("dotenv").config();

var app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./files");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: fileStorage });

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  console.log(req.file);
  console.log("file upload success!");
  let response = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  };
  res.send(response);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
