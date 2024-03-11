import { gql } from "@apollo/client";

export const GET_POST = gql`
  query post($id: ID!) {
    post(id: $id) {
      _id
      title
      description
      cover
      user {
        _id
        fullName
      }
    }
  }
`;

const commentFragment = gql`
  fragment CommentFragment on Comment {
    # commentsFragment içinde CommentsFragment adıyla aşağıdaki parametreleri saklar.
    _id
    text
    user {
      _id
      fullName
      profile_photo
    }
  }
`;

export const GET_POST_COMMENTS = gql`
  query postComments($id: ID!) {
    post(id: $id) {
      comments {
        ...CommentFragment
        # Bu kısım değişkenleri yerleştirmek için
      }
    }
  }
  ${commentFragment}
  # bu kısım değişkeni import etmek için
`;

export const COMMENTS_SUBSCRIPTIONS = gql`
  subscription ($postId: ID) {
    commentCreated(post_id: $postId) {
      ...CommentFragment
    }
  }
  ${commentFragment}
`;
