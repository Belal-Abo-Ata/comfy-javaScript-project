/* ================================= Imports ================================ */

import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';

/* -------------------------------------------------------------------------- */

/* ================================ Variables =============================== */

const cartItemCountDOM = getElement(`.cart-item-count`);
const cartItemsDOM = getElement(`.cart-items`);
const cartTotalDOM = getElement(`.cart-total`);

let cart = getStorageItem(`cart-start`);

/* -------------------------------------------------------------------------- */

/* ================================ Functions =============================== */

export function addToCart(id) {
  let item = cart.find(cartItem => cartItem.id === id);
  if (!item) {
    // Find the item & add it into the cart
    let product = findProduct(id);
    product = { ...product, amount: 1 };
    cart = [...cart, product];
    addToCartDOM(product);
  } else {
    // Update the cart
    const amount = increaseAmount(id);
    const items = [...cartItemsDOM.querySelectorAll(`.cart-item-amount`)];
    const newAmount = items.find(value => value.dataset.id === id);
    newAmount.textContent = amount;
  }
  // add one to the item count
  displayCartItemCount();
  // display cart totals
  displayCartTotal();
  // set cart in local storage

  setStorageItem('cart-start', cart);
  //more stuff coming up
  openCart();
}

function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount);
  }, 0);
  cartItemCountDOM.textContent = amount;
}

function displayCartTotal() {
  const total = cart.reduce((total, cartItem) => {
    return (total += cartItem.price * cartItem.amount);
  }, 0);
  cartTotalDOM.textContent = `Total: ${formatPrice(total)}`;
}

function displayCartItemsDOM() {
  cart.forEach(cartItem => addToCartDOM(cartItem));
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
}

function increaseAmount(id) {
  let newAmount;
  cart = cart.map(cartItem => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

function decreaseAmount(id) {
  let newAmount;
  cart = cart.map(cartItem => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

function setupCartFunctionality() {
  cartItemsDOM.addEventListener('click', function (e) {
    const element = e.target;
    const parent = e.target.parentElement;
    const id = e.target.dataset.id;
    const parentID = e.target.parentElement.dataset.id;
    // remove
    if (element.classList.contains('cart-item-remove-btn')) {
      removeItem(id);
      // parent.parentElement.remove();
      element.parentElement.parentElement.remove();
    }
    // increase
    if (parent.classList.contains('cart-item-increase-btn')) {
      const newAmount = increaseAmount(parentID);
      parent.nextElementSibling.textContent = newAmount;
    }
    // decrease
    if (parent.classList.contains('cart-item-decrease-btn')) {
      const newAmount = decreaseAmount(parentID);
      if (newAmount === 0) {
        removeItem(parentID);
        parent.parentElement.parentElement.remove();
      } else {
        parent.previousElementSibling.textContent = newAmount;
      }
    }
    displayCartItemCount();
    displayCartTotal();
    setStorageItem('cart', cart);
  });
}

function init() {
  // display amount of cart items
  displayCartItemCount();
  // display total
  displayCartTotal();
  // add all cart items to the dom
  displayCartItemsDOM();
  // setup cart functionality
  setupCartFunctionality();
}
init();

/* -------------------------------------------------------------------------- */
