// Carousel scroll buttons logic
    const container = document.querySelector('.carousel-container');
    const leftBtn = document.getElementById('carousel-left');
    const rightBtn = document.getElementById('carousel-right');
    const scrollAmount = 300;

    leftBtn.addEventListener('click', () => {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', () => {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Smooth scroll for Start Exploring button
    document.getElementById('start-exploring-btn').addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.getElementById('featured-listings');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
    document.getElementById('browseBtn').addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.getElementById('featured-listings');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
    document.getElementById('aboutBtn').addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.getElementById('container3');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
    document.getElementById('contactBtn').addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.getElementById('container3');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });

    document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.btn-eco').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'buy.html';
      });
    });
  });

  // LOGIN DATABASE
  form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert('Please enter both email and password.');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      // Save user info in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);

      window.location.href = 'dashboard.html';
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert('Server error. Try again later.');
  }
});
// Check login status
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

// Add to cart
function addToCart(product) {
  const user = getCurrentUser();
  if (!user) {
    alert("Please login to add items to cart!");
    window.location.href = "login.html";
    return;
  }

  const cartKey = `cart_${user.email}`;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  // Check if item already in cart
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  alert(`${product.name} added to your cart!`);
}

// Example: hook add-to-cart buttons
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const product = {
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: parseFloat(btn.dataset.price),
        image: btn.dataset.image
      };
      addToCart(product);
    });
  });
});
// Example: hook add-to-cart buttons
