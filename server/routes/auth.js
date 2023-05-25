const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorize = require("../middleware/auth");

//register route
router.post("/register", validInfo, async (req, res) => {
  try {
    const { customer_name, customer_email, customer_password } = req.body;

    const customer = await pool.query(
      "select * from customer where customer_email=$1",
      [customer_email]
    );

    if (customer.rows.length !== 0) {
      return res.status(401).send("Customer already exists");
    }

    const saltRound = 10;

    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(customer_password, salt);

    const newCustomer = await pool.query(
      "insert into customer (customer_name, customer_email, customer_password) values ($1, $2, $3) returning *",
      [customer_name, customer_email, bcryptPassword]
    );

    const token = jwtGenerator(newCustomer.rows[0].customer_id);
    return res.json({ token });
  } catch (error) {
    console.error();
    res.status(500).send("Server Error");
  }
});

//login route
router.post("/login", validInfo, async (req, res) => {
  try {
    const { customer_email, customer_password } = req.body;

    const customer = await pool.query(
      "select * from customer where customer_email=$1",
      [customer_email]
    );

    if (customer.rows.length === 0) {
      return res.status(401).send("Password or Email is incorrect");
    }

    const validPassword = await bcrypt.compare(
      customer_password,
      customer.rows[0].customer_password
    );

    if (!validPassword) {
      return res.status(401).send("Password or Email is incorrect");
    }

    const token = jwtGenerator(customer.rows[0].customer_id);
    return res.json({ token });
  } catch (error) {
    console.error();
  }
});

router.get("/is-verify", authorize, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
