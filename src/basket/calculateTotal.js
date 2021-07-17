const calculateTotal = (cart) => {
  let total = 0;
  cart.forEach((book) => {
    total += book.price * book.quantity;
  });

  return total.toFixed(2);
};

export default calculateTotal;
