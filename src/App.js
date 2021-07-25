import React, { useEffect } from "react";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import BookDetails from "./pages/BookDetails";
import CartPage from "./pages/CartPage";
import SuccessPage from "./pages/SuccessPage";
import OrdersPage from "./pages/OrdersPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser, selectUser } from "./features/authSlice";
import { useLazyQuery } from "@apollo/client";
import queries from "./graphql/Queries";
import { EMPTY_BASKET, LOAD_BASKET } from "./features/basketSlice";
import SearchPage from "./pages/SearchPage";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [refreshToken, { data }] = useLazyQuery(queries.REFRESH_TOKEN);

  useEffect(() => {
    if (user) {
      // logged in
    } else {
      // request new access token if possible
      refreshToken();
      if (data?.refreshToken.success) {
        dispatch(loginUser(data?.refreshToken.user));
      }
    }
  }, [user, data]);

  useEffect(() => {
    if (user) {
      // check if there is basket in localStorage
      const basket = JSON.parse(localStorage.getItem("basket"));
      // create a new basket in localStorage
      if (!basket) {
        localStorage.setItem("basket", "[]");
      }
      dispatch(LOAD_BASKET(basket));
    }
  }, [user]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/success">
            <SuccessPage />
          </Route>
          <Route exact path="/orders">
            <OrdersPage />
          </Route>
          <Route exact path="/cart">
            {user ? <CartPage /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/categories/:cat">
            <CategoryPage />
          </Route>
          <Route exact path="/book/:id">
            <BookDetails />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
