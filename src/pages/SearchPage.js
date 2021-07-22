import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Header from "../components/Header";
import "../styles/SearchPage.css";
import { useQuery } from "@apollo/client";
import queries from "../graphql/Queries";

const SearchPage = () => {
  const location = useLocation();
  const history = useHistory();
  const [query, setQuery] = useState("");
  const { loading, data } = useQuery(queries.SEARCH_BOOKS, {
    variables: {
      query,
    },
  });

  useEffect(() => {
    setQuery(location.search.split("=")[1]);
  }, [location]);

  data && console.log(data);
  return (
    <div className="search-page">
      <Header />
      <div className="wrapper">
        <div className="search-page__content">
          <div className="search-page__heading">
            Search Results for `{query}`
          </div>
          <div className="search-page__results">
            {data?.searchBooks.books.map((book) => (
              <div className="search-page__item">
                <img
                  src={book.cover}
                  alt={book.title}
                  onClick={() => history.push(`/book/${book.id}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
