const { Router } = require("express");
const knex = require("knex");
const knexfile = require("../../knexfile");

const db = knex(knexfile.development);
const routerUser = Router();

// trả về data user
routerUser.get("/", async (req, res) => {
  try {
    const user = await db.select("*").from("user");
    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

//trả về 1 bản ghi user
routerUser.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const user = await db("user").where('id', id).first();
    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// tạo 1 user
routerUser.post("/", async (req, res) => {
  const userBody = req.body;
  const user = await db.select("*").from("user").where({
    email: userBody.email,
  }).first();
  if (user) {
    return res.status(400).json({ message: "Tài khoản đã tồn tại!" });
  }
  try {
    await db("user").insert({
      name: userBody.name,
      age: Number(userBody.age),
      email: userBody.email,
      password: userBody.password,
      role: userBody.role,
    });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// cập nhật 1 user
routerUser.put("/:id", async (req, res) => {
  const user = req.body;
  const id = req.params.id;
  try {
    await db("user")
      .where({ id })
      .update({ ...user });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

//xóa 1 user
routerUser.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db("user").where({ id }).del();
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ error });
  }
});
module.exports = routerUser;
