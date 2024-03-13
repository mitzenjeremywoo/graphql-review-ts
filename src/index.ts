import { buildSubgraphSchema } from '@apollo/subgraph';
import Debug from 'debug';
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './review-schema';

const debug = Debug('review');

const reviews = [{
  id: '1',
  productId: '1',
  content: 'The best blender',
  rating: 4.5
}]

const books = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
  },
];

const addBookResponse = 
{
    code: 'ok',
    success: true, 
    message: 'book added',
    book: {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald'
    }
};


const authors = [
  {
    title: 'The Great Gatsby',
    name: 'F. Scott Fitzgerald',
  },
  {
    title: 'Wuthering Heights',
    name: 'Emily Brontë',
  },
];

const resolvers = {
  Mutation: { 
    addBook: (title: String, author: String) => {
      return addBookResponse
    }
  },
  Custom: {
    books: () => books
  },
  Query: {
    books: () => books,
    author: () => authors,
    reviews: () => reviews
  },
  
  Product: {
    reviews(product: any) {
      debug(`resolving product reviews by product ${JSON.stringify(product)}`);
      return reviews.filter(review => review.productId === product.id);
    }
  },
  Review: {
    product(review: any) {
      return {
        __typename: 'Product',
        id: review.productId
      };
    }
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers })
});

server.listen({ port: 4002 }).then(() => {
  debug('service started');
});
