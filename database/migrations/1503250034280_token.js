"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TokensSchema extends Schema {
  up() {
    this.create("tokens", table => {
      table
        .uuid("id")
        .unique()
        .defaultTo(this.db.raw("uuid_generate_v4()"))
        .primary();
      table
        .uuid("user_id")
        .unsigned()
        .references("id")
        .inTable("users");
      table
        .string("token", 255)
        .notNullable()
        .unique()
        .index();
      table.string("type", 80).notNullable();
      table.boolean("is_revoked").defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop("tokens");
  }
}

module.exports = TokensSchema;
