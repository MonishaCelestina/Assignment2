document
  .getElementById("add-to-cart-btn")
  .addEventListener("click", function () {
    // Increment the quantity displayed in the shopping cart navbar link
    var cartQuantityElement = document.getElementById("cart-quantity");
    var cartQuantity = parseInt(cartQuantityElement.innerText);
    cartQuantityElement.innerText = cartQuantity + 1;
  });
