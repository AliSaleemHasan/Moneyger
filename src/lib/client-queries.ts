import { gql } from "@apollo/client";

export const getCategories = gql`
  query getCategories($userId: Int!) {
    categories(userId: $userId) {
      id
      name
      description
      user {
        id
        name
      }
    }
  }
`;

export const getAccounts = gql`
  query getAccounts($userId: Int!) {
    accounts(userId: $userId) {
      id
      name
      user {
        id
        name
      }
    }
  }
`;

export const getTransactions = gql`
  query GetUserRecords($userId: Int!, $first: Int) {
    records(userId: $userId, first: $first) {
      edges {
        cursor
        node {
          id
          amount
          type
          createdAt
          note
          category {
            id
            name
            description
          }
          account {
            id
            name
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
