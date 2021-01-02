import gql from 'graphql-tag';

export const GET_TRAITS = gql`
  query getTraits {
    traits {
      id
      name
      image
      thumbnailUrl
    }
}`;
