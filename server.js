const express = require("express");
const config = require('./config');
require('dotenv').config();
const connectToMongo = require("./db.js");
const cors = require('cors');
const cookieParser = require('cookie-parser');



connectToMongo();

const app = express();
app.use(cors({
  origin: 'https://vibe-hub-frontend-dhananjay929.vercel.app/', // Replace with the actual origin of your frontend
  credentials: true, // Allow cookies and other credentials to be sent
}));
const PORT= config.PORT ;

app.use(express.json());
app.use(cookieParser());



//Available routes
  app.use('/api',require("./routes/signup"));
  app.use('/api',require("./routes/login"));
  app.use('/api',require("./routes/feed"));
  app.use('/api',require("./routes/write"));
  app.use('/api',require("./routes/edit"));
  app.use('/api',require("./routes/delete"));
     
    //  app.use((err, req, res, next) => {
    //      console.error(err.stack);
    //      res.status(500).send('Something went wrong!');
    //    });
       
       app.listen(PORT);
       
