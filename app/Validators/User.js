"use strict";

class User {
  // To validate all fields even if the field before was broken
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      // validation rules
      email: "required|email|unique:users",
      password: "required|confirmed"
    };
  }
}

module.exports = User;
