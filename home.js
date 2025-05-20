// Existing code for menu toggle here
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Add to cart on Products page
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Get product info from parent article data attributes
    const productElem = button.closest('.product');
    const productId = productElem.getAttribute('data-id');
    const productName = productElem.getAttribute('data-name');
    const productPrice = parseFloat(productElem.getAttribute('data-price'));

    addToCart({ id: productId, name: productName, price: productPrice });
  });
});

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if product already in cart
  const index = cart.findIndex(item => item.id === product.id);

  if (index > -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}
