const removeFromBasket = (bookID) => {
  const basket = JSON.parse(localStorage.getItem("basket"));
  const books = [...basket];
  const modifiedBooks = books.filter((book) => book.id !== bookID);
  // save changes
  localStorage.setItem("basket", JSON.stringify(modifiedBooks));
};

export default removeFromBasket;
