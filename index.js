const express = require("express");
const knex = require("knex");
const bodyParser = require("body-parser");
const router = require("./controllers");
var cors = require("cors");
const fileUpload = require("express-fileupload");
const knexfile = require("./knexfile");
const fs = require("fs");

const uploadDirectory = "./upload";

const app = express();
const port = 5000;

const db = knex(knexfile.development);

app.use(express.static("/upload"));
app.use(cors());
app.use(fileUpload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Kiểm tra xem thư mục đã tồn tại chưa
if (!fs.existsSync(uploadDirectory)) {
  // Nếu không tồn tại, tạo thư mục
  fs.mkdirSync(uploadDirectory);
}
app.use("/", router);

app.get("/upload", async (req, res) => {
  const image = req.query.image;
  res.sendFile(__dirname + `/upload/${image}`);
});

app.get("/check-connection", (req, res) => {
  db.raw("SELECT 1")
    .then(() => {
      res.status(200).json({ message: "Connected to the database" });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Failed to connect to the database", error: err });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
