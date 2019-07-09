"use strict";
const crypto = require("crypto");
const User = use("App/Models/User");
const Mail = use("Mail");

class ForgotPasswordController {
  async store({ request, response }) {
    try {
      // Get email from input and compare with db
      const email = request.input("email");
      const user = await User.findByOrFail("email", email);

      // Create token and add date
      user.token = crypto.randomBytes(10).toString("hex");
      user.token_created_at = new Date();

      await user.save();

      // Send email to user
      await Mail.send([""], {}, message => {
        message
          .to(user.email)
          .from("rent@support.io", "Support | Rent")
          .subject("Reset Password");
      });
    } catch (err) {
      // Retrieve a error obj if email does not exist on db
      return response
        .status(err.status)
        .send({ error: "Error, User does not exist." });
    }
  }
}

module.exports = ForgotPasswordController;
