module.exports = (req, res, next) => {
  const { customer_email, customer_name, customer_password } = req.body;

  function validEmail(customerEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(customerEmail);
  }

  if (req.path === "/register") {
    console.log(!customer_email.length);
    if (![customer_email, customer_name, customer_password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(customer_email)) {
      return res.status(401).json("Invalid Email");
    }
  } else if (req.path === "/login") {
    if (![customer_email, customer_password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(customer_email)) {
      return res.status(401).json("Invalid Email");
    }
  }

  next();
};
