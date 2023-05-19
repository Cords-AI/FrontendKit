import { LocationType } from '../../src/common/Info';

export default class GoogleMapsUtils {
  public static filterGeocoderResponse(
    results: google.maps.GeocoderResult[],
    types: string[] = ['neighborhood', 'sublocality', 'locality'],
  ):
    {
      result: google.maps.GeocoderResult,
      type: string,
    } | null
  {
    let type = null;
    let result = null;
    types.every((t) => {
      result = results.find((a) => {
        return a.address_components.find((b) => {
          return b.types.includes(t);
        });
      });
      if (result) {
        type = t;
        return false;
      }
      return true;
    });
    if (result) {
      return {
        result,
        type,
      };
    }
    return null;
  }

  public static async reverseGeocodeLocation(lat, lng): Promise<LocationType | null> {
    const request = {
      location: new google.maps.LatLng(lat, lng),
    };
    const geocoder = new google.maps.Geocoder();
    const response = await geocoder.geocode(request);
    const result = GoogleMapsUtils.filterGeocoderResponse(response.results);
    if (result) {
      return GoogleMapsUtils.getLocation(result);
    }
    return null;
  }

  public static getLocation(result: { result: google.maps.GeocoderResult, type: string }): LocationType {
    const lookupOrder = ['sublocality', 'locality', 'administrative_area_level_1', 'country'];
    const lookupIndexStart = {
      neighborhood: 0,
      sublocality: 1,
      locality: 2,
    };
    let lookupIndex = lookupIndexStart[result.type];

    const locationLevel1Component = result.result.address_components.find((a) => {
      return a.types.includes(result.type);
    });

    let locationLevel2Component;
    for (let i = lookupIndex; i < lookupOrder.length; i++) {
      const found = result.result.address_components.find((a) => {
        return a.types.includes(lookupOrder[i]);
      });
      if (found) {
        lookupIndex = i + 1;
        locationLevel2Component = found;
        break;
      }
    }

    let locationLevel3Component;
    for (let i = lookupIndex; i < lookupOrder.length; i++) {
      const found = result.result.address_components.find((a) => {
        return a.types.includes(lookupOrder[i]);
      });
      if (found) {
        locationLevel3Component = found;
        break;
      }
    }
    const locationLevel2NameType = locationLevel2Component.types.includes('administrative_area_level_1') ? 'short_name' : 'long_name';
    const locationLevel3NameType = locationLevel3Component.types.includes('administrative_area_level_1') ? 'short_name' : 'long_name';
    const locationLevel1 = locationLevel1Component.long_name;
    const locationLevel2 = locationLevel2Component[locationLevel2NameType];
    const locationLevel3 = locationLevel3Component[locationLevel3NameType];
    return {
      locationLevel1,
      locationLevel2,
      locationLevel3,
    };
  }
}
