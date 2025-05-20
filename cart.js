// Menu toggle code again
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Load cart items on page load
document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElem = document.getElementById('cart-total');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    cartTotalElem.textContent = '';
    return;
  }

  // Create list of cart items
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const itemElem = document.createElement('div');
    itemElem.className = 'cart-item';
    itemElem.innerHTML = `
      <h3>${item.name}</h3>
      <p>Price: $${item.price.toFixed(2)}</p>
      <p>Quantity: ${item.quantity}</p>
      <p>Total: $${itemTotal.toFixed(2)}</p>
      <button class="remove-btn" data-id="${item.id}">Remove</button>
      <hr />
    `;

    cartItemsContainer.appendChild(itemElem);
  });

  cartTotalElem.textContent = `Total: $${total.toFixed(2)}`;

  // Add event listeners for remove buttons
  const removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const idToRemove = button.getAttribute('data-id');
      cart = cart.filter(item => item.id !== idToRemove);
      localStorage.setItem('cart', JSON.stringify(cart));
      location.reload(); // Refresh the page to update cart display
    });
  });
});
