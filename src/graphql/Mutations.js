import { gql } from "@apollo/client";

const mutations = {
  REGISTER_ACCOUNT: gql`
    mutation registerAccount(
      $email: String!
      $password: String!
      $confirmPassword: String!
    ) {
      registerAccount(
        registerInput: {
          email: $email
          password: $password
          confirmPassword: $confirmPassword
        }
      ) {
        success
        message
        errors {
          fieldName
          message
        }
      }
    }
  `,
  LOGIN_USER: gql`
    mutation loginUser($email: String!, $password: String!) {
      loginUser(loginInput: { email: $email, password: $password }) {
        success
        message
        errors {
          fieldName
          message
        }
        access_token
        refresh_token
        user {
          id
          email
          avatar
        }
      }
    }
  `,
  CHECKOUT: gql`
    mutation createCheckoutSession($products: [Product!]!) {
      createCheckoutSession(createCheckoutSessionInput: $products) {
        sessionUrl
      }
    }
  `,

  PAYPAL_CHECKOUT: gql`
    mutation paypalCheckout($order: String!, $userID: String!) {
      paypalCheckout(order: $order, userID: $userID) {
        success
        message
      }
    }
  `,
};

export default mutations;
