"use strict";

const { test, trait, before, after } = use("Test/Suite")("Create User");
const User = use("App/Models/User");
const faker = require("faker");

trait("Test/ApiClient");
trait("DatabaseTransactions");

test("creates a new user", async ({ client, assert }) => {
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
    .get(`/user/${uuid}`)
    .header("accept", "application/json")
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    id: uuid,
    email: email
  });
});
