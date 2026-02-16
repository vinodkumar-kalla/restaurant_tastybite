// Wait until page loads
document.addEventListener("DOMContentLoaded", function () {

    // ================= VARIABLES =================
  
    let loginModal = document.getElementById("loginModal");
    let loginBtn = document.getElementById("loginBtn");
    let loginHeaderBtn = document.getElementById("loginHeaderBtn");
  
    let cartItems = document.getElementById("cartItems");
    let totalSpan = document.getElementById("total");
    let clearCartBtn = document.getElementById("clearCart");
    let checkoutBtn = document.getElementById("checkoutBtn");
  
    let isLoggedIn = false;
    let currentUser = "";
  
    let cart = [];
    let total = 0;
  
    // ================= HEADER LOGIN =================
  
    loginHeaderBtn.addEventListener("click", function () {
  
      if (!isLoggedIn) {
        loginModal.style.display = "block";
      } else {
  
        // Logout
        isLoggedIn = false;
        currentUser = "";
  
        loginHeaderBtn.innerText = "Login";
  
        alert("Logged out successfully!");
  
      }
  
    });
  
    // ================= LOGIN =================
  
    loginBtn.addEventListener("click", function () {
  
      let username = document.getElementById("username").value.trim();
      let password = document.getElementById("password").value.trim();
      let loginMsg = document.getElementById("loginMsg");
  
      if (username === "" || password === "") {
  
        loginMsg.style.color = "red";
        loginMsg.innerHTML = "❌ Please enter username and password";
        return;
  
      }
  
      if (password.length < 4) {
  
        loginMsg.style.color = "red";
        loginMsg.innerHTML = "❌ Password must be at least 4 characters";
        return;
  
      }
  
      // Login success
      isLoggedIn = true;
      currentUser = username;
  
      loginHeaderBtn.innerText = "Logout";
  
      loginMsg.style.color = "green";
      loginMsg.innerHTML = "✅ Welcome, " + username;
  
      setTimeout(function () {
  
        loginModal.style.display = "none";
        loginMsg.innerHTML = "";
  
      }, 800);
  
    });
  
    // ================= CART =================
  
    window.addToCart = function (name, price) {
  
      cart.push({ name, price });
      total += price;
  
      updateCart();
  
    };
  
    function updateCart() {
  
      cartItems.innerHTML = "";
  
      cart.forEach((item, index) => {
  
        let li = document.createElement("li");
  
        li.innerHTML = `
          ${item.name} - ₹${item.price}
          <button onclick="removeItem(${index})">❌</button>
        `;
  
        cartItems.appendChild(li);
  
      });
  
      totalSpan.innerText = total;
  
    }
  
    window.removeItem = function (index) {
  
      total -= cart[index].price;
  
      cart.splice(index, 1);
  
      updateCart();
  
    };
  
    clearCartBtn.addEventListener("click", function () {
  
      cart = [];
      total = 0;
  
      updateCart();
  
    });
  
    // ================= CHECKOUT =================
  
    checkoutBtn.addEventListener("click", function () {
  
      if (!isLoggedIn) {
        alert("Please login first!");
        loginModal.style.display = "block";
        return;
      }
  
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }
  
      let address = prompt("Enter your delivery address:");
  
      if (address === null || address.trim() === "") {
        alert("Address is required!");
        return;
      }
  
      alert(
        "✅ Order Confirmed!\n\n" +
        "Customer: " + currentUser + "\n" +
        "Address: " + address + "\n" +
        "Total: ₹" + total
      );
  
      // Clear cart after order
      cart = [];
      total = 0;
      updateCart();
  
    });
  
  });
  