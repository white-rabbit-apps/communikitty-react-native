import gql from 'graphql-tag';

export const GET_ANIMAL_OPTIONS = gql`
  query getOptions {
    options {
      breeds {
        id
        slug
        name
        thumbnailUrl
      }
      coats {
        id
        name
        imageUrl
      }
      traits {
        id
        name
        image
        thumbnailUrl
      }
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
      statuses
    }
  }
`;

export const GET_CURRENT_ANIMAL = gql`
  query getAnimal($slug: String!) {
    animal(slug: $slug) {
      id
      name
      slug
    }
  }`

export const GET_ANIMALS = gql`
  query getAnimals {
    animals {
      id
      name
      thumbnailUrl
      slug
      avatarUrl
      statuses
    }
  }`;

export const GET_CURRENT_ANIMALS = gql`
  query getCurrentAnimals {
    currentAnimals {
      id
      name
      thumbnailUrl
      slug
      avatarUrl
  }
}`;

export const GET_ANIMAL = gql`
  query getAnimal($slug: String!) {
    animal(slug: $slug) {
      id
      name
      intro
      slug
      username
      gender
      hairLength
      traitIds
      colors {
        id,
        name
      }
      microchipId
      facebookUrl
      facebookPageName
      twitterUrl
      twitterUsername
      instagramUrl
      instagramUsername
      youtubeUrl
      youtubeUsername
      tiktokUrl
      tiktokUsername
      donateMoneyLink
      donateSuppliesLink
      birthDate
      age
      loves {
        id
        text
      }
      hates {
        id
        text
      }
      photos {
        id
        thumbnailUrl
        photoUrl
        mediumPhotoUrl
        circularPhotoUrl
        sort
      }
      owners {
        id
        role
        fullName
        avatarUrl
        slug
      }
      fosters {
        id
        role
        fullName
        avatarUrl
        slug
      }
      traits {
        name
        image
      }
      breed {
        id
        name
        slug
      }
      coat {
        id
        name
        imageUrl
      }
      weightMeasurements {
        id
        takenAt
        display
        value
        unit
      }
      lengthMeasurements {
        id
        takenAt
        display
        value
        unit
      }
      city {
        id
        name
        state
        country
        centerLat
        centerLng
      }
      location {
        id
        name
        slug
        logoUrl
        adoptionApplicationUrl
        addressCity
        addressState
      }
      isFollowed
      followersCount
      avatarUrl
      statuses
      rescueAnimalId
    }
  }`;

export const GET_ANIMAL_WITH_STORIES = gql`
  query getAnimal($slug: String!) {
    animal(slug: $slug) {
      id
      name
      slug
      avatarUrl
      stories {
        photos {
          id
          photoUrl
          mediaType
        }
      }
      location {
        addressState
        addressCity
        name
      }
      statuses
    }
  }`;

export const UPDATE_ANIMAL = gql `
  mutation updateAnimal( $opinions: OpinionAttributes, $id: String!, $name: String!, $intro: String, $birthDate: String, $hairLength: String, $gender: String, $microchipId: String, $breedId: String, $coatId: String, $facebookPageName: String, $twitterUsername: String, $instagramUsername: String, $youtubeUsername: String, $tiktokUsername: String, $donateMoneyLink: String, $donateSuppliesLink: String, $photoIds: [String], $slug: String, $traitIds: [String], $colors: [String], $city: CityAttributes, $statuses: [String], $cropAttributes: CropAttributes, $avatar: Upload, $locationId: String, $rescueAnimalId: String) {
    updateAnimal(input: { opinions: $opinions, id: $id, slug: $slug, name: $name, intro: $intro, birthDate: $birthDate, hairLength: $hairLength, gender: $gender, microchipId: $microchipId, breedId: $breedId, coatId: $coatId, facebookPageName: $facebookPageName, twitterUsername: $twitterUsername, instagramUsername: $instagramUsername, youtubeUsername: $youtubeUsername, tiktokUsername: $tiktokUsername, donateMoneyLink: $donateMoneyLink, donateSuppliesLink: $donateSuppliesLink, photoIds: $photoIds, traitIds: $traitIds, colors: $colors, city: $city, statuses: $statuses, cropAttributes: $cropAttributes, avatar: $avatar, locationId: $locationId, rescueAnimalId: $rescueAnimalId }) {
      animal {
        id
        name
        intro
        slug
        username
        microchipId
        traitIds
        colors {
          id,
          name
        }
        gender
        hairLength
        facebookPageName
        twitterUsername
        instagramUsername
        youtubeUsername
        tiktokUsername
        donateMoneyLink
        donateSuppliesLink
        birthDate
        age
        loves {
          id
          text
        }
        hates {
          id
          text
        }
        photos {
          id
          thumbnailUrl
          photoUrl
          mediumPhotoUrl
        }
        owners {
          id
          role
          fullName
          avatarUrl
        }
        traits {
          name
          image
        }
        breed {
          id
          name
          slug
        }
        coat {
          id
          name
          imageUrl
        }
        city {
          id
          name
          state
          country
          centerLat
          centerLng
        }
        isFollowed
        followersCount
        statuses
        avatarUrl
        rescueAnimalId
        location {
          id
          name
          slug
          logoUrl
          adoptionApplicationUrl
        }
      }
    }
  }
`;

export const CREATE_ANIMAL = gql `
  mutation createAnimal($opinions: OpinionAttributes, $slug: String!, $name: String!, $birthDate: String, $intro: String, $hairLength: String, $gender: String, $microchipId: String, $breedId: String, $coatId: String, $facebookPageName: String, $twitterUsername: String, $instagramUsername: String, $youtubeUsername: String, $tiktokUsername: String, $donateMoneyLink: String, $donateSuppliesLink: String, $traitIds: [String], $city: CityAttributes, $colors: [String], $statuses: [String], $cropAttributes: CropAttributes, $avatar: Upload, $locationId: String, $rescueAnimalId: String) {
    createAnimal(input: { slug: $slug, opinions: $opinions, name: $name, intro: $intro, birthDate: $birthDate, hairLength: $hairLength, gender: $gender, microchipId: $microchipId, breedId: $breedId, coatId: $coatId, donateMoneyLink: $donateMoneyLink, donateSuppliesLink: $donateSuppliesLink, facebookPageName: $facebookPageName, twitterUsername: $twitterUsername, instagramUsername: $instagramUsername, youtubeUsername: $youtubeUsername, tiktokUsername: $tiktokUsername, traitIds: $traitIds, city: $city, colors: $colors, , statuses: $statuses, cropAttributes: $cropAttributes, avatar: $avatar, locationId: $locationId, rescueAnimalId: $rescueAnimalId }) {
      animal {
        id
        name
        intro
        slug
        traitIds
        colors {
          id,
          name
        }
        username
        gender
        hairLength
        microchipId
        facebookPageName
        twitterUsername
        instagramUsername
        youtubeUsername
        tiktokUsername
        donateMoneyLink
        donateSuppliesLink
        birthDate
        age
        loves {
          id
          text
        }
        hates {
          id
          text
        }
        photos {
          id
          thumbnailUrl
          photoUrl
          mediumPhotoUrl
        }
        owners {
          id
          role
          fullName
          avatarUrl
        }
        traits {
          name
          image
        }
        breed {
          id
          name
          slug
        }
        coat {
          id
          name
          imageUrl
        }
        city {
          id
          name
          state
          country
          centerLat
          centerLng
        }
        isFollowed
        followersCount
        statuses
        avatarUrl
        rescueAnimalId
        location {
          id
          name
          slug
          logoUrl
          adoptionApplicationUrl
        }
      }
    }
  }
`;


export const TRANSFER_OWNER_REQUEST = gql `
  mutation transferOwnerRequest($id: String!, $slug: String!, $newOwnerEmail: String, $transferType: String) {
    transferOwnerRequest(input: { id: $id, slug: $slug, newOwnerEmail: $newOwnerEmail, transferType: $transferType }) {
      animal {
        id
        name
        intro
        slug
        traitIds
        colors {
          id,
          name
        }
        username
        gender
        hairLength
        microchipId
        facebookPageName
        twitterUsername
        instagramUsername
        youtubeUsername
        tiktokUsername
        donateMoneyLink
        donateSuppliesLink
        birthDate
        age
        loves {
          id
          text
        }
        hates {
          id
          text
        }
        photos {
          id
          thumbnailUrl
          photoUrl
          mediumPhotoUrl
        }
        owners {
          id
          role
          fullName
          avatarUrl
        }
        traits {
          name
          image
        }
        breed {
          id
          name
          slug
        }
        coat {
          id
          name
          imageUrl
        }
        statuses
        rescueAnimalId
        location {
          id
          name
          slug
          logoUrl
          adoptionApplicationUrl
        }
      }
    }
  }
`;

export const DELETE_ANIMAL = gql `
  mutation deleteAnimal($slug: String!) {
    deleteAnimal(input: { slug: $slug}) {
      animal {
        name
        slug
      }
    }
  }
`;

export const FOLLOW_ANIMAL = gql`
  mutation followAnimal($followableSlug: String) {
    followAnimal(input: { followableSlug: $followableSlug }) {
      animal {
        id
        name
        intro
        slug
        username
        gender
        hairLength
        traitIds
        colors {
          id,
          name
        }
        microchipId
        facebookUrl
        facebookPageName
        twitterUrl
        twitterUsername
        instagramUrl
        instagramUsername
        youtubeUrl
        youtubeUsername
        tiktokUrl
        tiktokUsername
        donateMoneyLink
        donateSuppliesLink
        birthDate
        age
        loves {
          id
          text
        }
        hates {
          id
          text
        }
        photos {
          id
          thumbnailUrl
          photoUrl
          mediumPhotoUrl
          circularPhotoUrl
          sort
        }
        owners {
          id
          role
          fullName
          avatarUrl
          slug
        }
        fosters {
          id
          role
          fullName
          avatarUrl
          slug
        }
        traits {
          name
          image
        }
        breed {
          id
          name
          slug
        }
        coat {
          id
          name
          imageUrl
        }
        city {
          id
          name
          state
          country
          centerLat
          centerLng
        }
        isFollowed
        followersCount
        statuses
        rescueAnimalId
        location {
          id
          name
          slug
          logoUrl
          adoptionApplicationUrl
        }
      }
    }
  }
`;

export const UNFOLLOW_ANIMAL = gql`
  mutation unfollowAnimal($followableSlug: String) {
    unfollowAnimal(input: { followableSlug: $followableSlug }) {
      animal {
        id
        name
        intro
        slug
        username
        gender
        hairLength
        traitIds
        colors {
          id,
          name
        }
        microchipId
        facebookUrl
        facebookPageName
        twitterUrl
        twitterUsername
        instagramUrl
        instagramUsername
        youtubeUrl
        youtubeUsername
        tiktokUrl
        tiktokUsername
        donateMoneyLink
        donateSuppliesLink
        birthDate
        age
        loves {
          id
          text
        }
        hates {
          id
          text
        }
        photos {
          id
          thumbnailUrl
          photoUrl
          mediumPhotoUrl
          circularPhotoUrl
          sort
        }
        owners {
          id
          role
          fullName
          avatarUrl
          slug
        }
        fosters {
          id
          role
          fullName
          avatarUrl
          slug
        }
        traits {
          name
          image
        }
        breed {
          id
          name
          slug
        }
        coat {
          id
          name
          imageUrl
        }
        city {
          id
          name
          state
          country
          centerLat
          centerLng
        }
        isFollowed
        followersCount
        statuses
        rescueAnimalId
        location {
          id
          name
          slug
          logoUrl
          adoptionApplicationUrl
        }
      }
    }
  }
`;

export const CREATE_LENGTH_MEASUREMENT = gql`
  mutation createMeasurement($takenAt: String!, $weightValue: Float, $weightUnit: String, $lengthValue: Float, $lengthUnit: String, $animalId: String) {
    createMeasurement(input: { animalId: $animalId, takenAt: $takenAt, weightValue: $weightValue, weightUnit: $weightUnit, lengthValue: $lengthValue, lengthUnit: $lengthUnit }) {
      lengthMeasurement {
        id
        takenAt
        display
        value
        unit
      }
    }
  }
`;

export const CREATE_WEIGHT_MEASUREMENT = gql`
  mutation createMeasurement($takenAt: String!, $weightValue: Float, $weightUnit: String, $lengthValue: Float, $lengthUnit: String, $animalId: String) {
    createMeasurement(input: { animalId: $animalId, takenAt: $takenAt, weightValue: $weightValue, weightUnit: $weightUnit, lengthValue: $lengthValue, lengthUnit: $lengthUnit }) {
      weightMeasurement {
        id
        takenAt
        display
        value
        unit
      }
    }
  }
`;

export const UPDATE_ANIMAL_AVATAR = gql`
  mutation updateAnimalAvatar($cropX: Float!, $cropY: Float!, $cropW: Float!, $cropH: Float!, $animalId: String!, $src: String!) {
    updateAnimalAvatar(input: { cropX: $cropX, cropY: $cropY, cropW: $cropW, cropH: $cropH, animalId: $animalId, imageUrl: $src }) {
      message
    }
  }
`;

export const DELETE_WEIGHT_MEASUREMENT = gql`
  mutation deleteMeasurement($animalSlug: String!, $measurementId: String!, $type: String!) {
    deleteMeasurement(input: { animalSlug: $animalSlug, measurementId: $measurementId, type: $type}) {
      weightMeasurement {
        id
        takenAt
        display
        value
        unit
      }
    }
  }
`;

export const DELETE_LENGTH_MEASUREMENT = gql`
  mutation deleteMeasurement($animalSlug: String!, $measurementId: String!, $type: String!) {
    deleteMeasurement(input: { animalSlug: $animalSlug, measurementId: $measurementId, type: $type}) {
      lengthMeasurement {
        id
        takenAt
        display
        value
        unit
      }
    }
  }
`;
