"use strict";
/**
 * @swagger
 * definitions:
 *   Facility:
 *     type: object
 *     properties:
 *       id:
 *         type: uuid
 *       garage:
 *         type: boolean
 *       air_conditioning:
 *         type: boolean
 *       internet:
 *         type: boolean
 *       lift:
 *         type: boolean
 *       tv:
 *         type: boolean
 *       dryer:
 *         type: boolean
 *       wash_machine:
 *         type: boolean
 *       microwave:
 *         type: boolean
 */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Facility extends Model {}

module.exports = Facility;
