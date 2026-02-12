import { gql } from "graphql-request";

export const GET_MEETING_PARTICIPANTS = gql`
  query getParticipants($meeting_id: Int!) {
    participants(where: { meeting_id: { _eq: $meeting_id } }) {
      user {
        id
        email
        fullName
      }
    }
  }
`;
