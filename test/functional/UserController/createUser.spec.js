'use strict'

const { test, trait, before, after } = use('Test/Suite')('UserController');
const User = use('App/Models/User');
const faker = require("faker");

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('creates a new user', async ({ client, assert }) => {
  const random_uuid = faker.random.uuid();
  const random_userName = faker.internet.userName();
  const random_email = faker.internet.email();
  
  await User.create({
    id: random_uuid,
    username: random_userName,
    email: random_email,
    password: '123456'
  });

  assert.plan(2);

  const response = await client.get(`/user/${random_uuid}`)
    .header('accept', 'application/json')
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    id: random_uuid,
    username: random_userName,
    email: random_email
  });
});
