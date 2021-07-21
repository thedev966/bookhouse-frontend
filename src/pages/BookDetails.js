import React, { useEffect } from "react";
import Header from "../components/Header";
import "../styles/BookDetails.css";
import StarRatings from "react-star-ratings";
import { useQuery } from "@apollo/client";
import queries from "../graphql/Queries";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_BASKET } from "../features/basketSlice";
import { selectUser } from "../features/authSlice";

const BookDetails = () => {
  const { id } = useParams();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { loading, data } = useQuery(queries.SINGLE_BOOK, {
    variables: {
      bookID: id,
    },
  });

  const truncateDescription = (text, limit) => {
    return text.length > limit
      ? window.screen.width > 440
        ? text.substring(0, limit) + "..."
        : text
      : text;
  };

  const handleAddToCart = (e) => {
    e.target.innerText = "ADDED TO CART";
    e.target.setAttribute("disabled", true);
    dispatch(ADD_TO_BASKET(data.singleBook.bookDetails));
  };

  return (
    <div className="book-details">
      <Header />
      <div className="wrapper">
        <div className="book-details__content">
          {loading ? (
            <div>Loading..</div>
          ) : (
            <>
              <div className="book-details__thumbnail">
                <img
                  src={data.singleBook.bookDetails.cover}
                  alt="book-thumbnail"
                />
              </div>
              <div className="book-details__info">
                <h2 className="book-details__title">
                  {data.singleBook.bookDetails.title}
                </h2>
                <StarRatings
                  rating={data.singleBook.bookDetails.rating}
                  numberOfStars={5}
                  starRatedColor="#d9534f"
                  starDimension="20px"
                  starSpacing="2px"
                />
                <p className="book-details__author">
                  Written by {data.singleBook.bookDetails.author}
                </p>
                <p className="book-details__publisher">
                  Publisher: {data.singleBook.bookDetails.publisher}
                </p>
                <p className="book-details__overview">
                  {truncateDescription(
                    data.singleBook.bookDetails.description,
                    430
                  )}
                </p>
                <div className="book-details__purchase">
                  <button className="book-details__price">
                    ${data.singleBook.bookDetails.price.toFixed(2)}
                  </button>
                  <button
                    className="book-details__addToCart"
                    onClick={handleAddToCart}
                    disabled={!user}
                    style={{ cursor: !user ? "not-allowed" : "pointer" }}
                  >
                    {user ? "ADD TO CART" : "PLEASE LOG IN!"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
