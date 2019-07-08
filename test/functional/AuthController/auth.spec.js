// "use strict";

// const { test, trait } = use("Test/Suite")("Auth");
// const User = use("App/Models/User");
// const Hash = use("Hash");

// trait("Test/ApiClient");
// trait("Auth/Client");

// test("creates a session", async ({ client }) => {
//   // Id and password needed to be changed until we work with the same db;
//   const user = await User.find("970609af-e1d7-49c7-b7b8-181931a07007");

//   const response = await client
//     .post("auth")
//     .send({
//       email: user.email,
//       password: "123456"
//     })
//     .end();

//   response.assertStatus(200);
// });
