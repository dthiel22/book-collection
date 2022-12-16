import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query Me($token: String!) {
  me(token: $token) {
    _id
    username
    email
    bookCount
    savedBooks {
      authors
      bookId
      description
      title
      image
      link
    }
  }
}
`;

