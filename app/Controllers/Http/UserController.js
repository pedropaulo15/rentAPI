"use strict";

const User = use("App/Models/User");

class UserController {
  /**
   * @swagger
   * /users:
   *   get:
   *     tags:
   *       - Users
   *     summary: Sample API
   *     parameters:
   *       - username: username
   *         description: Name of the user
   *         in: query
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Create a new user
   */
  async create({ request }) {
    const data = request.only(["username", "email", "password"]);
    const user = await User.create(data);

    return user;
  }

  async display({ params }) {
    const user = await User.findOrFail(params.id);

    return user;
  }

  async update({ params, request }) {
    const user = await User.findOrFail(params.id);
    const data = request.only(["username", "email", "password"]);

    user.merge(data);
    await user.save();

    return user;
  }

  async destroy({ params }) {
    const user = await User.findOrFail(params.id);
    await user.delete();

    return user;
  }
}

module.exports = UserController;
