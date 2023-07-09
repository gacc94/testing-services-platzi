import {faker, fakerES} from "@faker-js/faker";
import {Product} from "../interfaces/product.interface";

export const generateOneProduct = (): Product => {
    const {commerce, datatype, image} = fakerES
    const {productDescription} = commerce
    return {
        id: commerce.product(),
        title: commerce.productName(),
        price: parseInt(commerce.price(), 10),
        description: productDescription(),
        category: {
            id: Number(commerce.product()),
            name: commerce.department()
        },
        images: [
            image.url(),
            image.url(),
        ]
    }
}


export const generateManyProducts = (size: number = 10): Product[] => {
    const products: Product[] = []
    for(let i: number = 0; i < size; i++) {
        products.push(generateOneProduct());
    }

    return [...products];
}
