import { gql } from "@apollo/client";

export const GET_LOCATIONS = gql`
  query getAllLocations {
    locations {
      id
      name
    }
  }
`;

export const ADD_EVENT = gql`
  mutation addEvent($data: CreateEventInput!) {
    addEvent(data: $data) {
      id
    }
  }
`;
