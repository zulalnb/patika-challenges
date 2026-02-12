import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getAllUsers {
    users {
      id
      fullName
    }
  }
`;

export const NEW_POST_MUTATION = gql`
  mutation AddNewPost($data: CreatePostInput!) {
    createPost(data: $data) {
      id
      title
      short_description
      description
      cover
    }
  }
`;
