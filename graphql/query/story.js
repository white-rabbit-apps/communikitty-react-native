import gql from 'graphql-tag';

export const GET_ANIMAL_STORY = gql `
  query getAnimalStory($id: ID!, $animalSlug: String!) {
    animalStory(id: $id, animalSlug: $animalSlug) {
      id
      title
      body
      date
      thumbnailUrl
      event
      editable
      externalResourceUrl
      medicalProcedure {
        id
        name
      }
      photos {
        id
        thumbnailUrl
        photoUrl
        mediumPhotoUrl
        largeUrl
      }
      documents {
        id
        documentUrl
      }
      animal {
        slug
      }
      tags {
        id
        animalId
      }
    }
  }`;

export const DELETE_STORY = gql `
  mutation deleteStory( $id: ID!) {
    deleteStory(input: {id: $id}) {
      story {
        id
        title
        thumbnailUrl
        date
        body
        animal {
          slug
        }
      }
    }
  }`;

export const GET_STORY = gql `
  query getStory($id: ID!) {
    story(id: $id) {
      id
      title
      body
      date
      thumbnailUrl
      event
      editable
      externalResourceUrl
      medicalProcedure {
        id
        name
      }
      photos {
        id
        thumbnailUrl
        photoUrl
        mediumPhotoUrl
        largeUrl
      }
      documents {
        id
        documentUrl
      }
      animal {
        slug
      }
    }
  }`;

export const UPDATE_STORY = gql `
  mutation updateStory( $id: ID!, $title: String!, $body: String, $date: String, $photoIds: [String], $documentIds: [String], $medicalProcedureId: ID, $event: String, $animalSlug: String!, $externalResourceUrl: String, $tagIds: [String]) {
    updateStory(input: { id: $id, title: $title, body: $body, date: $date, photoIds: $photoIds, documentIds: $documentIds, medicalProcedureId: $medicalProcedureId, event: $event, animalSlug: $animalSlug, externalResourceUrl: $externalResourceUrl, tagIds: $tagIds }) {
      story {
        id
        title
        body
        date
        thumbnailUrl
        event
        photos {
          id
          mediaType
          thumbnailUrl
          photoUrl
          mediumPhotoUrl
          largeUrl
        }
        documents {
          id
          documentUrl
        }
        animal {
          slug
        }
        medicalProcedure {
          id
          name
        }
        externalResourceUrl
        tags {
          id
          animalId
        }
      }
    }
  }
`;

export const CREATE_STORY = gql `
  mutation createStory($title: String!, $body: String, $date: String, $photoIds: [String], $documentIds: [String], $animalSlug: String!, $medicalProcedureId: ID, $event: String, $externalResourceUrl: String, $tagIds: [String]) {
    createStory(input: { animalSlug: $animalSlug, title: $title, body: $body, date: $date, photoIds: $photoIds, documentIds: $documentIds, medicalProcedureId: $medicalProcedureId, event: $event, externalResourceUrl: $externalResourceUrl, tagIds: $tagIds }) {
      story {
        id
        title
        body
        date
        thumbnailUrl
        event
        externalResourceUrl
        photos {
          id
          mediaType
          thumbnailUrl
          photoUrl
          mediumPhotoUrl
          largeUrl
        }
        documents {
          id
          documentUrl
        }
        animal {
          slug
        }
        medicalProcedure {
          id
          name
        }
        tags {
          id
          animalId
        }
      }
    }
  }
`;

export const GET_ANIMAL_STORIES = gql`
  query getAnimalStories($animalSlug: String!) {
    animalStories(animalSlug: $animalSlug) {
      id
      title
      thumbnailUrl
      date
      body
      event
      editable
      photos {
        id
        mediaType
        thumbnailUrl
        photoUrl
        mediumPhotoUrl
        largeUrl
      }
      documents {
        id
        documentUrl
      }
      medicalProcedure {
        id
        name
        description
      }
      externalResourceUrl
      tags {
        id
        animalId
      }
      animal {
        slug
      }
    }
    animalHealthStories(animalSlug: $animalSlug) {
      id
      title
      thumbnailUrl
      date
      body
      event
      photos {
        id
        mediaType
        thumbnailUrl
        photoUrl
        mediumPhotoUrl
        largeUrl
      }
      documents {
        id
        documentUrl
      }
      medicalProcedure {
        id
        name
        description
      }
      externalResourceUrl
      tags {
        id
        animalId
      }
    }
  }
`;

export const GET_MEDICAL_PROCEDURES = gql`
  query getMedicalProcedures {
    medicalProcedures {
      id
      name
    }
  }`;
