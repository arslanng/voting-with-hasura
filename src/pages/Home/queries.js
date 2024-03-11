import { gql } from "@apollo/client";

const postFragments = gql`
  fragment PostFragmens on Post {
    _id
    title
    short_description
    user {
      profile_photo
    }
  }
`;

export const GET_POSTS = gql`
  query getAllPosts {
    posts {
      ...PostFragmens
    }
  }
  ${postFragments}
`;

export const POSTS_SUBSCRIPTION = gql`
  subscription MySubscription {
    postCreated {
      ...PostFragmens
    }
  }
  ${postFragments}
`;
