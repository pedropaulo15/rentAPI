"use strict";

const Route = use("Route");

Route.post("/user", "UserController.create");
Route.get("/user/:id", "UserController.display");
Route.put("/user/:id", "UserController.update");
Route.delete("/user/:id", "UserController.destroy");

Route.post("/auth", "AuthController.create");

Route.post("/forgotpassword", "ForgotPasswordController.store");
Route.put("/forgotpassword", "ForgotPasswordController.update");
