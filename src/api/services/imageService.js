import axios from 'axios';
import { imgurId } from '../../config/imgurConfig';
import imageRepository from '../../data/repositories/imageRepository';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';
import { NOT_FOUND } from '../../constants/responseStatusCodes';
import { imageErrorMessages } from '../../constants/customErrorMessage/imageErrorMessage';

const uploadToImgur = async file => {
  try {
    const { data: { data } } = await axios.post(
      'https://api.imgur.com/3/image',
      {
        image: file.buffer.toString('base64')
      }, {
        headers: { Authorization: `Client-ID ${imgurId}` }
      }
    );
    // eslint-disable-next-line no-console
    console.log('data - ', data);
    return {
      link: data.link,
      deleteHash: data.deletehash
    };
  } catch ({ response: { data: { status, data } } }) { // parse Imgur error
    return Promise.reject({ status, message: data.error });
  }
};

// eslint-disable-next-line no-unused-vars
const deleteFromImgur = async deleteHash => {
  try {
    const { data: { data } } = await axios.delete(
      `https://api.imgur.com/3/image/${deleteHash}`,
      {
        headers: { Authorization: `Client-ID ${imgurId}` }
      }
    );
    // eslint-disable-next-line no-console
    console.log('data - ', data);
    return data;
  } catch ({ response: { data: { status, data } } }) { // parse Imgur error
    return Promise.reject({ status, message: data.error });
  }
};

export const getById = async id => {
  try {
    const image = await imageRepository.getById(id);
    if (!image) {
      throw new ErrorHandler(
        NOT_FOUND,
        imageErrorMessages.IMAGE_NOT_EXITS,
        'Image getById()'
      );
    }
    return image;
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Restaurant service getById()');
  }
};

export const upload = async file => {
  const image = await uploadToImgur(file);
  return imageRepository.create(image);
};

export const update = async (id, file) => {
  const { deleteHash } = await getById(id);
  await deleteFromImgur(deleteHash);
  const image = await uploadToImgur(file);
  return imageRepository.updateById(id, image);
};
