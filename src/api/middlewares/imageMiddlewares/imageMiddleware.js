import multer from 'multer';
import { fileSize } from '../../../config/imgurConfig';
import { IMAGES } from '../../../constants/fileMimetype';
import { ErrorHandler } from '../../../helpers/error/ErrorHandler';
import { imageErrorMessages } from '../../../constants/customErrorMessage/imageErrorMessage';
import { BEAD_REQUEST } from '../../../constants/responseStatusCodes';

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize
  },
  fileFilter(req, file, cb) {
    if (!IMAGES.includes(file.mimetype)) {
      return cb(new ErrorHandler(
        BEAD_REQUEST,
        imageErrorMessages.NOT_APPROPRIATE_FILE_TYPE,
        'Image middleware'
      ), false);
    }
    return cb(null, true);
  }
});

export default upload.single('image');
