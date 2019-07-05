'use strict'

const Route = use('Route');

Route.post('/users', 'UserController.create');
Route.put('/users/:id', 'UserController.update');
Route.delete('/users/:id', 'UserController.destroy');