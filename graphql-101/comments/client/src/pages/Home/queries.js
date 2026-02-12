import { gql } from "@apollo/client";

export const postFragment = gql`
  fragment PostFragment on Post {
    _id
    title
    short_description
    user {
      profile_photo
    }
  }
`;

export const GET_POSTS = gql`
  query GetAllPosts {
    posts {
      ...PostFragment
    }
  }
  ${postFragment}
`;

export const POSTS_SUBSCRIPTION = gql`
  subscription {
    postCreated {
      ...PostFragment
    }
  }
  ${postFragment}
`;
