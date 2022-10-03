import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                const user = await User.findById(decodedToken.userId);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

const authenticateToken = (req, res, next) => {
    try {
        const token = req.cookies.jwt; // jwt res.cookie('jwt', token, {..} isimden geliyor.

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err) => {
                //verify için öncekinde userId kullandıştık. Ama şimdi token cookie içerisinde userId kullanmaya gerek yok.

                //Burda eğer token'ın verify'ında hata varsa demek. /login'e yönlendirdik.
                if (err) {
                    console.log('err.message', err.message);
                    res.redirect('/login');
                } else {
                    //Hata yoksa ne yapması gerekiyosa onu yap demek.
                    next();
                }
            });
        } else {
            //token yoksa
            res.redirect('/login');
        }
    } catch (error) {
        res.status(401).json({
            succeeded: false,
            error: 'Not authorized',
        });
    }
};

export { authenticateToken, checkUser };
