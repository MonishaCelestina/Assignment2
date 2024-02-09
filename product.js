// Retrieve cart items from local storage
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

document.addEventListener("DOMContentLoaded", function () {
  // Get the product ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  // Retrieve product details based on the product ID
  const productDetails = getProductDetails(productId);

  // Update the product details container with the retrieved details
  updateProductDetails(productDetails);

  // Quantity Bar Script
  const quantityInput = document.getElementById("quantity-input");
  const increaseBtn = document.getElementById("increase-btn");
  const decreaseBtn = document.getElementById("decrease-btn");

  increaseBtn.addEventListener("click", function () {
    var currentQuantity = parseInt(quantityInput.value);
    quantityInput.value = currentQuantity + 1;
  });

  decreaseBtn.addEventListener("click", function () {
    var currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
      quantityInput.value = currentQuantity - 1;
    }
  });

  // Add to Cart Button Event Listener
  const addToCartBtn = document.getElementById("add-to-cart-btn");
  addToCartBtn.addEventListener("click", function () {
    // Get product details
    const title = document.getElementById("product-title").innerText;
    const description = document.getElementById(
      "product-description"
    ).innerText;
    const price = document.getElementById("product-price").innerText;
    const quantity = parseInt(document.getElementById("quantity-input").value);
    const imageUrl = document.getElementById("product-image").src;

    // Check if the item already exists in the cart
    const existingItemIndex = cartItems.findIndex(
      (item) => item.title === title
    );
    if (existingItemIndex !== -1) {
      // If item exists, update the quantity
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      // If item does not exist, add the item to the cart with quantity
      cartItems.push({ title, description, price, quantity, imageUrl });
    }

    // Save updated cart items to local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    const cartQuantityElement = document.getElementById("cart-quantity");
    cartQuantityElement.innerText = cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
  });
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
      title: "Mothership",
      description:
        "Mothership is the seventh studio album by American rock band Dance Gavin Dance, released on October 7, 2016, on Rise Records.",
      price: 39.99,
      imageUrl: "images/mothership.jpg",
    },
    4: {
      title: "Color Theory",
      description:
        "The second album from singer-songwriter Sophie Allison is piercing and unpredictable. In contrast to its bigger and brighter sound, the mood is grimmer, the emotional truths darker.",
      price: 45.0,
      imageUrl: "images/colortheoryvinyl.jpg",
    },
    5: {
      title: "Graduation",
      description:
        "Graduation is the third studio album by American rapper Kanye West, released September 11, 2007, by Def Jam and Roc-A-Fella. ",
      price: 40.0,
      imageUrl: "images/graduation.jpg",
    },
    6: {
      title: "Julie Is Her Name",
      description:
        "Julie Is Her Name is the first LP album by Julie London, released by Liberty Records in December, 1955, under catalog numbers LRP-3006, in monaural form.",
      price: 45.0,
      imageUrl: "images/julie.jpg",
    },
    7: {
      title: "Good At Falling",
      description:
        "Julie Is Her Name is the first LP album by Julie London, released by Liberty Records in December, 1955, under catalog numbers LRP-3006, in monaural form.",
      price: 45.0,
      imageUrl: "images/goodvinyl.jpg",
    },
    8: {
      title: "Lovely Little Lonely",
      description:
        "The Maine's sixth studio album, Lovely Little Lonely. - 180 Gram Vinyl - Limited Edition Variant (Half Yellow, Half Black vinyl)",
      price: 45.0,
      imageUrl: "images/maine.jpg",
    },
    9: {
      title: "Habit",
      description:
        "Available in its first pressing for Matador Records, Snail Mail’s debut EP “Habit” serves as a nascent example of Lindsey Jordan’s extraordinary talent as a songwriter, singer and guitarist. The seven song disc features the six original 2016 tracks as well as “The 2nd Most Beautiful Girl In The World,” penned by K Records Band Courtney Love and recorded by Snail Mail in 2018, available on record for the first time. ",
      price: 45.0,
      imageUrl: "images/habit.jpg",
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
