// All products
export const PRODUCTS = [
  {
    id: 1,
    name: "Pi Pizza Oven",
    description: "A compact and efficient pizza oven",
    price: 23.99,
    imageUrl: "/pi-pizza-oven.png",
    freeItemId: 3,
  },
  {
    id: 2,
    name: "Grill Ultimate Bundle",
    description: "Description of Product 2",
    price: 19.99,
    imageUrl: "/grill-ultimate-bundle.png",
    freeItemId: 4,
  },
  {
    id: 3,
    name: "Starters",
    description: "Description of Product 3",
    price: 3.99,
    imageUrl: "starters.png",
    freeItemId: null,
  },
  {
    id: 4,
    name: "Charcoal Grill Pack",
    description: "Description of Product 4",
    price: 4.99,
    imageUrl: "/charcoal.png",
    freeItemId: null,
  },
];

// Assuming these are the IDs of the products in the cart
const cartItemIds = [1, 2];

// This function filters the PRODUCTS array to get the items in the cart
export const getCartItems = () => {
  const cartItems = PRODUCTS.filter((product) =>
    cartItemIds.includes(product.id)
  ).map((item) => ({
    ...item,
    quantity: 1,
  }));

  // If product has free item, add it to cart and set the quantity to 1 and price to 0
  const freeItems = cartItems
    .filter((item) => item.freeItemId)
    .map((item) => {
      const freeProduct = PRODUCTS.find(
        (product) => product.id === item.freeItemId
      );
      if (freeProduct) {
        return {
          ...freeProduct,
          quantity: 1,
          price: 0,
        };
      }
    });

  return [...cartItems, ...freeItems];
};
