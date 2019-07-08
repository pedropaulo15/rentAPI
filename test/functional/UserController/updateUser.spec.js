'use strict'

const { test, trait, before, after } = use('Test/Suite')('UserController');
const User = use('App/Models/User');
const faker = require("faker");

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('updates a new user', async ({ client, assert }) => {
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

  const response = await client.put(`user/${uuid}`)
    .send({
      username: 'userHasBeenUpdated',
      email: 'userhasbeenupdated@user.com',
    })
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    username: 'userHasBeenUpdated',
    email: 'userhasbeenupdated@user.com',
  });
});
