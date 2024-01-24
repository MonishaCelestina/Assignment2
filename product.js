document.addEventListener("DOMContentLoaded", function () {
  // Get the product ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  // Retrieve product details based on the product ID
  const productDetails = getProductDetails(productId);

  // Update the product details container with the retrieved details
  updateProductDetails(productDetails);
});

function getProductDetails(productId) {
  const products = {
    1: {
      title: "Rolling Stones (Hackney Diamonds)",
      description: "This is an example product description for Rolling Stones.",
      price: 45.0,
      imageUrl: "images/rollingstones.jpg",
    },
    2: {
      title: "I Need To Start A Garden",
      description:
        "This is an example product description for I Need To Start A Garden.",
      price: 45.0,
      imageUrl: "images/gardenalbum.jpeg",
    },
    3: {
      title: "Another Product",
      description:
        "This is an example product description for Another Product.",
      price: 39.99,
      imageUrl: "images/DGD_Mothership.jpeg",
    },
  };

  return products[productId] || null;
}

function updateProductDetails(productDetails) {
  // Get references to HTML elements
  const title = document.getElementById("product-title");
  const description = document.getElementById("product-description");
  const price = document.getElementById("product-price");
  const image = document.getElementById("product-image");

  if (productDetails) {
    // Update HTML content with product details
    title.textContent = `Title: ${productDetails.title}`;
    description.textContent = `Description: ${productDetails.description}`;
    price.textContent = `Price: $${productDetails.price.toFixed(2)}`;
    image.src = productDetails.imageUrl;
  } else {
    title.textContent = "Product not found";
  }
}
