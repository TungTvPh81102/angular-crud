export interface IProduct {
    id: number | string;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
    published: boolean;
    description: string;
    in_stock: boolean;
}