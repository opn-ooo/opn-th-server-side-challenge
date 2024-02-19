export class Cart {
    user_id : number;
    cart: CartItem[]
}

class CartItem {
    product_id: number;
    quantity: number;
    price: number
}
