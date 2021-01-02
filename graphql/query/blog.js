import gql from 'graphql-tag';

export const GET_HOMEPAGE = gql`
  query {
    homepage {
      seo {
        metaTitle
        metaDescription
        shareImage {
          url
        }
      }
    }
  }
`;

export const GET_ARTICLES_WITH_HOMEPAGE = gql`
  query {
    articles(where: {status: "published"}) {
      id
      title
      content
      description
      category {
        name
      }
      status
      image {
        url
      }
      updatedAt
      slug
      author {
        id
        name
        picture {
          url
        }
      }
    }
    homepage {
      hero {
        title
      }
    }
  }
`;

export const GET_ARTICLE = gql`
  query getArticle($slug: String!){
    articles(where: {status: "published", slug: $slug}) {
      id
      title
      content
      description
      category {
        name
      }
      status
      image {
        url
      }
      publishedAt
      slug
      author {
        id
        name
        picture {
          url
        }
      }
    }
  }
`;