import React, { useEffect } from "react";
import { ShopItem } from "../types";

// eslint-disable-next-line react/display-name
const ProductList = React.memo(
	({
		products,
		addToCart,
	}: {
		products: Array<ShopItem>;
		addToCart: (product: ShopItem) => void;
	}) => {
		useEffect(() => {
			console.log("ProductList");
		});

		return (
			<div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
				<h1 className="sr-only">Products</h1>
				<div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
					{products.map((product: ShopItem) => {
						return (
							<div key={product.id} className="group">
								<div className="w-full h-full md:w-40 md:h-40 aspect-w-1 aspect-h-1 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
									<img
										src={product.image}
										alt={product.title}
										className="w-full h-full object-contain group-hover:opacity-75"
									/>
								</div>
								<h2 className="mt-4 text-sm text-gray-700">{product.title}</h2>
								<p className="my-1 text-md font-medium text-gray-900">
									${product.price}
								</p>
								<button className="p-2 bg-gray-200" onClick={() => addToCart(product)}>Add to Cart</button>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
);

export default ProductList;
