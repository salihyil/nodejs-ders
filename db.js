import mongoose from 'mongoose';

const conn = () => {
    mongoose
        .connect(process.env.DB_URI, {
            dbName: 'lenslight_tr',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('Connected to the DB successfuly');
        })
        .catch((err) => {
            console.log(`DB connection error:: ${err}`);
        });
};

export default conn;
