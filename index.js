const express = require("express");
const DBInitializer = require('./initializers/DBInitializer');
const authuser = require('./routes/authuser.route');
const cors = require("cors");

const app = express();

app.use(cors());

DBInitializer();

//routes
app.use(express.json());
app.use('/api',authuser);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening at port ${port}`));