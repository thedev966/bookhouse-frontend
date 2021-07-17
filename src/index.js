import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { InMemoryCache, ApolloProvider, ApolloClient } from "@apollo/client";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
// import AlertTemplate from "react-alert-template-basic";

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_API,
  cache: new InMemoryCache({
    addTypename: false,
  }),
  fetchOptions: {
    mode: "no-cors",
  },
  credentials: "include",
});

const alertOptions = {
  position: positions.TOP_CENTER,
  timeout: 3000,
  offset: "40px",
  transition: transitions.FADE,
};

const AlertTemplate = ({ style, options, message, close }) => (
  <div style={style}>{message}</div>
);

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <App />
        </AlertProvider>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
