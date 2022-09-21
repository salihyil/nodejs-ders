import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './db.js';
import pageRoute from './routes/pageRoute.js';
import photoRoute from './routes/photoRoute.js';
import userRoute from './routes/userRoute.js';

const app = express();
const port = process.env.PORT;

//connection to the DB
connectDB();

//ejs template engine
app.set('view engine', 'ejs');

app.use(express.static('public')); //static files middleware
app.use(express.json()); // Photo validation failed: description: Path `description` is required., name: Path `name` is required. hatasından kurtulmak için
app.use(express.urlencoded({extended: true}));

//routes
app.use('/', pageRoute);
app.use('/photos', photoRoute);
app.use('/users', userRoute);

app.listen(port, () => {
    console.log(`Application  running on port: ${port}`);
});
