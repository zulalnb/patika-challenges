import { gql } from "graphql-request";

export const IS_EXISTS_USER = gql`
  query isExistEmail($email: String!) {
    users(where: { email: { _eq: $email } }) {
      id
    }
  }
`;

export const INSERT_USER_MUTATION = gql`
  mutation insertUser($input: users_insert_input!) {
    insert_users_one(object: $input) {
      id
      email
    }
  }
`;

export const LOGIN_QUERY = gql`
  query login($email: String!) {
    users(where: { email: { _eq: $email } }) {
      id
      email
      password
    }
  }
`;
