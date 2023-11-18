const { Router } = require("express");
const knex = require("knex");
const knexfile = require("../../knexfile");

const db = knex(knexfile.development);
const routerCategory = Router();

// trả về data category
routerCategory.get("/", async (req, res) => {
  try {
    const category = await db.select("*").from("category");
    return res.status(200).json({ data: category });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

//trả về 1 bản ghi category
routerCategory.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const category = await db("category").where('id', id).first();
    return res.status(200).json({ data: category });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// tạo 1 category
routerCategory.post("/", async (req, res) => {
  const category = req.body;
  try {
    await db("category").insert({
      name: category.name
    });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// cập nhật 1 category
routerCategory.put("/:id", async (req, res) => {
  const category = req.body;
  const id = req.params.id;
  try {
    await db("category")
      .where({ id })
      .update({ ...category });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

//xóa 1 category
routerCategory.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db("category").where({ id }).del();
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ error });
  }
});
module.exports = routerCategory;
