/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  // return knex.schema
  //   .alterTable('users', (table) => { table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')).alter(); })
  //   .alterTable('roles', (table) => { table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')).alter(); })
  //   .alterTable('role_claims', (table) => { table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')).alter(); })
  //   .alterTable('categories', (table) => { table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')).alter(); })
  //   .alterTable('tags', (table) => { table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')).alter(); })
  //   .alterTable('resources', (table) => { table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')).alter(); })
  //   .alterTable('comments', (table) => { table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')).alter(); });
  await knex.raw("ALTER TABLE users ALTER COLUMN id SET DEFAULT gen_random_uuid();");
  await knex.raw("ALTER TABLE roles ALTER COLUMN id SET DEFAULT gen_random_uuid();");
  await knex.raw("ALTER TABLE role_claims ALTER COLUMN id SET DEFAULT gen_random_uuid();");
  await knex.raw("ALTER TABLE categories ALTER COLUMN id SET DEFAULT gen_random_uuid();");
  await knex.raw("ALTER TABLE tags ALTER COLUMN id SET DEFAULT gen_random_uuid();");
  await knex.raw("ALTER TABLE resources ALTER COLUMN id SET DEFAULT gen_random_uuid();");
  await knex.raw("ALTER TABLE comments ALTER COLUMN id SET DEFAULT gen_random_uuid();");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  // return knex.schema
  //   .alterTable('users', (table) => { table.uuid('id').primary().alter(); })
  //   .alterTable('roles', (table) => { table.uuid('id').primary().alter(); })
  //   .alterTable('role_claims', (table) => { table.uuid('id').primary().alter(); })
  //   .alterTable('categories', (table) => { table.uuid('id').primary().alter(); })
  //   .alterTable('tags', (table) => { table.uuid('id').primary().alter(); })
  //   .alterTable('resources', (table) => { table.uuid('id').primary().alter(); })
  //   .alterTable('comments', (table) => { table.uuid('id').primary().alter(); });
};
