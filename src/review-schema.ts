import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", 
    import: ["@key", "@shareable"])

  type Review {
    id: ID!
    rating: Float!
    content: String!
    product: Product!
  }
  
  type Product @key(fields: "id") {
    id: ID!
    reviews: [Review!]!
  }
  
  type Book {
    title: String
    author: String
  }

  type Query {
    review(id: ID!): Review!
    books: [Book]
  }  
`;