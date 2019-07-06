'use strict'

const { test, trait, before, after } = use('Test/Suite')('UserController');
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('DatabaseTransactions');

before(async () => {
  await User.create({
    id: 123,
    username: 'CreateUser',
    email: 'createuser@user.com',
    password: '123456'
  });
});

after(async () => {
  const user = await User.findOrFail(123);
  await user.delete();
});

test('creates a new user', async ({ client, assert }) => {
  assert.plan(3);

  const deleteResponse = await client.delete(`/users/${123}`)
    .header('accept', 'application/json')
    .end();

  deleteResponse.assertStatus(200);
  deleteResponse.assertJSONSubset({
    id: 123,
    username: 'CreateUser',
    email: 'createuser@user.com'
  });

  const getResponse = await client.get(`/users/${123}`)
    .header('accept', 'application/json')
    .end();
  getResponse.assertStatus(404);
});
