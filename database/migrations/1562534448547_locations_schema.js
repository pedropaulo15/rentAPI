"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LocationsSchema extends Schema {
  async up() {
    // Create extension to accept uuid
    await this.db.raw(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp" schema public'
    );

    this.create("locations", table => {
      // Generate uuid
      table
        .uuid("id")
        .unique()
        .defaultTo(this.db.raw("uuid_generate_v4()"))
        .primary();
      table
        .string("name", 80)
        .notNullable()
        .unique();
      table.timestamps();
    });
  }

  async down() {
    this.drop("locations");
  }
}

module.exports = LocationsSchema;
