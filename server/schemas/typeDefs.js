const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
    _id: String
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  input InputBook {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me(token:String!): User
    users: [User]
  }

  type Mutation {
    login(email: String!, password: String!): Auth

    addUser(username: String!, email: String!, password: String!): Auth

    saveBook(token: String!, input:InputBook):User

    removeBook(token:String!, bookId:String):User
  }

`;

module.exports = typeDefs;
