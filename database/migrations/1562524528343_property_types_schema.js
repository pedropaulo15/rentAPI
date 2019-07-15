"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PropertyTypesSchema extends Schema {
  async up() {
    // Create extension to accept uuid
    await this.db.raw(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp" schema public'
    );
    this.create("property_types", table => {
      // Generate uuid
      table
        .uuid("id")
        .unique()
        .defaultTo(this.db.raw("uuid_generate_v4()"))
        .primary();
      table.string("name", 80).notNullable();
      table.timestamps();
    });
  }

  async down() {
    this.drop("property_types");
  }
}

module.exports = PropertyTypesSchema;
