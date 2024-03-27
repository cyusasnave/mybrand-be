import multer from "multer";
import path from 'path';

const fileUpload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, callback) => {
    let ext = path.extname(file.originalname);
    if (
      ext!== ".png" &&
      ext!== ".jpg" &&
      ext!== ".jpeg" &&
      ext!== ".gif" &&
      ext!== ".webp" &&
      ext!== ".bmp" &&
      ext!== ".tiff" &&
      ext!== ".jfif" &&
      ext!== ".tif"
    ) {
      return callback(null, false);
    }
    callback(null, true);
  },
})

export default fileUpload;

//660176e7abb05d274820d6e5
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWZkNDUyMGY5YjlmM2VmZGEyMDQ1YmYiLCJpYXQiOjE3MTEzNzE5MDksImV4cCI6MTcxMTM3MzcwOX0.Qzx61dJpao0GWM8yMJNTnCst4YdjfVO4dRI3JSaRbJs