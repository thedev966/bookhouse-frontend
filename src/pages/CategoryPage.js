import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useHistory, useParams } from "react-router";
import "../styles/CategoryPage.css";
import BookCategoryRow from "../components/BookCategoryRow";
import booksArray from "../booksArray";

const categories = [
  "fiction",
  "history",
  "crime",
  "sci-fi",
  "science",
  "technology",
  "languages",
  "romance",
];

const CategoryPage = ({ books }) => {
  const { cat } = useParams();
  const [category, setCategory] = useState();
  const history = useHistory();

  useEffect(() => {
    if (!categories.includes(cat)) {
      history.replace("/");
    }
    setCategory(cat + " Books");
  }, [cat]);

  const capitalizeTitle = (title) => {
    return title?.charAt(0).toUpperCase() + title?.slice(1);
  };

  return (
    <div className="category-container">
      <Header />
      <div className="category__background"></div>
      <div className="category__title">{capitalizeTitle(category)}</div>
      <div class="icon-scroll"></div>
      <div className="category__list">
        <BookCategoryRow booksArray={booksArray} />
        <BookCategoryRow booksArray={booksArray} />
        <BookCategoryRow booksArray={booksArray} />
      </div>
    </div>
  );
};

export default CategoryPage;
