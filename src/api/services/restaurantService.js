import * as googleMapsService from './googleMapsService';
import * as geolocationService from './geolocationService';
import * as addressService from './addressService';
import * as openingService from './openingService';
import * as imageService from './imageService';
import restaurantRepository from '../../data/repositories/restaurantRepository';
import { addressObjToString } from '../../helpers/addressObjToString';
import { countPages, offset } from '../../helpers/paginationHelper';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';
import { LIMIT, PAGE } from '../../constants/paginationConstants';
import { restaurantErrorMessages } from '../../constants/customErrorMessage/restaurantErrorMessage';
import { BEAD_REQUEST, NOT_FOUND } from '../../constants/responseStatusCodes';
import { imageErrorMessages } from '../../constants/customErrorMessage/imageErrorMessage';

export const createRestaurant = async (address, opening, file, userId, restaurantData) => {
  try {
    // Check if file exists
    if (!file) {
      throw new ErrorHandler(
        NOT_FOUND,
        imageErrorMessages.IMAGE_IS_REQUIRED,
        'Restaurant create()'
      );
    }
    const { id: addressId } = await addressService.createAddress(address);
    // Include address models (Region, City, Street, HouseNumber)
    const createdAddress = await addressService.getAddressById(addressId);
    // TODO Можливо краще по вибраному адресу отримувати координати на клієтні...?
    /*
    Для отримання кординат використовувати сервер (запит по адресу) чи робити це на клієнті (Google maps client api)???
    На клієнті зробити можливість зміни маркера кординат (як в таксі) і відправляти на сервер вже готові координати і
    не шукати їх на сервері, а при створені ресторана одразу зберігати в базу ті (координати),що прийшли з клієнта.
     */
    const {
      lat: latitude,
      lng: longitude
    } = await googleMapsService.geolocationByAddress(addressObjToString(createdAddress));

    const { id: geolocationId } = await geolocationService.create({
      longitude,
      latitude
    });

    const { id: imageId } = await imageService.upload(file);

    // TODO Чи є можливість у sequelize відкотити (видалити) створені моделі які асоціюються з основною??? -
    // TODO - при створенні основної моделі виникла помилка і модель не було створено???
    /*
    Тобто щось таке як міграції. Якщо помилка то видалити.
    Для ресторана потрібні АДРЕС, ГЕОЛОКАЦІЯ, ФОТО, ГОДИНИ ВІДКРИТТЯ. Створити опочатку і моделі а потім РЕСТОРАН.
    Чи навпаки. Спочатку РЕСТОРАН, потім ці моделі і тоді обновляти ресторан під ці моделі???
     */

    const { id: restaurantId } = await restaurantRepository.create({
      ...restaurantData,
      userId,
      addressId,
      geolocationId,
      imageId
    });

    await openingService.create(opening, restaurantId);
    // TODO Можливо створювати з isDeleted = true, щоб не зразу зявлявся для користувачів (а коли буде наповнено).
    // Типу активувати ресторан бо він вже має МЕНЮ, СТРАВИ БЛА-БЛА-БЛА...!
    return await restaurantRepository.getById(restaurantId);
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Restaurant service create()');
  }
};

export const getRestaurants = async filter => {
  try {
    const { limit = LIMIT, page = PAGE } = filter;
    const restaurantsCount = await restaurantRepository.countAll(filter);

    return {
      restaurants: await restaurantRepository.getAll(
        {
          ...filter,
          limit,
          offset: offset(page, limit) }
      ),
      totalPage: countPages(restaurantsCount, limit, page)
    };
  } catch (e) {
    throw new ErrorHandler(
      e.status,
      e.message,
      'Restaurant service geAll()'
    );
  }
};

export const getRestaurantById = async id => {
  try {
    const restaurant = await restaurantRepository.getById(id);
    if (!restaurant) {
      throw new ErrorHandler(
        NOT_FOUND,
        restaurantErrorMessages.RESTAURANT_NOT_FOUND,
        'Restaurant getById()'
      );
    }
    return restaurant;
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Restaurant service getById()');
  }
};

export const update = async (restaurantId, data) => {
  try {
    const { file, ...restaurantData } = data;
    // Лишній раз роблю запит на меню по ID
    // Перший раз це в міддлеварі, щоб перевірити чи той хто оновлює дані а власником або адміном
    const restaurant = await getRestaurantById(restaurantId);
    // А тут щоб дістати imageId, для оновлення картинки і видалення попередньої
    // Щоб знайти image по imageId і за допомогою deleteHash видалити image з Imgur.
    // TODO Чи в onlyRestaurantOwnerOrAdminMiddleware засетати ресторан в запит req.restaurant = restaurant...???
    // Але це підійде тільки для оновлення ресторана, а якщо створюється стіл чи меню (нема id але є restaurantId)
    // в запит засетається зайвий обєкт ресторана.
    // Може тоді тільки req.imageId = restaurant.image.id ...???
    // Або якась інша реалізація з фотками...??? ...!!!

    if (file) {
      await imageService.update(restaurant.image.id, file);
      // TODO  А при видаленні файла нема і тому не видалить файл з IMGUR.
      // Зробити це в моделі
      // Image.afterDestroy(item => {
      //  Get delete hash image and delete image from IMGUR!!!
      //   });
    }

    const restaurantIsUpdated = await restaurantRepository.updateById(restaurantId, restaurantData);
    // TODO Чи потрібно під час CREATE, UPDATE, DELETE перевіряти чи операція пройшла успішно?
    if (!restaurantIsUpdated) {
      throw new ErrorHandler(
        BEAD_REQUEST,
        restaurantErrorMessages.RESTAURANT_NOT_UPDATED,
        'Restaurant updateById()'
      );
    }

    return await getRestaurantById(restaurantId);
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Restaurant service update()');
  }
};
