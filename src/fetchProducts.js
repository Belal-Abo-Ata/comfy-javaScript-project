/* ================================= Import Modules================================ */

import { allProductsUrl } from './utils.js';

/* -------------------------------------------------------------------------- */

/* ================================ Functions =============================== */

const fetchProducts = async () => {
  const response = await fetch(allProductsUrl, {
    method: 'GET',
    mode: 'cors',
  });
  try {
    const data = await response.json();
    if (!data) {
      throw new Error('There was an error while fetching the product');
    }
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

/* -------------------------------------------------------------------------- */

/* ================================= Exprots ================================ */

export default fetchProducts;

/* -------------------------------------------------------------------------- */
