import { gql } from "@apollo/client";

export const GET_LOCATIONS = gql`
  query getAllLocations {
    locations {
      id
      name
    }
  }
`;
