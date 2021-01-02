import gql from 'graphql-tag';

export const SIGNUP_USER = gql `
  mutation signUpUser ($firstName: String!, $lastName: String!, $email: String!, $password: String!, $passwordConfirmation: String!) {
    register(firstName: $firstName, lastName: $lastName, email: $email, password: $password, passwordConfirmation: $passwordConfirmation) {
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

export const LOGIN_USER = gql `
  mutation loginUser ($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        id
        role
        fullName
        avatarUrl
        slug
        preferences {
          key
          value
        }
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
export const FORGOT_PASSWORD = gql `
  mutation forgotPassword ($email: String!) {
    forgotEmail(email: $email) {
      message
    }
  }
`;
export const LOGOUT_USER = gql `
  mutation logoutUser ($userId: String!) {
    signOut(userId: $userId) {
      message
    }
  }
`;

export const SOCIAL_LOGIN_USER = gql `
  mutation loginUser ($email: String!, $id: String!, $name: String!, $firstName: String!, $lastName: String!, $accessToken: String!, $profilePicUrl: String!, $expiresAt: Int, $provider: String! ) {
    omniauthSignin(email: $email, id: $id, name: $name, firstName: $firstName, lastName: $lastName, accessToken: $accessToken, profilePicUrl: $profilePicUrl, expiresAt: $expiresAt, provider: $provider) {
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

export const CHANGE_PASSWORD = gql`
  mutation changePassword ($password: String!, $passwordConfirmation: String!, $resetPasswordToken: String!) {
    changePassword(password: $password, passwordConfirmation: $passwordConfirmation, resetPasswordToken: $resetPasswordToken) {
      message
    }
  }
`;

export const RESEND_EMAIL_CONFIRMATION = gql`
  mutation resendConfirmation ($email: String!) {
    resendConfirmation(email: $email) {
      message
    }
  }
`;
