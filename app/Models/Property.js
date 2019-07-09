"use strict";

/**
 * @swagger
 * definitions:
 *   Property:
 *     type: object
 *     properties:
 *       id:
 *         type: uuid
 *       tile:
 *         type: string
 *       description:
 *         type: string
 *       price:
 *         type: string
 *       beds:
 *         type: string
 *       baths:
 *         type: string
 *       availability:
 *         type: string
 *       rent_period:
 *         type: string
 *      location_id:
          format: uuid
          type: string
        location:
          $ref: '#/definitions/locations'
        facility_id:
          format: uuid
          type: string
        facility:
          $ref: '#/definitions/facilities'
        property_type_id:
          format: uuid
          type: string
        property_type:
          $ref: '#/definitions/property_types'
 */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Property extends Model {}

module.exports = Property;
