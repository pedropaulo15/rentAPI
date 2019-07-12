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
 *       locationId:
 *         type: uuid
 *       location:
 *         $ref: '#/definitions/Location'
 *       facilityId:
 *         type: uuid
 *       facility:
 *         $ref: '#/definitions/Facility'
 *       propertyTypeId:
 *         type: uuid
 *       property_type:
 *         $ref: '#/definitions/PropertyType'
 */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Property extends Model {}

module.exports = Property;
