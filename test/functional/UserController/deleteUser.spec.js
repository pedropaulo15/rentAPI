"use strict";

const { test, trait, before, after } = use("Test/Suite")("Delete User");
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

  assert.plan(3);

  const deleteResponse = await client
    .delete(`/user/${uuid}`)
    .header("accept", "application/json")
    .end();

  deleteResponse.assertStatus(200);
  deleteResponse.assertJSONSubset({
    id: uuid,
    email: email
  });

  const getResponse = await client
    .get(`/user/${uuid}`)
    .header("accept", "application/json")
    .end();
  getResponse.assertStatus(404);
});
