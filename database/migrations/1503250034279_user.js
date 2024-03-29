"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  async up() {
    // Create extension to accept uuid
    await this.db.raw(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp" schema public'
    );

    this.create("users", table => {
      // Generate uuid
      table
        .uuid("id")
        .unique()
        .defaultTo(this.db.raw("uuid_generate_v4()"))
        .primary();
      table.string("name", 80).notNullable();
      table.string("surname", 80).notNullable();
      table
        .string("email", 254)
        .notNullable()
        .unique();
      table.string("password", 60).notNullable();
      table.timestamps();
    });
  }

  async down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
