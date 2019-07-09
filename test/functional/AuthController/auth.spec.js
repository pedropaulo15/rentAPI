"use strict";

const { test, trait } = use("Test/Suite")("Auth");
const User = use("App/Models/User");
const Hash = use("Hash");
const faker = require("faker");

trait("Test/ApiClient");
trait("Auth/Client");
trait("DatabaseTransactions");

test("authorization", async ({ client }) => {
  const random_uuid = faker.random.uuid();
  const random_userName = faker.internet.userName();
  const random_email = faker.internet.email();

  await User.create({
    id: random_uuid,
    username: random_userName,
    email: random_email,
    password: "123456"
  });

  const user = await User.find(random_uuid);

  const response = await client
    .post("auth")
    .send({
      email: user.email,
      password: "123456"
    })
    .end();

  response.assertStatus(200);
});
