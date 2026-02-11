import { gql } from "@apollo/client";

export const GET_EVENT = gql`
  query getEvent($id: ID!) {
    event(id: $id) {
      title
      desc
      date
      location {
        name
      }
      user {
        username
        email
      }
      participants {
        user {
          id
          username
          email
        }
      }
    }
  }
`;

export const PARTICIPANTS_SUBSCRIPTION = gql`
  subscription participantAdded($event_id: ID) {
    participantAdded(event_id: $event_id) {
      id
      user {
        id
        username
        email
      }
    }
  }
`;
