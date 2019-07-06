'use strict'

const { test, trait } = use('Test/Suite')('User');
const User = use('App/Models/User');

trait('Test/ApiClient');

test('creates a new user', async ({ client }) => {
  const random_id = Math.floor(Math.random() * 100);
  await User.create({
    id: random_id,
    username: 'test_user',
    email: 'test_user@user.com',
    password: '123456'
  });

  const response = await client.get(`/users/${random_id}`).end();

  response.assertStatus(200);
  response.assertJSONSubset({
    id: random_id,
    username: 'test_user',
    email: 'test_user@user.com'
  });
});
