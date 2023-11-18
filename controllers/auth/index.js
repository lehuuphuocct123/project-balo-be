const { Router } = require("express");
const knex = require("knex");
const knexfile = require("../../knexfile");

const db = knex(knexfile.development);
const routerAuth = Router();

// login
routerAuth.post("/login", async (req, res) => {
  const infoUser = req.body;
  try {
    const user = await db("user")
      .where({
        email: infoUser.email,
      })
      .first();
    if (user && user.role === "ADMIN" && user.password === infoUser.password) {
      const { password, ...data } = user;
      return res.status(200).json({ data });
    }
    return res
      .status(400)
      .json({ message: "Vui lòng kiểm tra lại thông tin tài khoản!" });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

routerAuth.put("/change-password/:id", async (req, res) => {
  const info = req.body;
  const id = req.params.id;
  try {
    const user = await db.select("*").from("user").where({ id }).first();
    if (user.email === info.oldPassword) {
      await db("user").where({ id }).update({
        password: info.newPassword,
      });
      return res.status(200).json({ message: "success" });
    }
    return res.status(400).json({ message: "Mật khẩu không chính xác!" });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = routerAuth;
