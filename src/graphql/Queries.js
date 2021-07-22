import { gql } from "@apollo/client";

const queries = {
  REFRESH_TOKEN: gql`
    query {
      refreshToken {
        success
        message
        access_token
        user {
          id
          email
          avatar
        }
      }
    }
  `,
  LOGOUT_USER: gql`
    query {
      logOutUser {
        success
        message
      }
    }
  `,
  FEATURED_BOOKS: gql`
    query featuredBooks($catName: String!) {
      featuredBooks(catName: $catName) {
        success
        books {
          id
          title
          cover
        }
      }
    }
  `,
  SINGLE_BOOK: gql`
    query singleBook($bookID: ID!) {
      singleBook(bookID: $bookID) {
        success
        bookDetails {
          id
          title
          author
          publisher
          category
          cover
          rating
          price
          description
        }
      }
    }
  `,

  HERO_BOOKS: gql`
    query heroBooks {
      heroBooks {
        success
        heroBooks {
          id
          title
          author
          description
          cover
        }
      }
    }
  `,

  ORDER_DETAILS: gql`
    query orderDetails($orderDetailsInput: OrderDetailsInput!) {
      orderDetails(orderDetailsInput: $orderDetailsInput) {
        success
        message
        orderID
      }
    }
  `,

  ALL_ORDERS: gql`
    query allOrders($userID: String!) {
      allOrders(userID: $userID) {
        success
        orders {
          orderID
          items {
            title
            quantity
          }
          createdAt
          method
          total
          status
        }
      }
    }
  `,

  SEARCH_BOOKS: gql`
    query searchBooks($query: String!) {
      searchBooks(query: $query) {
        success
        books {
          id
          title
          cover
        }
      }
    }
  `,
};

export default queries;
