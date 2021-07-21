import React, { useEffect } from "react";
import Header from "../components/Header";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import "../styles/CartPage.css";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_FROM_BASKET,
  selectBasket,
  SET_BASKET_COUNT,
} from "../features/basketSlice";
import calculateTotal from "../basket/calculateTotal";
import updateQuantity from "../basket/updateQuantity";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import mutations from "../graphql/Mutations";
import { LOAD_BASKET } from "../features/basketSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectBasket);
  const [createCheckoutSession, { loading, data }] = useMutation(
    mutations.CHECKOUT
  );

  useEffect(() => {
    if (data) window.location.replace(data.createCheckoutSession.sessionUrl);
    dispatch(SET_BASKET_COUNT());
  }, [data]);

  const truncateDescription = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  const handleDeleteItemFromCart = (id) => {
    dispatch(REMOVE_FROM_BASKET({ id }));
    dispatch(SET_BASKET_COUNT());
  };

  const checkoutOrder = async () => {
    await createCheckoutSession({
      variables: { products: cart },
    });
  };

  const updateQuantityCount = (e) => {
    updateQuantity(e);
    dispatch(LOAD_BASKET(JSON.parse(localStorage.getItem("basket"))));
    dispatch(SET_BASKET_COUNT());
  };

  return (
    <div className="cart">
      <Header />
      <div className="cart__items">
        <div className="wrapper">
          {cart && cart.length === 0 && <div>You have no items in cart!</div>}
          {cart &&
            cart.length > 0 &&
            cart.map((book) => (
              <div className="cart__item" key={book.id} data-id={book.id}>
                <div className="cart__itemInfo">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="cart__itemCover"
                  />
                  <div className="cart__itemInfoContainer">
                    <h4 className="cart__itemTitle">{book.title}</h4>
                    <p className="cart__itemAuthor">{book.author}</p>
                    <p className="cart__itemDescription">
                      {truncateDescription(book.description, 250)}
                    </p>
                  </div>
                </div>
                <div className="cart__itemControls">
                  <DeleteOutlineIcon
                    className="cart__deleteIcon"
                    onClick={() => handleDeleteItemFromCart(book.id)}
                  />
                  <div className="cart__itemControlsContainer">
                    <div className="cart__itemQuantity">
                      <RemoveIcon
                        className="cart__minusIcon"
                        onClick={updateQuantityCount}
                        data-operation="DECREMENT"
                      />
                      <div className="cart__quantity">{book.quantity}</div>
                      <AddIcon
                        className="cart__addIcon"
                        onClick={updateQuantityCount}
                        data-operation="INCREMENT"
                      />
                    </div>
                    <div className="cart__itemPrice">
                      ${book.price.toFixed(2)}
                    </div>
                  </div>
                </div>
                <button
                  className="cart__removeFromBasketBtn"
                  onClick={handleDeleteItemFromCart(book.id)}
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
      </div>
      <div className="wrapper">
        {cart?.length > 0 && (
          <div className="cart__action">
            <Link to="/">
              <button className="cart__continueShopping">
                Continue Shopping
              </button>
            </Link>
            <div className="cart__total">
              <div className="cart__subtotal">
                <h4 className="cart__subtotalLabel">Subtotal:</h4>
                <div className="cart__subtotalCount">
                  ${calculateTotal(cart)}
                </div>
              </div>
              <button className="cart__checkoutBtn" onClick={checkoutOrder}>
                {loading ? "Please wait.." : "Checkout"}
              </button>
              {/* <PaypalCheckout products={cart} /> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
