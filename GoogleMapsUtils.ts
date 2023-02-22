export default class GoogleMapsUtils {
  public static async reverseGeocodeCity(lat, lng) {
    const geocoder = new google.maps.Geocoder();
    const response = await geocoder.geocode({ location: new google.maps.LatLng(lat, lng) });
    const result = response.results?.[0];

    const localities = result.address_components.filter((a) => {
      return a.types.includes('locality');
    });

    let name = '';

    if (localities.length) {
      const locality = localities[0];
      name = locality.long_name;
    } else {
      name = result.address_components[0].long_name;
    }

    return name;
  }
}
