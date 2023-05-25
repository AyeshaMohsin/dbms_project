const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(customer_id) {
  const payload = {
    customer: {
      id: customer_id,
    },
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

module.exports = jwtGenerator;
