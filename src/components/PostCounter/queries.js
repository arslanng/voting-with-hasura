import { gql } from "@apollo/client";

export const POST_COUNT_SUBSCRİPTİON = gql`
  subscription {
    postsCount
  }
`;
