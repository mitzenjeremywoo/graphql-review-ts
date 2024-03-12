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

const resolvers = {

  Query: {
    books: () => books,
  },

  Books: {
    books: () => books
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
