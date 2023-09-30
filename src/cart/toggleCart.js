/* ================================= Imports ================================ */

import { getElement } from '../utils.js';

/* -------------------------------------------------------------------------- */

/* ================================ Variables =============================== */

const toggleCartBtn = getElement(`.toggle-cart`);
const closeCartBtn = getElement(`.cart-close`);
const cartOverlay = getElement(`.cart-overlay`);

/* -------------------------------------------------------------------------- */

/* ================================ Event Listeners =============================== */

toggleCartBtn.addEventListener(`click`, () => {
  cartOverlay.classList.add(`show`);
});

closeCartBtn.addEventListener(`click`, () => {
  cartOverlay.classList.remove(`show`);
});

/* -------------------------------------------------------------------------- */

/* ================================ Open Cart =============================== */

export const openCart = () => {
  cartOverlay.classList.add(`show`);
};

/* -------------------------------------------------------------------------- */
