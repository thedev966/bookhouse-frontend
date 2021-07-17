import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/Categories.css";

const categories = [
  "Fiction",
  "History",
  "Crime & Thriller",
  "Sci-Fi",
  "Science",
  "Languages",
  "Technology",
  "Romance",
];

const Categories = () => {
  const history = useHistory();
  const handleCategoryClick = (cat) => {
    history.push(`/categories/${cat.toLowerCase()}`);
  };

  return (
    <div className="wrapper">
      <div className="categories">
        <ul className="categories__list">
          {categories.map((cat, key) => (
            <li
              key={key}
              className="categories__listItem"
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
