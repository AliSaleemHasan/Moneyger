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

export const GET_STATISTICS = gql`
  query GetStatistics($userId: Int!, $from: String!, $to: String!) {
    statistics(userId: $userId, from: $from, to: $to) {
      totalExpenses
      totalIncome
      maxExpenseDay {
        date
        amount
      }
      topExpenseCategory {
        categoryId
        totalSpent
      }
      topExpenseAccount {
        accountId
        total
      }
      topIncomeAccount {
        accountId
        total
      }
      dailyTotals {
        date
        totalExpenses
        totalIncome
      }
    }
  }
`;
