import Photo from '../models/photoModel.js';

const createPhoto = async (req, res) => {
    try {
        const photo = await Photo.create(req.body); // formdan gelen geri veritabanına aktarırken req.body

        //The HTTP 201 Created success status response code
        res.status(201).json({
            succeeded: true,
            photo,
        }); // burasıda veritabanına eklendi frontend'e geri gönderdiğimiz kısım
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            error,
        });
    }
};

const getAllPhotos = async (req, res) => {
    try {
        const photos = await Photo.find({}); //tüm photoları göstermesi için {} yazıldı.

        //HTTP 200 OK success status response code
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
        });

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
