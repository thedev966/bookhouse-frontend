import React from "react";
import "../styles/HomePage.css";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import BookCategoryRow from "../components/BookCategoryRow";
import HistoryIcon from "@material-ui/icons/History";
import Footer from "../components/Footer";
import Slide from "react-reveal/Slide";

const HomePage = () => {
  return (
    <div className="homepage__container">
      <Header />
      <HeroSection />
      <Categories />
      <Slide bottom>
        <BookCategoryRow
          catName="Fiction"
          icon={<HistoryIcon />}
          title="Fiction Books"
          isLanding
        />
      </Slide>
      <Slide bottom>
        <BookCategoryRow
          catName="History"
          icon={<HistoryIcon />}
          title="History Books"
          isLanding
        />
      </Slide>
      <Slide bottom>
        <BookCategoryRow
          catName="Crime & Thriller"
          icon={<HistoryIcon />}
          title="Crime & Thriller Books"
          isLanding
        />
      </Slide>
      <Slide bottom>
        <BookCategoryRow
          catName="Sci-Fi"
          icon={<HistoryIcon />}
          title="Sci-Fi Books"
          isLanding
        />
      </Slide>
      <Slide bottom>
        <BookCategoryRow
          catName="Science"
          icon={<HistoryIcon />}
          title="Science Books"
          isLanding
        />
      </Slide>
      <Slide bottom>
        <BookCategoryRow
          catName="Languages"
          icon={<HistoryIcon />}
          title="Languages Books"
          isLanding
        />
      </Slide>
      <Slide bottom>
        <BookCategoryRow
          catName="Technology"
          icon={<HistoryIcon />}
          title="Technology Books"
          isLanding
        />
      </Slide>
      <Slide bottom>
        <BookCategoryRow
          catName="Romance"
          icon={<HistoryIcon />}
          title="Romance Books"
          isLanding
        />
      </Slide>
      <Footer />
    </div>
  );
};

export default HomePage;
