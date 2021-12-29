const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    const newFilename = Date.now() + "--" + file.originalname;

    cb(null, newFilename);
  },
});

const upload = multer({ storage: fileStorage });

module.exports = { upload };
