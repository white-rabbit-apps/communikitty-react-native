import gql from 'graphql-tag';

export const UPLOAD_AVATAR = gql `
  mutation uploadAvatarToServer($avatar: Upload!) {
    uploadAvatar(input: { avatar: $avatar }) {
      user {
        avatarUrl
      }
    }
  }
`;


export const UPLOAD_PHOTO = gql `
  mutation uploadPhotoToServer($file: Upload!, $index: Int!) {
    uploadPhoto(input: { file: $file, index: $index }) {
      photo {
        id,
        sort,
        thumbnailUrl
      }
      index
    }
  }
`;

export const UPLOAD_DOCUMENT = gql `
  mutation uploadDocumentToServer($file: Upload!, $index: Int!) {
    uploadDocument(input: { file: $file, index: $index }) {
      document {
        id,
        documentUrl
      }
      index
    }
  }
`;

export const REMOVE_PHOTO = gql `
  mutation removePhotoFromServer($photoId: String) {
    removePhoto(input: { photoId: $photoId }) {
      photo {
        id
      }
    }
  }
`;

export const REMOVE_DOCUMENT = gql `
  mutation removeDocumentFromServer($documentId: String) {
    removeDocument(input: { documentId: $documentId }) {
      document {
        id
      }
    }
  }
`;
