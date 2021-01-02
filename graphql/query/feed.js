import gql from 'graphql-tag';

export const GET_ACTIVITY_FEEDS = gql`
  query getActivityFeeds($scope: String, $sortBy: String, $sortDir: String, $page: Int, $pageSize: Int) {
    activityFeeds(scope: $scope, sortBy: $sortBy, sortDir: $sortDir, page: $page, pageSize: $pageSize) {
      id
      owner {
        id
        fullName
        avatarUrl
        slug
      }
      trackable {
        id
        name
        photoUrl
        slug
      }
      recipient {
        id
        name
        photoUrl
        slug
      }
      trackableType
      recipientType
      key
      parameters {
        animalId
        animalName
        animalSlug
        photos {
          id
          mediaType
          thumbnailUrl
          photoUrl
          mediumPhotoUrl
          largeUrl
        }
      }
      createdAt
    }
  }
`;