// Retrieve cart items from local storage
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

document.addEventListener("DOMContentLoaded", function () {
  // Call function to display cart items on the shopping cart page
  displayCartItems();
});

function displayCartItems() {
  const cartItemsContainer = document.getElementById("cart-items-container");
  const totalPriceElement = document.getElementById("total-price");

  // Clear existing content
  cartItemsContainer.innerHTML = "";

  // Iterate through cart items and display details
  cartItems.forEach((item) => {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("cart-item");

    // Extract numerical value from item.price
    const numericPrice = parseFloat(item.price.replace(/[^\d.]/g, ""));

    // Display item details (modify as needed)
    itemContainer.innerHTML = `
            <img src="${item.imageUrl}" alt="${
      item.title
    }" class="cart-item-image">
            <div class="cart-item-details">
                <h2>${item.title}</h2>
                <p>${item.description}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: $${(numericPrice * parseInt(item.quantity)).toFixed(
                  2
                )}</p>
            </div>
        `;

    // Append the item container to the cart items container
    cartItemsContainer.appendChild(itemContainer);
  });

  // Calculate and display total price
  const totalPrice = cartItems.reduce((total, item) => {
    // Extract numerical value from item.price
    const numericPrice = parseFloat(item.price.replace(/[^\d.]/g, ""));
    console.log("Numeric price for item:", numericPrice);

    console.log("Item quantity:", item.quantity);
    console.log(
      "Partial total for item:",
      numericPrice * parseInt(item.quantity)
    );
    return total + numericPrice * parseInt(item.quantity);
  }, 0);

  console.log("Total price:", totalPrice);

  totalPriceElement.textContent = totalPrice.toFixed(2);
}
