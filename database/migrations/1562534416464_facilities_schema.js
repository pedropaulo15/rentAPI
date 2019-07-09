"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FacilitiesSchema extends Schema {
  async up() {
    // Create extension to accept uuid
    await this.db.raw(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp" schema public'
    );

    this.create("facilities", table => {
      // Generate uuid
      table
        .uuid("id")
        .unique()
        .defaultTo(this.db.raw("uuid_generate_v4()"))
        .primary();
      table.boolean("garage", 80).notNullable();
      table.boolean("air_conditioning", 80).notNullable();
      table.boolean("internet", 80).notNullable();
      table.boolean("lift", 80).notNullable();
      table.boolean("tv", 80).notNullable();
      table.boolean("dryer", 80).notNullable();
      table.boolean("wash_machine", 80).notNullable();
      table.boolean("microwave", 80).notNullable();
      table.timestamps();
    });
  }

  async down() {
    this.drop("facilities");
  }
}

module.exports = FacilitiesSchema;
