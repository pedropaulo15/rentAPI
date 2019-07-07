"use strict";

const User = use("App/Models/User");

class UserController {
  /**
   * @swagger
   * /users:
   *   post:
   *     tags:
   *       - User
   *     name: Create
   *     summary: Register a new user
   *     consumes:
   *       - application/json
   *     produces:
   *       - text/plain
   *       - application/json
   *       - text/json
   *     parameters:
   *       - name: body
   *         in: body
   *         schema:
   *           $ref: '#/definitions/User'
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *             surname:
   *               type: string
   *             email:
   *               type: string
   *             password:
   *               type: string
   *               format: password
   *         required:
   *           - email
   *           - password
   *     responses:
   *       '200':
   *         description: User created
   *       '403':
   *         description: Username or email already taken
   */
  async create({ request }) {
    const data = request.only(["username", "email", "password"]);
    const user = await User.create(data);

    return user;
  }

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     tags:
   *       - Users
   *     name: Find user
   *     summary: Finds a user
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - text/plain
   *       - application/json
   *       - text/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         format: uuid
   *     responses:
   *       '200':
   *         description: A single user object
   *         schema:
   *           $ref: '#/definitions/User'
   *       '401':
   *         description: No auth token / no user found in db with that name
   *       '403':
   *         description: JWT token and username from client don't match
   */
  async display({ params }) {
    const user = await User.findOrFail(params.id);

    return user;
  }

  /**
   * @swagger
   * /users:
   *   put:
   *     tags:
   *       - Users
   *     name: Update User
   *     summary: Update user info
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - text/plain
   *       - application/json
   *       - text/json
   *     parameters:
   *       - name: body
   *         in: body
   *         schema:
   *           $ref: '#/definitions/User'
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *             surname:
   *               type: string
   *             email:
   *               type: string
   *         required:
   *           - email
   *     responses:
   *       '200':
   *         description: User info updated
   *       '403':
   *         description: No authorization / user not found
   */
  async update({ params, request }) {
    const user = await User.findOrFail(params.id);
    const data = request.only(["username", "email", "password"]);

    user.merge(data);
    await user.save();

    return user;
  }

  /**
   * @swagger
   * /users:
   *   delete:
   *     tags:
   *       - Users
   *     name: Delete User
   *     summary: Delete user
   *     security:
   *       - bearerAuth: []
   *     consumes: []
   *     produces:
   *       - text/plain
   *       - application/json
   *       - text/json
   *     parameters: []
   *     responses:
   *       '200':
   *         description: User deleted from db
   *       '403':
   *         description: Authentication error
   *       '404':
   *         description: No user in db with that name
   *       '500':
   *         description: Problem communicating with db
   */
  async destroy({ params, response }) {
    const user = await User.findOrFail(params.id);
    await user.delete();

    return user;
  }
}

module.exports = UserController;
