"use strict";

const Env = use("Env");
const Youch = use("Youch");
const BaseExceptionHandler = use("BaseExceptionHandler");

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { request, response }) {
    // If is a validation error just return error msg in JSON format
    if (error.name === "ValidationException") {
      return response.status(error.status).send(error.messages);
    }

    // Get more details error on development mode
    if (Env.get("NODE_ENV" === "development")) {
      // use youch to format error
      const youch = new Youch(error, request.request);
      const errorJson = await youch.toJSON();

      return response.status(error.status).send(errorJson);
    }

    return response.status(error.status);
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report(error, { request }) {
    console.log(error);
  }
}

module.exports = ExceptionHandler;
