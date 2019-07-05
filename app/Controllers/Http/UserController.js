'use strict'

const User = use('App/Models/User');

class UserController {
  async create({ request }) {
    const data = request.only(['username', 'email', 'password']);
    const user = await User.create(data);

    return user;
  }

  async update({ params, request }) {
    const user = await User.findOrFail(params.id);
    const data = request.only([
      'username',
      'email',
      'password'
    ]);

    user.merge(data);
    await user.save();

    return user;
  }

  async destroy({ params, response }) {
    const user = await User.findOrFail(params.id);
    await user.delete();

    return user;
  }
}

module.exports = UserController;
