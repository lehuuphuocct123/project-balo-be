/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("product", function (table) {
    table.increments("id").primary();
    table.string("name");
    table.string("image");
    table.string("color");
    table.integer("quantity");
    table.integer("price");
    table.string("description");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now()).nullable();
    table
      .integer("category_id")
      .unsigned()
      .references("id")
      .inTable("category");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
