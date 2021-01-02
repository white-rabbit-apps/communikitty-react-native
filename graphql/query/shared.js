import gql from 'graphql-tag';

export const CHECK_SLUG_EXIST = gql`
  mutation checkSlugExist($slug: String!, $resourceType: String!, $id: String) {
    checkSlugExist(input: { slug: $slug, resourceType: $resourceType, id: $id }) {
      availability
    }
  }
`;
