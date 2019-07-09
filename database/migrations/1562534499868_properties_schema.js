"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PropertiesSchema extends Schema {
  async up() {
    // Create extension to accept uuid
    await this.db.raw(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp" schema public'
    );

    this.create("properties", table => {
      // Generate uuid
      table
        .uuid("id")
        .unique()
        .defaultTo(this.db.raw("uuid_generate_v4()"))
        .primary();
      table.string("title", 80).notNullable();
      table.string("description", 500).notNullable();
      table.string("price", 80).notNullable();
      table.string("beds", 80).notNullable();
      table.string("baths", 80).notNullable();
      table.string("availability", 80).notNullable();
      table.string("rent_period", 80).notNullable();
      table
        .uuid("location_id")
        .unsigned()
        .references("id")
        .inTable("locations")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .uuid("facility_id")
        .unsigned()
        .references("id")
        .inTable("facilities")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .uuid("property_type_id")
        .unsigned()
        .references("id")
        .inTable("property_types")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.timestamps();
    });
  }

  async down() {
    this.drop("properties");
  }
}

module.exports = PropertiesSchema;
