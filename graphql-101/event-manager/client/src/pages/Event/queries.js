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
