'use strict'

const { test, trait, before, after } = use('Test/Suite')('UserController');
const User = use('App/Models/User');
const faker = require("faker");

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('return the user based on its ID', async ({ client, assert }) => {
  const uuid = faker.random.uuid();
  const userName = faker.internet.userName();
  const email = faker.internet.email();

  await User.create({
    id: uuid,
    username: userName,
    email: email,
    password: '123456'
  });

  assert.plan(2);

  const response = await client.get(`/user/${uuid}`)
    .header('accept', 'application/json')
    .end();
  
  response.assertStatus(200);
  response.assertJSONSubset({
    id: uuid,
    username: userName,
    email: email,
  });
});
