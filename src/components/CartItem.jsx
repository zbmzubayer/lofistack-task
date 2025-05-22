import { XIcon } from "lucide-react";
import { MinusIcon } from "lucide-react";
import { PlusIcon } from "lucide-react";

export default function CartItem({ product, onQuantityChange, onRemoveItem }) {
  const total = (product.price * product.quantity).toFixed(2);

  return (
    <div className="grid grid-cols-12 gap-4 border-b-2 pb-2 border-gray-100">
      <div className="col-span-6 flex gap-4">
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-contain object-center"
          />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.description}</p>
        </div>
      </div>
      <div className="col-span-2 flex items-center justify-center">
        ${product.price}
      </div>

      <div className="col-span-2 flex justify-center">
        <div className="inline-flex items-center">
          {product.price > 0 && (
            <button
              className="p-1 cursor-pointer border-2 inline-flex items-center justify-center rounded-l-md hover:bg-gray-200"
              onClick={() => onQuantityChange(product.id, product.quantity - 1)}
            >
              <MinusIcon className="size-4" />
            </button>
          )}
          <div
            className={`px-5 border-y-2 border-black ${
              product.price === 0 && "text-gray-300"
            }`}
          >
            {product.quantity}
          </div>
          {product.price > 0 && (
            <button
              className="p-1 cursor-pointer border-2 inline-flex items-center justify-center rounded-r-md hover:bg-gray-200"
              onClick={() => onQuantityChange(product.id, product.quantity + 1)}
            >
              <PlusIcon className="size-4" />
            </button>
          )}
        </div>
      </div>

      <div className="col-span-2 flex items-center justify-end gap-2">
        <div className="font-medium">${total}</div>
        {product.price > 0 && (
          <button
            className="p-0.5 cursor-pointer inline-flex justify-center items-center bg-gray-300 rounded-full"
            onClick={() => onRemoveItem(product.id, product.freeItemId || null)}
          >
            <XIcon className="size-2.5 " />
          </button>
        )}
      </div>
    </div>
  );
}
