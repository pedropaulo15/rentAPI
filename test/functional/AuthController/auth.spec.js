"use strict";

const { test, trait } = use("Test/Suite")("Auth");
const User = use("App/Models/User");
const Hash = use("Hash");
const faker = require("faker");

trait("Test/ApiClient");
trait("Auth/Client");
trait("DatabaseTransactions");

test("authorization", async ({ client }) => {
  const uuid = faker.random.uuid();
  const email = faker.internet.email();

  await User.create({
    id: uuid,
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    email: email,
    password: "123456"
  });

  const user = await User.find(uuid);

  const response = await client
    .post("auth")
    .send({
      email: user.email,
      password: "123456"
    })
    .end();

  response.assertStatus(200);
});
