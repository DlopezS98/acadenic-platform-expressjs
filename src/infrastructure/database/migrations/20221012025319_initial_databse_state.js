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
  })
  .createTable("role_claims", (table) => {
    table.uuid("id", { primaryKey: true  });
    table.uuid("role_id").references("id").inTable("roles").notNullable();
    table.string("claim_type", 80).notNullable();
    table.string("claim_value", 150).notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("role_claims")
    .dropTableIfExists("user_roles")
    .dropTableIfExists("users")
    .dropTableIfExists("roles");
};
