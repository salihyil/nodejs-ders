import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import conn from './db.js';
import pageRoute from './routes/pageRoute.js';

const app = express();
const port = process.env.PORT;

//connection to the DB
conn();

//ejs template engine
app.set('view engine', 'ejs');

//static files middleware
app.use(express.static('public'));

//routes
app.use(pageRoute);

app.listen(port, () => {
    console.log(`Application  running on port: ${port}`);
});
