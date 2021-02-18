import axios from "axios";
import Noty from "noty";
const { initAdmin } = require("./admin");

// Selecting Add-To-Cart Button
let addToCart = document.querySelectorAll(".add-to-cart");
// Selecting Nav Cart Counter
let cartCounter = document.querySelector(".cart-counter");

// Updating Cart
function updateCart(food) {
  // Ajax Call
  axios
    .post("/update-cart", food)
    .then((res) => {
      cartCounter.innerText = res.data.totalQty;
      new Noty({
        type: "success",
        timeout: 1000,
        text: "New  Item  Added  To  Your  Cart",
        progressBar: false,
      }).show();
    })
    .catch((err) => {
      new Noty({
        type: "error",
        timeout: 1000,
        text: "Something Went Wrong",
        progressBar: false,
      }).show();
    });
}

// Button Action
addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let food = JSON.parse(btn.dataset.food);
    updateCart(food);
  });
});

// Remove alert after 2 secs
const alertMsg = document.querySelector("#success-alert");
if (alertMsg) {
  setTimeout(() => {
    alertMsg.remove();
  }, 2000);
}
initAdmin();
