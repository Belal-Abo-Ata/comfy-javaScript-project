/* ================================= Imports ================================ */
// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';

//  filter imports
import setupSearch from '../filters/search.js';
import setupCompanies from '../filters/companies.js';
import setupPrice from '../filters/price.js';

// specific imports
import { store, setupStore } from '../store.js';
import display from '../displayProducts.js';
import { getElement } from '../utils.js';

// fetch products
import fetchProducts from '../fetchProducts.js';

/* -------------------------------------------------------------------------- */

/* ================================ Functions =============================== */

async function init() {
  const loading = getElement(`.page-loading`);
  if (store.length < 1) {
    const products = await fetchProducts();
    console.log(products);
    setupStore(products);
  }
  console.log(store);

  display(store, getElement('.products-container'));

  setupSearch(store);
  setupCompanies(store);
  setupPrice(store);
  loading.style.display = 'none';
}

// Call Functions
init();

/* -------------------------------------------------------------------------- */
