import gql from 'graphql-tag';

export const GET_LOCATIONS = gql`
  query getLocations($service: String, $centerLat: Float, $centerLng: Float, $page: Int, $perPage: Int) {
    locations(service: $service, centerLat: $centerLat, centerLng: $centerLng, page: $page, perPage: $perPage) {
      count
      page
      perPage
      records {
        id
        slug
        name
        logoUrl
        logoThumbnailUrl
        distance
        geo
        address
      }
    }
  }`;

export const GET_LOCATION = gql`
  query getLocation($slug: String!) {
    location(slug: $slug) {
      id
      slug
      name
      logoUrl
      email
      phone
      address
      geo
      animalsServiced
      services
      website
      facebookUrl
      yelpUrl
      googleMapsUrl
      twitterUrl
      pinterestUrl
      animals {
        id
        slug
        name
        thumbnailUrl
        avatarUrl
        statuses
      }
    }
  }`;
