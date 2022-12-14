const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, { token }) => {
      return User.findOne({ token: token });
    },

    users: async (parent, {}) => {
      return User.find();
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },

    saveBook: async (parent, { token, input}) => {
      return User.findOneAndUpdate(
        { token: token },
        {
          $addToSet: { savedBooks: input }
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },

    removeBook: async (parent, { token, bookId}) => {
      return User.findOneAndUpdate(
        { token: token },
        { $pull: { savedBooks: { bookId: bookId } } },
        {
          new: true,
        }
      );
    },
  },
};

module.exports = resolvers;
