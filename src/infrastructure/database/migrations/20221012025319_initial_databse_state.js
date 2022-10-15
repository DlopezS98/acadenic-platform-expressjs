/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.uuid("id", { primaryKey: true })
    table.string("email", 80).notNullable().unique();
    table.string("username", 50).notNullable();
    table.string("password", 50).notNullable();
    table.string("firstname", 60).nullable();
    table.string("lastname", 60).nullable();
    table.string("normalized_username").notNullable();
    table.string("normalized_email").notNullable();
    table.string("locked").notNullable().defaultTo(false);
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").nullable();
  })
  .createTable("roles", (table) => {
    table.uuid("id", { primaryKey: true });
    table.string("name", 50).notNullable();
    table.string("description", 350).nullable();
    table.boolean("active").notNullable().defaultTo(true);
  })
  .createTable("user_roles", (table) => {
    table.uuid("user_id").references("id").inTable("users").notNullable();
    table.uuid("role_id").references("id").inTable("roles").notNullable();
    table.primary(["user_id", "role_id"]);
  })
  .createTable("role_claims", (table) => {
    table.uuid("id", { primaryKey: true  });
    table.uuid("role_id").references("id").inTable("roles").notNullable();
    table.string("claim_type", 80).notNullable();
    table.string("claim_value", 150).notNullable();
  })
  .createTable("categories", (table) => {
    table.uuid("id").primary();
    table.string("name", 80).notNullable();
    table.string("description", 250).nullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").nullable();
  })
  .createTable("tags", (table) => {
    table.uuid("id").primary();
    table.string("name", 30).notNullable().unique();
  })
  .createTable("resources", (table) => {
    table.uuid("id").primary();
    table.string("title", 80).notNullable();
    table.string("description").nullable();
    table.enu("type", ["application/pdf", "image/png", "video/mp4", "image/jpeg"], { enumName: "mime_types" } )
    table.string("short_description").nullable();
    table.specificType("tags", 'TEXT[]').nullable();
    table.string("url").notNullable();
    table.boolean("public").notNullable().defaultTo(true);
    table.uuid("created_by").references("id").inTable("users").notNullable();
    table.uuid("updated_by").references("id").inTable("users").nullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").nullable();
  })
  .createTable("resource_categories", (table) => {
    table.uuid("resource_id").references("id").inTable("resources").notNullable();
    table.uuid("category_id").references("id").inTable("categories").notNullable();
    table.primary(["resource_id", "category_id"]);
  })
  .createTable("comments", (table) => {
    table.uuid("id").primary();
    table.uuid("user_id").references("id").inTable("users").notNullable();
    table.uuid("resource_id").references("id").inTable("resources").notNullable();
    table.string("comment").notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").nullable();
  })
  .createTable("resource_ratings", (table) => {
    table.uuid("resource_id").references("id").inTable("resources").notNullable();
    table.uuid("user_id").references("id").inTable("users").notNullable();
    table.integer("rating").notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.primary(["resource_id", "user_id"]);
  })
  .createTable("favorites", (table) => {
    table.uuid("resource_id").references("id").inTable("resources").notNullable();
    table.uuid("user_id").references("id").inTable("users").notNullable();
    table.primary(["resource_id", "user_id"]);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("tags")
    .dropTableIfExists("resource_categories")
    .dropTableIfExists("comments")
    .dropTableIfExists("resource_ratings")
    .dropTableIfExists("favorites")
    .dropTableIfExists("resources")
    .dropTableIfExists("categories")
    .dropTableIfExists("role_claims")
    .dropTableIfExists("user_roles")
    .dropTableIfExists("users")
    .dropTableIfExists("roles");
};
