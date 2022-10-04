import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Photo from '../models/photoModel.js';

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ user: user._id });
    } catch (error) {
        let errors2 = {};

        if (error.code === 11000) {
            errors2.email = 'The Email is already registered';
        }

        if (error.name === 'ValidationError') {
            Object.keys(error.errors).forEach((key) => {
                errors2[key] = error.errors[key].message;
            });
        }

        res.status(400).json(errors2);
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        let same = false;

        if (user) {
            same = await bcrypt.compare(password, user.password);
        } else {
            return res.status(401).json({
                succeeded: false,
                error: 'There is no such user',
            });
        }

        console.log('same:: ', same);

        if (same) {
            const token = createToken(user._id);
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24,
            });

            res.status(201).json({
                succeeded: true,
            });

            res.redirect('/users/dashboard');
        } else {
            res.status(401).json({
                succeeded: false,
                error: 'Paswords are not matched',
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
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

const getDashboardPage = async (req, res) => {
    const photos = await Photo.find({ user: res.locals.user._id });
    const user = await User.findById({ _id: res.locals.user._id }).populate([
        'followers',
        'followings',
    ]);
    res.render('dashboard', {
        link: 'dashboard',
        photos,
        user,
    });
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: res.locals.user._id } });
        res.render('users', {
            link: 'users',
            users,
        });
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            error,
        });
    }
};

const getAUser = async (req, res) => {
    try {
        const user = await User.findById({
            _id: req.params.id,
        });

        // local'de bulunan id  ile user'ın içindeki follewers'ların id'yi kontrol edecek.
        const inFollowers = user.followers.some((follower) => {
            return follower.equals(res.locals.user._id);
        });

        //2:00dk hata: diğer user'ların sayfasına gidince login olanın photoları gösteriliyordu. Şimdi tıklanan userın kendi photoları göstericek.
        const photos = await Photo.find({ user: user._id });
        res.status(200).render('user', {
            //user.ejs render olacak.
            user,
            photos,
            inFollowers,
            link: 'users',
        });
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            error,
        });
    }
};

const follow = async (req, res) => {
    try {
        //burdaki user takip edilecek yada takipden çıkıcak user'dır.
        let user = await User.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $push: { followers: res.locals.user._id },
            },
            {
                //new anlamı: pushlamayı yaptıktan sonra bana yeni oluşturduğun user'ı dön.
                new: true,
            }
        );

        //kendimizinde güncellenmesi lazım. Takip edilen
        user = await User.findByIdAndUpdate(
            { _id: res.locals.user._id },
            {
                $push: { followings: req.params.id },
            },
            {
                new: true,
            }
        );

        // follow'una bastığın kişinin sayfasına yönlendir.
        res.status(200).redirect(`/users/${req.params.id}`);
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            error,
        });
    }
};

const unfollow = async (req, res) => {
    try {
        //burdaki user takip edilecek yada takipden çıkıcak user'dır.
        let user = await User.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: { followers: res.locals.user._id },
            },
            {
                //new anlamı: pushlamayı yaptıktan sonra bana yeni oluşturduğun user'ı dön.
                new: true,
            }
        );

        //kendimizinde güncellenmesi lazım. Takip edilen
        user = await User.findByIdAndUpdate(
            { _id: res.locals.user._id },
            {
                $pull: { followings: req.params.id },
            },
            {
                new: true,
            }
        );

        res.status(200).redirect(`/users/${req.params.id}`);
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            error,
        });
    }
};

export {
    createUser,
    loginUser,
    getDashboardPage,
    getAllUsers,
    getAUser,
    follow,
    unfollow,
};
