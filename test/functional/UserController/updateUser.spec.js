"use strict";

const { test, trait, before, after } = use("Test/Suite")("Update User");
const User = use("App/Models/User");
const faker = require("faker");

trait("Test/ApiClient");
trait("DatabaseTransactions");

test("updates a new user", async ({ client, assert }) => {
  const uuid = faker.random.uuid();
  const email = faker.internet.email();

  await User.create({
    id: uuid,
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    email: email,
    password: "123456"
  });

  assert.plan(2);

  const response = await client
    .put(`user/${uuid}`)
    .send({
      email: "userhasbeenupdated@user.com"
    })
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    email: "userhasbeenupdated@user.com"
  });
});
