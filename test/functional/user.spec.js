"use strict";

const { test, trait } = use("Test/Suite")("User");
const User = use("App/Models/User");

/* Generate fake date
 * Need to be implemented otherwise will
 * break the test every time that has the
 * same value on email as it unique.
 * Check out all functions:
 * https://www.npmjs.com/package/faker
 */
const faker = require("faker");

trait("Test/ApiClient");

test("creates a new user", async ({ client }) => {
  const random_uuid = faker.random.uuid();
  const random_userName = faker.internet.userName();
  const random_email = faker.internet.email();

  let test = await User.create({
    id: random_uuid,
    username: random_userName,
    email: random_email,
    password: "123456"
  });

  /* SAMPLE:
   * If needs to print anything when the test is running
   * process.stderr.write("user: " + JSON.stringify(test));
   */

  const response = await client.get(`/user/${random_uuid}`).end();

  response.assertStatus(200);
  response.assertJSONSubset({
    id: random_uuid,
    username: random_userName,
    email: random_email
  });
});
