const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/auth");

router.get("/", authorization, async (req, res) => {
  try {
    const customer = await pool.query(
      "select customer_name from customer where customer_id = $1",
      [req.customer.id]
    );
    return res.json(customer.rows[0]);
  } catch (error) {
    console.error();
    res.status(500).json("Server Error");
  }
});

module.exports = router;
