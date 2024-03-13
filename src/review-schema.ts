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

  type Author {
    title: String
    name: String
  }

  input BlogPostContent {
    title: String
    body: String
    media: [MediaDetails!]
  }
  
  input MediaDetails {
    format: MediaFormat!
    url: String!
  }
  
  enum MediaFormat {
    IMAGE
    VIDEO
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!  
  }

  type BookMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    book: Book
  }

  type Mutation {
    addBook(title: String, author: String): BookMutationResponse
    createBlogPost(content: BlogPostContent!): Book
    updateBlogPost(id: ID!, content: BlogPostContent!): Book
  }

  type Query {
    review(id: ID!): Review!
    books: [Book]
    author: [Author]
  } 
  
  type Custom {
    books: [Book]
  }
`;