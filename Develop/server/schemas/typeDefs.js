const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Query {
    me: [User]
  }

  type User {
    _id:
    username:
    email:
    bookCount:
    savedBooks: [Book]
  }

  type Book {
    boodId: Int
    authors: [String]
    description: String
    title: String
    image: [String]
    link: [String]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login: 
    addUser: 
    saveBook:
    removeBook:
  }

`;

module.exports = typeDefs;
