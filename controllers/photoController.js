import Photo from '../models/photoModel.js';

const createPhoto = (req, res) => {
    const photo = Photo.create(req.body); // formdan gelen geri veritabanına aktarırken

    //The HTTP 201 Created success status response code
    res.status(201).json({
        succeded: true,
        photo,
    }); // burasıda veritabanına eklendi frontend'e geri gönderdiğimiz kısım
};

export {createPhoto};
