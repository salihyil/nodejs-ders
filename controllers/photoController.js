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
        res.status(200).json({
            succeeded: true,
            photos,
        });
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            error,
        });
    }
};

export {createPhoto, getAllPhotos};
