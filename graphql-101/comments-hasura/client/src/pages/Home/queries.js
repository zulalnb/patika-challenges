import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
  query getAllEvents {
    events {
      id
      title
      desc
      date
    }
  }
`;

export const EVENTS_SUBSCRIPTION = gql`
  subscription {
    eventCreated {
      id
      title
      desc
      date
    }
  }
`;
