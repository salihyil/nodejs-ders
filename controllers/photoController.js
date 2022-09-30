import {v2 as cloudinary} from 'cloudinary';
import Photo from '../models/photoModel.js';
import fs from 'fs';

const createPhoto = async (req, res) => {
    // req.files.image dashboard.ejs'deki <input name="image" /> olandan geliyor.
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
            use_filename: true,
            folder: 'lenslight_tr',
        }
    );

    try {
        await Photo.create({
            name: req.body.name,
            description: req.body.description,
            user: res.locals.user._id,
            url: result.secure_url,
        });

        fs.unlinkSync(req.files.image.tempFilePath);

        res.status(201).redirect('/users/dashboard');
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            error,
        });
    }
};

const getAllPhotos = async (req, res) => {
    try {
        // res.locals.user varsa filtrelemeli yap yoksa tüm users fotoları göster.
        const photos = res.locals.user
            ? await Photo.find({user: {$ne: res.locals.user._id}})
            : await Photo.find({});
        res.status(200).render('photos', {
            photos, // photos.ejs'e göndericek tüm photo'ları
            link: 'photos', // munu_ejs'de navbarda home hep active'di onu düzeltmek için bu eklendi.
        });
    } catch (error) {
        //HTTP 500 Internal Server Error server error response code
        res.status(500).json({
            succeeded: false,
            error,
        });
    }
};

const getAPhoto = async (req, res) => {
    try {
        const photo = await Photo.findById({
            _id: req.params.id,
        }).populate('user');
        //Photo içindede user var. populate('user'); <%= photo.user.username %></a çalışabilmesi için eklendi.
        //populate: doldurmak

        // photo.ejs render olacak.
        res.status(200).render('photo', {
            photo, // photos.ejs'e gönderdik. href="/photos/<%= photo._id %>" de kullandık.
            link: 'photos',
        });
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            error,
        });
    }
};

export {createPhoto, getAllPhotos, getAPhoto};
