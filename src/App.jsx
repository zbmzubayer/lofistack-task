import { useState } from "react";
import { getCartItems } from "./data";
import CartItem from "./components/CartItem";

function App() {
  const [cartItems, setCartItems] = useState(getCartItems());

  const handleQuantityChange = (id, quantity) => {
    // Ensure quantity is between 1 and 10
    const validQuantity = Math.max(1, Math.min(10, quantity));

    // Update the quantity of the selected item and its free item if exists
    const selectedItem = cartItems.find((item) => item.id === id);
    let updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: validQuantity };
      }
      if (item.id === selectedItem.freeItemId) {
        return { ...item, quantity: validQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  // Remove item from cart and its free item if exists
  const handleRemoveItem = (id, freeItemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id && item.id !== freeItemId)
    );
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const salesTax = subtotal * 0.1; // Assuming a 10% sales tax

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="mb-8 text-center text-2xl font-semibold text-gray-800">
        Your Cart ({cartItems.length} items)
      </h1>
      <div className="mb-8">
        <div className="mb-4 grid grid-cols-12 gap-4 text-sm font-medium text-gray-500">
          <div className="col-span-6">Item</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-2 text-right">Total</div>
        </div>

        <div className="space-y-6">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                product={item}
                onQuantityChange={handleQuantityChange}
                onRemoveItem={handleRemoveItem}
              />
            ))
          ) : (
            <div className="text-gray-500">
              Your cart is empty. Start shopping!
            </div>
          )}
        </div>
      </div>
      <div className="max-w-md ml-auto w-full">
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600 font-medium">Subtotal:</span>
            <span className="text-gray-700">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600 font-medium">Sales Tax:</span>
            <span className="text-gray-700">${salesTax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600 font-medium">Coupon Code:</span>
            <button className="text-gray-400 underline underline-offset-2">
              Add Coupon
            </button>
          </div>

          <div className="border-gray-200 pt-4 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Grand total:</span>
              <span className="text-2xl font-semibold">
                ${(subtotal + salesTax).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="inline-flex items-center justify-center bg-black text-white py-2 px-4">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
