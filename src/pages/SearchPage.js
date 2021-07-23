import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Header from "../components/Header";
import "../styles/SearchPage.css";
import { useQuery } from "@apollo/client";
import queries from "../graphql/Queries";
import Spinner from "react-spinkit";

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
            Search results for <i>`{query}`</i> - Found{" "}
            <span>{data?.searchBooks.books.length}</span>
            results.
          </div>
          <div className="search-page__results">
            {loading ? (
              <Spinner
                name="ball-clip-rotate"
                color="coral"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%)`,
                }}
              />
            ) : (
              data?.searchBooks.books.map((book) => (
                <div className="search-page__item">
                  <img
                    src={book.cover}
                    alt={book.title}
                    onClick={() => history.push(`/book/${book.id}`)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
