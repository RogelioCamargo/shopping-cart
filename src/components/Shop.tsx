import React, { useEffect, useState, useCallback } from "react";
import useFetch from "../hooks/useFetch";
import { ShopItem } from "../types";
import ProductList from "./ProductList";

const Shop = () => {
	const result = useFetch("https://fakestoreapi.com/products");
	const [products, setProducts] = useState<ShopItem[]>([]);
	const [cart, setCart] = useState<ShopItem[]>([]);

	useEffect(() => {
		if (result.data) {
			const data = result.data as Array<ShopItem>;
			setProducts(data);
		}
	});

	if (result.loading) return <div>Loading...</div>;
	if (result.error) return <div>{result.error}</div>;

	const addToCart = (product: ShopItem) => {
		setCart((previousState) => [...previousState, product]);
	};

	return (
		<div>
			<h2 className="flex justify-center max-w-2xl lg:max-w-4xl mx-auto text-xl">Cart: {cart.length}</h2>
			<ProductList addToCart={addToCart} products={products} />
		</div>
	);
};

export default Shop;
