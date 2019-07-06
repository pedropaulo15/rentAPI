'use strict'

const { test, trait, before, after } = use('Test/Suite')('UserController');
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('DatabaseTransactions');

before(async () => {
  await User.create({
    id: 123,
    username: 'updateUser',
    email: 'updateuser@user.com',
    password: '123456'
  });
});

after(async () => {
  const user = await User.findOrFail(123);
  await user.delete();
});

test('updates a new user', async ({ client, assert }) => {
  assert.plan(2);

  const response = await client.put(`/users/${123}`)
    .send({
      username: 'userHasBeenUpdated',
      email: 'userhasbeenupdated@user.com',
    })
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    id: 123,
    username: 'userHasBeenUpdated',
    email: 'userhasbeenupdated@user.com'
  });
});
