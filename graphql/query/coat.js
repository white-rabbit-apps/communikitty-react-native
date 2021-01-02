import gql from 'graphql-tag';

export const GET_COATS = gql`
  query getCoats {
    coats {
      id
      name
      imageUrl
    }
}`;
