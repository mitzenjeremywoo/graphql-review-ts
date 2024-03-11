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

const resolvers = {
  Product: {
    reviews(product: any) {
      debug(`resolving product reviews by product ${JSON.stringify(product)}`);
      return reviews.filter(review => review.productId === product.id);
    }
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers })
});

server.listen({ port: 4002 }).then(() => {
  debug('service started');
});
