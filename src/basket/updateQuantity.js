const updateQuantity = (e) => {
  const parentEl = e.target.parentElement;
  const operation = e.target.getAttribute("data-operation");
  const quantityEl = parentEl.querySelector(".cart__quantity");
  let quantity;
  if (quantityEl) {
    quantity =
      operation === "INCREMENT"
        ? parseInt(quantityEl.innerHTML) + 1
        : parseInt(quantityEl.innerHTML) === 1
        ? 1
        : parseInt(quantityEl.innerHTML) - 1;
  }
  const cartItem = parentEl.parentElement.parentElement.parentElement;
  const id = cartItem.getAttribute("data-id");
  // increment ui quantity
  if (quantityEl) quantityEl.innerHTML = quantity;
  let basket = JSON.parse(localStorage.getItem("basket"));
  let cart = [...basket];
  // update local storage
  cart.forEach((i) => {
    if (i.id === id) {
      i.quantity = quantity;
    }
  });

  localStorage.setItem("basket", JSON.stringify(cart));
};

export default updateQuantity;
