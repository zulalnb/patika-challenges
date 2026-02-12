import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getAllUsers {
    users {
      _id
      fullName
    }
  }
`;

export const NEW_POST_MUTATION = gql`
  mutation AddNewPost($data: CreatePostInput!) {
    createPost(data: $data) {
      _id
      title
      short_description
      description
      cover
    }
  }
`;
