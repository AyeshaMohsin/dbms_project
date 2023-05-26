const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json()); //req.body
app.use(cors());

//routes//

//CustomerRegistration and login
app.use("/auth", require("./routes/auth"));


//dashboard
app.use("/dashboard", require("./routes/dashboard"))

app.listen(5000, ()=>{
    console.log("server is running on port 5000")
})