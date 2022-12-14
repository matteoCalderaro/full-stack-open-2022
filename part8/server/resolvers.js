const { UserInputError, AuthenticationError } = require('apollo-server');

const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'CIAO';

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const autore = await Author.findOne({ name: args.author });
      if (args.author && args.genre) {
        return Book.find({
          $and: [
            { author: { $in: autore.id } },
            { genres: { $in: args.genre } },
          ],
        }).populate('author');
      }
      if (args.author) {
        return Book.find({ author: { $in: autore.id } }).populate('author');
      }
      if (args.genre) {
        return Book.find({ genres: { $in: args.genre } }).populate('author');
      }
      return Book.find({}).populate('author');
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => {
      return Book.find({ author: root.id }).countDocuments();
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args });
        }
      }
      const newBook = new Book({ ...args, author: author });
      try {
        await newBook.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: newBook });
      return newBook;
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      const author = await Author.findOne({ name: args.name });
      if (!author) return null;
      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
      pubsub.publish('AUTHOR_CHANGED', { authorChanged: author });
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
    authorChanged: {
      subscribe: () => pubsub.asyncIterator('AUTHOR_CHANGED'),
    },
  },
};

module.exports = resolvers;
