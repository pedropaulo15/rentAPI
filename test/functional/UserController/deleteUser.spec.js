'use strict'

const { test, trait, before, after } = use('Test/Suite')('UserController');
const User = use('App/Models/User');
const faker = require("faker");

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('creates a new user', async ({ client, assert }) => {
  const uuid = faker.random.uuid();
  const userName = faker.internet.userName();
  const email = faker.internet.email();

  await User.create({
    id: uuid,
    username: userName,
    email: email,
    password: '123456'
  });

  assert.plan(3);

  const deleteResponse = await client.delete(`/user/${uuid}`)
    .header('accept', 'application/json')
    .end();

  deleteResponse.assertStatus(200);
  deleteResponse.assertJSONSubset({
    id: uuid,
    username: userName,
    email: email
  });

  const getResponse = await client.get(`/user/${uuid}`)
    .header('accept', 'application/json')
    .end();
  getResponse.assertStatus(404);
});
