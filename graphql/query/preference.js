import gql from 'graphql-tag';

export const GET_PREFERENCES = gql`
    query getPreferences($userId: String!) {
        preferences(userId: $userId) {
            id
            key
            value
        }
    }
`;

export const UPDATE_PREFERENCE = gql`
    mutation UpdatePreference($userId: String!, $key: String, $value: String) {
        updatePreference(input: {userId: $userId, key: $key, value: $value}) {
            preference {
                id
                key
                value
            }
        }
    }`;
