import multer from 'multer';
import path from 'path';

const upload = (folder) => {
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, `public/images/${folder}`);
        },

        filename: (req, file, callback) => {
            const uniqueName =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
            callback(null, uniqueName + path.extname(file.originalname));
        },
    });

    return multer({
        storage,

        limits: {
            fileSize: 2 * 1024 * 1024, //2MB
        },

        fileFilter: (req, file, callback) => {
            const allowedTypes = ['image/jpeg', 'image/png'];

            if (!allowedTypes.includes(file.mimetype)) {
                return callback(
                    new Error('Tipo de arquivo inválido (somente JPG/PNG)')
                );
            }

            callback(null, true);
        },
    });
};

export default upload;
