"use strict";

const Route = use("Route");

Route.post("/user", "UserController.create").validator("User");
Route.get("/user/:id", "UserController.display");
Route.put("/user/:id", "UserController.update");
Route.delete("/user/:id", "UserController.destroy");

Route.post("/auth", "AuthController.create");
