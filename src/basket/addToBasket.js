const addToBasket = (book) => {
  // check if the book is already there
  const basket = JSON.parse(localStorage.getItem("basket"));
  // basket not empty
  if (basket.length > 0) {
    const arr = basket.filter((b) => b.id === book.id);
    const existingBook = arr[0];
    if (existingBook) {
      // just increment quantity
      let index = basket.indexOf(existingBook);
      let modifiedBook = {
        ...existingBook,
        quantity: existingBook.quantity + 1,
      };
      basket[index] = modifiedBook;
    } else {
      // add new book
      basket.push({ ...book, quantity: 1 });
    }
  } else {
    // basket empty
    basket.push({ ...book, quantity: 1 });
  }
  // save changes
  localStorage.setItem("basket", JSON.stringify(basket));
};

export default addToBasket;
