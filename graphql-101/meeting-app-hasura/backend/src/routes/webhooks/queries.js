import { gql } from "graphql-request";

export const GET_MEETING_PARTICIPANTS = gql`
  query getParticipants($id: Int!) {
    meetings_by_pk(id: $id) {
      user {
        id
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
