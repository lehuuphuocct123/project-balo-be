const { Router } = require("express");
const routerUpload = Router();
const fs = require("fs");
const path = require('path');


// trả về data product
routerUpload.post("/", async (req, res) => {
  const { image } = req.files;
  if (!image) return res.sendStatus(400);

  // Move the uploaded image to our upload folder
  image.mv("upload" + "/" + image.name);

  res.status(200).json({ image: image.name });
});

module.exports = routerUpload;
