import React, { useState, useEffect } from "react";
import "../styles/HeroSection.css";
import BookCard from "./BookCard";
import { useQuery } from "@apollo/client";
import queries from "../graphql/Queries";
import Fade from "react-reveal/Fade";

const HeroSection = () => {
  const { loading, data } = useQuery(queries.HERO_BOOKS);
  const [heroBooks, setHeroBooks] = useState([]);
  const [activeBook, setActiveBook] = useState();

  useEffect(() => {
    if (data) {
      setHeroBooks(data.heroBooks.heroBooks);
      setActiveBook(data.heroBooks.heroBooks[0]);
      console.log(data);
    }
  }, [loading, data]);

  const handleCardClick = (id) => {
    setActiveBook(heroBooks[id]);
  };

  const truncateOverview = (text, char) => {
    return text?.length > char ? text?.substring(0, char) + "..." : text;
  };

  return (
    <div
      className="hero-section"
      style={{
        backgroundImage: `url(https://cdn.pixabay.com/photo/2017/06/21/21/30/plume-2428666_960_720.jpg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {loading ? (
        <>Loading...</>
      ) : (
        <div className="hero-section__content">
          <Fade left>
            <div className="hero-section__book-info">
              <div className="hero-section__title">{activeBook?.title}</div>
              <div className="hero-section__author">
                by {activeBook?.author}
              </div>
              <div className="hero-section__overview">
                {truncateOverview(activeBook?.description, 450)}
              </div>
            </div>
          </Fade>
          {data && (
            <Fade right>
              <div className="hero-sectionm__books-list">
                {heroBooks.map((book, key) => (
                  <div
                    key={key}
                    onClick={() => handleCardClick(heroBooks.indexOf(book))}
                  >
                    <BookCard
                      cover={book.cover}
                      active={book.id === activeBook?.id ? true : false}
                    />
                  </div>
                ))}
              </div>
            </Fade>
          )}
        </div>
      )}
    </div>
  );
};

export default HeroSection;
