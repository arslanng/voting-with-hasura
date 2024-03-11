import { gql } from "@apollo/client";

export const GET_USER = gql`
  query {
    users {
      fullName
      _id
    }
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation ($data: CreateCommetInput!) {
    createComment(data: $data) {
      _id
    }
  }
`;
