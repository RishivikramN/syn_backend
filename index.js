const express = require("express");
const DBInitializer = require('./initializers/DBInitializer');
const authuser = require('./routes/authuser.route');
const usergame = require('./routes/usergame.route');
const cors = require("cors");

const app = express();

app.use(cors());

DBInitializer();

//routes
app.use(express.json());
app.use('/api',authuser);
app.use('/api',usergame);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening at port ${port}`));