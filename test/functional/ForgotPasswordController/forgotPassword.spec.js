"use strict";

const { test, trait } = use("Test/Suite")("Forgot Password");
const Mail = use("Mail");
const User = use("App/Models/User");
const faker = require("faker");

trait("Test/ApiClient");
trait("DatabaseTransactions");

test("forgotpassword", async ({ client }) => {
  const uuid = faker.random.uuid();
  const email = faker.internet.email();
  const redirect_url = faker.internet.url();

  await User.create({
    id: uuid,
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    email: email,
    password: "123456"
  });

  const user = await User.find(uuid);

  const response = await client.post("forgotpassword").send({
    body: {
      email: user.email,
      redirect_url: redirect_url
    }
  });

  process.stderr.write("res: " + JSON.stringify(response));
});
