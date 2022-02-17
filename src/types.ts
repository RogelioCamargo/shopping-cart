export interface Rating {
	count: number;
	rate: number;
}

export interface ShopItem {
	id: number;
	title: string;
	image: string;
	price: number;
	description: string;
	category: string;
	rating: Rating;
}