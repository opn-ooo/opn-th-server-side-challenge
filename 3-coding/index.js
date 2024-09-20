import { CartService } from "./cart.service.js";

const s = new CartService();
s.isCartEmpty();
s.isExist(1);

// add product
s.addProduct(10, 10); // product not found
s.addProduct(3, 20);
// add product with promotion
s.addProduct(1, 1); // has freebie promotion
// update product with promotion, freebie qty changed as well
s.addProduct(1, 5);

s.isCartEmpty();
s.isExist(1);
s.isExist(2); // freebie is not count as normal product
console.log(s.getProductList()); // include freebie
s.getTotalPrice();
s.getProductUniqueCount();
s.getProductUniqueCountWithFreebie();
s.getAllQty();
s.getAllQtyWithFreebie();

s.removeProduct(1);
console.log(s.getProductList());

s.getProductUniqueCount();
s.getProductUniqueCountWithFreebie();

// add fixed discount
s.addDiscount(5); // not found
s.addDiscount(1); // fixed type
s.addDiscount(2); // cannot add discount more than 1
s.getTotalPrice();

// remove discount
s.removeDiscountByName("discount_10_percent"); // not found
s.removeDiscountByName("discount_100_coin");
s.removeDiscountByName("discount_100_coin"); // not found
s.getTotalPrice();

s.addDiscount(2); // percentage
s.getTotalPrice(); // 15000

s.destroy();
console.log(s.getProductList());
s.isCartEmpty();
s.getAllQty();
s.getAllQtyWithFreebie();
s.getTotalPrice();
