"use strict";

const moment = require("moment");
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
      await Mail.send(
        ["emails.forgot_password"],
        {
          email,
          token: user.token,
          link: `${request.input("redirect_url")}?token=${user.token}`
        },
        message => {
          message
            .to(user.email)
            .from("rent@support.io", "Support | Rent")
            .subject("Reset Password");
        }
      );
    } catch (err) {
      // Retrieve a error obj if email does not exist on db
      return response
        .status(err.status)
        .send({ error: "Error, User does not exist." });
    }
  }

  async update({ request, response }) {
    try {
      // get token and the new password
      const { token, password } = request.all();

      // Find user based on token
      const user = await User.findByOrFail("token", token);

      // Check expired token (based in 2 days)
      const tokenExpired = moment()
        .subtract("2", "days")
        .isAfter(user.toke_created_at);

      if (tokenExpired) {
        return response.status(401).send({ error: "Error, Token Expired." });
      }

      // Reset values
      user.token = null;
      user.token_created_at = null;
      user.password = password;

      await user.save();
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: "Error, Error during the reset password." });
    }
  }
}
module.exports = ForgotPasswordController;
