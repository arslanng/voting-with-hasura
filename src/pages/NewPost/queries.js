import { gql } from "@apollo/client";

export const GET_USER = gql`
  query {
    users {
      fullName
      _id
    }
  }
`;

export const NEW_POST_MUTATION = gql`
  mutation ($data: CreatePostInput!) {
    createPost(data: $data) {
      _id
      title
    }
  }
`;
