import gql from 'graphql-tag';

export const GET_LOVES = gql`
  query getLoves {
    loves {
      id
      opinionType
      text
      owner {
        id
        role
        fullName
        avatarUrl
        slug
      }
    }
  }`

  export const GET_HATES = gql`
    query getHates {
      hates {
        id
        opinionType
        text
        owner {
          id
          role
          fullName
          avatarUrl
          slug
        }
      }
    }`
