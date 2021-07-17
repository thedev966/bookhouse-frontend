import React from "react";
import "../styles/BookCategoryRow.css";
import BookCard from "./BookCard";
import { useQuery } from "@apollo/client";
import queries from "../graphql/Queries";
import { Link } from "react-router-dom";

const BookCategoryRow = ({ title, icon, catName, isLanding }) => {
  const { loading, data } = useQuery(queries.FEATURED_BOOKS, {
    variables: {
      catName: catName,
    },
  });

  return (
    <div className="wrapper">
      <div className="category-row">
        <div className="category-row__topBar">
          <div className="category-row__left">
            <div className="category-row__icon">{icon}</div>
            <div className="category-row__title">{title}</div>
          </div>
          {isLanding && (
            <Link to={`/categories/${catName.toLowerCase()}`}>
              <button className="category-row__seeAll">SEE ALL</button>
            </Link>
          )}
        </div>
        <div className="category-row__grid">
          {loading && "Loading..."}
          {data?.featuredBooks.books.map((book, key) => (
            <div key={key}>
              <Link to={`/book/${book.id}`}>
                <BookCard cover={book.cover} isLarge />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookCategoryRow;
