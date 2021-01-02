import gql from 'graphql-tag';

export const INVITATION_SIGNUP_USER = gql `
  mutation invitationSignupUser ($firstName: String!, $lastName: String!, $invitationToken: String!, $password: String!, $passwordConfirmation: String!) {
    invitationSignupUser(firstName: $firstName, lastName: $lastName, invitationToken: $invitationToken, password: $password, passwordConfirmation: $passwordConfirmation) {
      user {
        id
        role
        fullName
        avatarUrl
        slug
      },
      credential {
        authorization,
        tokentype,
        client,
        expiry,
        uid
      }
    }
  }
`;

export const GET_INVITATION = gql`
  query getInvitation($invitationToken: String!) {
    invitation(invitationToken: $invitationToken) {
      id
      animal {
        name
        slug
        thumbnailUrl
      }
      invitedBy {
        fullName
        avatarUrl
      }
    }
  }`
