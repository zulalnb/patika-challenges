import { gql } from "graphql-request";

export const GET_MEETING_PARTICIPANTS = gql`
  query getParticipants($id: Int!) {
    meetings_by_pk(id: $id) {
      title
      meeting_date
      user {
        email
        fullName
      }
      participants {
        user {
          email
        }
      }
    }
  }
`;

export const GET_MEETING_PARTICIPANTS_REMINDER_QUERY = gql`
  query getParticipants($id: Int!) {
    meetings_by_pk(id: $id) {
      title
      meeting_date
      user {
        email
        fullName
      }
      participants {
        user {
          email
        }
      }
    }
  }
`;
