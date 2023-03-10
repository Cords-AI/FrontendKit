import { LocationType } from '../../src/common/Info';

export default class GoogleMapsUtils {
  public static async reverseGeocodeLocation(lat, lng): Promise<LocationType | null> {
    const geocoder = new google.maps.Geocoder();
    const response = await geocoder.geocode({ location: new google.maps.LatLng(lat, lng) });
    const result = response.results?.[0];
    return result ? GoogleMapsUtils.getLocation(result) : null;
  }

  public static getLocation(result): LocationType | null {
    const cities = result.address_components.filter((a) => {
      return a.types.includes('locality');
    });

    const regions = result.address_components.filter((a) => {
      return a.types.includes('administrative_area_level_1');
    });
    const countries = result.address_components.filter((a) => {
      return a.types.includes('country');
    });

    if (cities.length) {
      const city = cities[0].long_name;
      const region = regions[0].short_name;
      const country = countries[0].long_name;
      return {
        city,
        region,
        country,
      };
    }

    return null;
  }
}
