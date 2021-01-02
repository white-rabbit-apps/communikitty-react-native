import gql from 'graphql-tag';

export const GET_BREEDS = gql`
  query getBreeds {
    breeds {
      id
      slug
      name
      thumbnailUrl
    }
  }`;

export const GET_BREED = gql`
  query getBreed($slug: String!) {
    breed(slug: $slug) {
      id
      slug
      name
      description
      coat
      originCountry
      wikipediaUrl
      thumbnailUrl
      hypoallergenic
      lapCat
      sheddingFrequency
      groomingFrequency
      attentionNeed
      vocalization
      activity
      photos {
        thumbnailUrl
        photoUrl
      }
    }
  }`;
