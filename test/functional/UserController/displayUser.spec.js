'use strict'

const { test, trait, before, after } = use('Test/Suite')('UserController');
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('DatabaseTransactions');

before(async () => {
  await User.create({
    id: 123,
    username: 'displayUser',
    email: 'displayuser@user.com',
    password: '123456'
  });
});

after(async () => {
  const user = await User.findOrFail(123);
  await user.delete();
});

test('return the user based on its ID', async ({ client, assert }) => {
  assert.plan(2);

  const response = await client.get(`/users/${123}`)
    .header('accept', 'application/json')
    .end();
  
  response.assertStatus(200);
  response.assertJSONSubset({
    id: 123,
    username: 'displayUser',
    email: 'displayuser@user.com'
  });
});
