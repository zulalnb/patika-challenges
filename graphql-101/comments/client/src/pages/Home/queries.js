import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetAllPosts {
    posts {
      id
      title
      description
      user {
        profile_photo
      }
    }
  }
`;
