'use strict'

const Route = use('Route');

Route.post('/users', 'UserController.create');
Route.get('/users/:id', 'UserController.display');
Route.put('/users/:id', 'UserController.update');
Route.delete('/users/:id', 'UserController.destroy');
