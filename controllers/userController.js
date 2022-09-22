import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            succeeded: true,
            user,
        });
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            error,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        // login'e tıklandığı zaman username ve password'u alıcaz. Veritabanında username ve password karşılatırılacak.
        const {username, password} = req.body;

        //veritabanından kullanıyı çekiyoruz.findOne() methodu ile
        //username'den kullanabilmek için username unique olması lazım. Bizde oyle yapmıştık.
        // await eklemek lazım sebebi bu bir zaman alıcı işlem olduğu için asenkron çalışan bir kod. Bunun yanıtını beklenmesi gerekir.
        const user = await User.findOne({username: username});

        let same = false;

        if (user) {
            //req.body'den gelen password ile veritabanındaki password karşılaştırılacak
            //veritabanı ile yapılacak olacak işlem async'dir.
            same = await bcrypt.compare(password, user.password);
        } else {
            //eğer user yoksa burası
            // 401 Unauthorized response status code
            return res.status(401).json({
                succeeded: false,
                error: 'There is no such user.',
            });
        }

        //eğer şifrelerin eşleşmediği kısımda
        if (same) {
            res.status(200).json({
                user,
                token: createToken(user._id), // user._id veritabanından geliyor
            });
        } else {
            res.status(401).json({
                succeeded: false,
                error: 'Password are not matched .',
            });
        }
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            error,
        });
    }
};

const createToken = (userId) => {
    // sign(payload: string | object | Buffer, secretOrPrivateKey: jwt.Secret, options?: jwt.SignOptions | undefined): string
    return jwt.sign({userId}, process.env.JWT_SECRET, {
        //token süresi 1gün
        expiresIn: '1d',
    });
};

export {createUser, loginUser};
