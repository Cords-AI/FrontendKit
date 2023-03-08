export default class GoogleMapsUtils {
  public static async reverseGeocodeCity(lat, lng) {
    const geocoder = new google.maps.Geocoder();
    const response = await geocoder.geocode({ location: new google.maps.LatLng(lat, lng) });
    const result = response.results?.[0];

    return result ? GoogleMapsUtils.getLocationName(result) : '';
  }

  public static getLocationName(result) {
    const localities = result.address_components.filter((a) => {
      return a.types.includes('locality');
    });

    if (localities.length) {
      const locality = localities[0];
      return locality.long_name;
    }

    return result.address_components[0].long_name;
  }

  public static async reverseGeocodeCountry(lat, lng) {
    const geocoder = new google.maps.Geocoder();
    const response = await geocoder.geocode({ location: new google.maps.LatLng(lat, lng) });
    return response.results[response.results.length - 1].formatted_address === 'Canada';
  }
}
