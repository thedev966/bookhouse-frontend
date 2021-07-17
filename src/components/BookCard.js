import React from "react";
import "../styles/BookCard.css";

const BookCard = ({ isLarge, cover, active }) => {
  return (
    <div className="book-card">
      <img
        src={cover}
        alt="book-cover"
        style={{
          border: active && "2px solid white",
          transform: active && `scale(1.04)`,
          height: isLarge && "240px",
        }}
      />
    </div>
  );
};

export default BookCard;
