import gql from "graphql-tag";

export const GET_ALL_USERS = gql`
  query getAllUsers {
    allUsers {
      id
      role
      fullName
      avatarUrl
      slug
    }
}`;

export const GET_CURRENT_USER = gql`
  query getCurrentUser {
    currentUser {
      id
      role
      fullName
      avatarUrl
      slug
    }
  }`;

export const GET_USER = gql`
  query getUser($slug: String!) {
    user(slug: $slug) {
      id
      fullName
      firstName
      lastName
      slug
      birthDate
      phoneNumber
      email
      age
      occupation
      avatarUrl
      facebookUsername
      linkedinUsername
      instagramUsername
      twitterUsername
      lastSignIn
      currentSignInAt
      signInCount
      responseRate
      isEmailVerified
      friendsCount
      referencesForCount
      role
      website
      gender
      animals {
        id
        name
        thumbnailUrl
        slug
      }
      isFollowed
      followersCount
      followingUserCount
      followingAnimalCount
    }
  }
`;


export const UPDATE_USER = gql `
  mutation updateUser($id: String!, $slug: String, $firstName: String,  $lastName: String, $email: String,
    $phoneNumber: String, $occupation: String, $role: String, $birthDate: String,
    $facebookUsername: String, $twitterUsername: String,
    $linkedinUsername: String, $instagramUsername: String, $website: String, $gender: String
  ) {
    updateUser(input: { id: $id, slug: $slug, firstName: $firstName,  lastName: $lastName, email: $email,
      phoneNumber: $phoneNumber, occupation: $occupation, role: $role, birthDate: $birthDate,
      facebookUsername: $facebookUsername, twitterUsername: $twitterUsername,
      linkedinUsername: $linkedinUsername, instagramUsername: $instagramUsername,
      website: $website, gender: $gender
    }) {
      user {
        id
        fullName
        firstName
        lastName
        slug
        birthDate
        phoneNumber
        email
        age
        occupation
        avatarUrl
        role
        facebookUsername
        linkedinUsername
        instagramUsername
        twitterUsername
        animals {
          id
          name
          thumbnailUrl
          slug
        }
        isFollowed
        followersCount
        followingUserCount
        followingAnimalCount
      }
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation followUser($followableSlug: String) {
    followUser(input: { followableSlug: $followableSlug }) {
      user {
        id
        fullName
        firstName
        lastName
        slug
        birthDate
        phoneNumber
        email
        age
        occupation
        avatarUrl
        role
        facebookUsername
        linkedinUsername
        instagramUsername
        twitterUsername
        animals {
          id
          name
          thumbnailUrl
          slug
        }
        isFollowed
        followersCount
        followingUserCount
        followingAnimalCount
      }
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation unfollowUser($followableSlug: String) {
    unfollowUser(input: { followableSlug: $followableSlug }) {
      user {
        id
        fullName
        firstName
        lastName
        slug
        birthDate
        phoneNumber
        email
        age
        occupation
        avatarUrl
        role
        facebookUsername
        linkedinUsername
        instagramUsername
        twitterUsername
        animals {
          id
          name
          thumbnailUrl
          slug
        }
        isFollowed
        followersCount
        followingUserCount
        followingAnimalCount
      }
    }
  }
`;

export const DELETE_ACCOUNT = gql `
  mutation deleteUserAccount($slug: String!) {
    deleteUserAccount(input: { slug: $slug}) {
      user {
        fullName
        slug
      }
    }
  }
`;
