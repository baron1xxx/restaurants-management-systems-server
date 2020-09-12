import { Client } from '@googlemaps/google-maps-services-js';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';
import env from '../../env';

const client = new Client({});
const key = env.googleMaps.apiKey;
const language = 'uk';

export const geolocationByAddress = async address => {
  try {
    const location = await client
      .geocode({
        params: {
          address,
          language,
          key
        }
      });
    return location.data.results[0].geometry.location;
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Geocode by address');
  }
};
