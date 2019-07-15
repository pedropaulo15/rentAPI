"use strict";

/**
 * @swagger
 * definitions:
 *   Location:
 *     type: object
 *     properties:
 *       id:
 *         type: uuid
 *       name:
 *         type: string
 */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Location extends Model {}

module.exports = Location;
