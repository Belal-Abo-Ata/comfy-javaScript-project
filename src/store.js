/* ================================= Imports ================================ */

import { getStorageItem, setStorageItem } from './utils.js';

/* -------------------------------------------------------------------------- */

/* =============================== Store Setup ============================== */

let store = getStorageItem('store-start');
function setupStore(products) {
  store = products.map(product => {
    const {
      id,
      fields: { featured, name, price, company, colors, image: img },
    } = product;
    const image = img[0].thumbnails.large.url;
    return { id, featured, name, price, company, colors, image };
  });
  setStorageItem('store-start', store);
}
const findProduct = id => {
  let product = store.find(product => product.id === id);
  return product;
};

/* -------------------------------------------------------------------------- */

/* ================================= Exports ================================ */

export { store, setupStore, findProduct };

/* -------------------------------------------------------------------------- */
