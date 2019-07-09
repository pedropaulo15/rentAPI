"use strict";

/**
 * @swagger
 * PropertyType:
 *   Facility:
 *     type: object
 *     properties:
 *       id:
 *         type: uuid
 *       name:
 *         type: string
 */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class PropertyType extends Model {}

module.exports = PropertyType;
