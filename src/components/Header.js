import React, { useEffect, useRef, useState } from "react";
import "../styles/Header.css";
import SearchIcon from "@material-ui/icons/Search";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ReactModal from "react-modal";
import AuthContent from "./AuthContent";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUser,
  selectUser,
  selectIsOpenedAuthModal,
  openModal,
  closeModal,
} from "../features/authSlice";
import { Link, useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import queries from "../graphql/Queries";
import emptyBasket from "../basket/emptyBasket";
import {
  selectBasketCount,
  SET_BASKET_COUNT,
  LOAD_BASKET,
} from "../features/basketSlice";

const Header = () => {
  const header = useRef();
  const dropDownRef = useRef();
  const [authOperation, setAuthOperation] = useState();
  const [authTitle, setAuthTitle] = useState("");
  const user = useSelector(selectUser);
  const isOpenedAuthModal = useSelector(selectIsOpenedAuthModal);
  const dispatch = useDispatch();
  const history = useHistory();
  const [logOutUser, { loading, data }] = useLazyQuery(queries.LOGOUT_USER);
  const basketCount = useSelector(selectBasketCount);

  ReactModal.setAppElement("#root");

  const headerOnScroll = () => {
    if (window.pageYOffset > 30) {
      header?.current?.classList.add("scrolled");
    } else {
      header?.current?.classList.remove("scrolled");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", headerOnScroll);

    return () => {
      window.removeEventListener("scroll", headerOnScroll);
    };
  }, []);

  useEffect(() => {
    dispatch(LOAD_BASKET(JSON.parse(localStorage.getItem("basket"))));
    dispatch(SET_BASKET_COUNT());
  }, []);

  const handleAvatarClick = () => {
    dropDownRef.current.classList.toggle("userDropDown--active");
  };

  const handleAuthClick = (e) => {
    document.body.overflow = "hidden";
    let operation = e.target.getAttribute("data-operation");
    dropDownRef.current.classList.remove("userDropDown--active");
    setAuthOperation(operation);
    setAuthTitle(operation);
    dispatch(openModal());
  };

  const closeAuthModal = () => {
    dispatch(closeModal());
    document.body.overflow = "unset";
  };

  const handleLogOut = async () => {
    dispatch(logoutUser());
    logOutUser();
    emptyBasket();
    window.location.reload();
  };

  const handleMenuClick = () => {
    document
      .querySelector(".header__searchAndBasket")
      .classList.toggle("header__searchAndBasket--active");
  };

  return (
    <div className="wrapper">
      <div className="header__container" ref={header}>
        <div className="header__left">
          <Link to="/">
            <img
              className="header__logo"
              src="https://i.pinimg.com/originals/8c/64/69/8c64695ea89ddb51f9b53fa9dfe315e3.png"
              alt="bookhouse.logo"
            />
          </Link>
        </div>
        <div className="header__right">
          <div className="header__searchAndBasket">
            <div className="header__searchBox">
              <SearchIcon />
              <input type="text" placeholder="Search here.." />
            </div>
            <div
              className="header__basket"
              onClick={() => history.push("/cart")}
            >
              My Basket <ShoppingCartIcon />
              <span className="header__basketCount">{basketCount}</span>
            </div>
          </div>
          <MenuRoundedIcon
            className="header__menuIcon"
            onClick={handleMenuClick}
          />
          <div className="header__user" onClick={handleAvatarClick}>
            <img
              className="header__userAvatar"
              src={
                !user
                  ? "https://i.pinimg.com/originals/86/d5/1f/86d51f5dcc9f69581dcbe497a280019e.png"
                  : "https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png"
              }
              alt="user-avatar"
            />
          </div>
          <div className="header__userDropDown" ref={dropDownRef}>
            <button
              className="userDropDown__login"
              data-operation="Login"
              onClick={!user ? handleAuthClick : () => history.push("/orders")}
            >
              {user ? "Orders" : "Login"}
            </button>
            <button
              className="userDropDown__register"
              data-operation="Register"
              onClick={!user ? handleAuthClick : handleLogOut}
            >
              {user ? (loading ? "Logging Out.." : "Logout") : "Register"}
            </button>
          </div>
        </div>
      </div>
      <ReactModal
        isOpen={isOpenedAuthModal}
        onRequestClose={closeAuthModal}
        contentLabel="Authentication"
        className="authModal__content"
        overlayClassName="authModal__overlay"
      >
        <AuthContent title={authTitle} operation={authOperation} />
      </ReactModal>
    </div>
  );
};

export default Header;
