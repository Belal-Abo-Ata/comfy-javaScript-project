// ====== Imports =======
import { getElement } from './utils.js';

// ------------------------------

// ====== Select Elements =======
const sidebar = getElement(`.sidebar-overlay`);
const toggleNav = getElement(`.toggle-nav`);
const closeSidebar = getElement(`.sidebar-close`);

// ------------------------------

// ====== Event Listener =======

// Show the sidebar
toggleNav.addEventListener(`click`, () => {
  sidebar.classList.add(`show`);
});

// Hide the sidebar
closeSidebar.addEventListener(`click`, () => {
  sidebar.classList.remove(`show`);
});

// ------------------------------
