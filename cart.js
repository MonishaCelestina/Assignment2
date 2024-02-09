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

// Initialize a variable to track whether the discount has been applied
let discountApplied = false;

function applyDiscount() {
  const discountCodeInput = document
    .getElementById("discount-code")
    .value.toUpperCase();
  const totalPriceElement = document.getElementById("total-price");

  // Check if the discount has already been applied
  if (discountApplied) {
    alert("Discount has already been applied.");
    return;
  }

  // Check if the entered code is YAY100
  if (discountCodeInput === "YAY100") {
    const totalPrice = parseFloat(totalPriceElement.textContent);

    // Apply the fixed 20% discount
    const discountedPrice = totalPrice * 0.8; // 80% of the original price

    // Update the total price display
    totalPriceElement.textContent = discountedPrice.toFixed(2);
    alert("Discount applied! Your total is now 20% off.");

    // Set the discountApplied variable to true to indicate that the discount has been used
    discountApplied = true;
  } else {
    alert("Invalid discount code.");
  }
}
