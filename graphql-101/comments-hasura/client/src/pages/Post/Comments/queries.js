import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getAllUsers {
    users {
      id
      fullName
    }
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation addComment($input: comments_insert_input!) {
    insert_comments_one(object: $input) {
      id
      text
      user {
        fullName
        profile_photo
      }
    }
  }
`;
