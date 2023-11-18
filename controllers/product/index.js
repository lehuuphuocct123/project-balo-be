const { Router } = require("express");
const knex = require("knex");
const knexfile = require("../../knexfile");

const db = knex(knexfile.development);
const routerProduct = Router();

// trả về data product
routerProduct.get("/", async (req, res) => {
  const search = req.query.search || "";
  try {
    const product = await db
      .select(
        "*",
        "product.id as product_id",
        "product.name as product_name",
        "category.id as category_id",
        "category.name as category_name"
      )
      .from("product")
      .from("product")
      .where("product.name", "like", `%${search}%`)
      .leftJoin("category", "product.category_id", "category.id");
    return res.status(200).json({ data: product });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// trả về data 1 product
routerProduct.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await db("product").where("id", id).first();
    return res.status(200).json({ data: product });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// tạo 1 product
routerProduct.post("/", async (req, res) => {
  const product = req.body;
  try {
    await db("product").insert({
      name: product.name,
      color: product.color,
      image: product.image,
      price: product.price,
      quantity: product.quantity,
      description: product.description,
      category_id: product.category_id,
    });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// cập nhật 1 product
routerProduct.put("/:id", async (req, res) => {
  const product = req.body;
  const id = req.params.id;
  try {
    await db("product")
      .where({ id })
      .update({ ...product });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

//xóa 1 product
routerProduct.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db("product").where({ id }).del();
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ error });
  }
});
module.exports = routerProduct;
