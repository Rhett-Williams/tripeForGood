'server'

import axios from 'axios';

const GOOGLE_MAPS_API_KEY = process.env.googleKey; // Replace with your API key

const fetchPlaceDetails = async (placeName) => {
  const encodedPlaceName = encodeURIComponent(placeName);
  const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodedPlaceName}&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await axios.get(apiUrl);
    const results = response.data.results;

    console.log('results', results)
    if (results.length > 0) {
      const firstResult = results[0];
      const   
 photoReference = firstResult.photos[0].photo_reference;
      const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoReference}&key=${GOOGLE_MAPS_API_KEY}&maxwidth=400`;
      const websiteUrl = firstResult.website;

      return {
        imageUrl: photoUrl,
        websiteUrl: websiteUrl,
      };
    } else {
      console.error('No results found for the given place name.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching place details:', error);
    return null;
  }
};

export default fetchPlaceDetails;