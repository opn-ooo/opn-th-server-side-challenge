import { Discounts, Products, Promotions } from "./mock.js";

export class CartService {
  id = Math.random();
  products = [];
  discount = [];
  freebies = [];

  constructor() {}

  isExist(productId) {
    const exist = !!this.products.find(
      (product) => product.productId === productId
    );
    console.log(`> Is product ${productId} exist: ${exist}`);
    return exist;
  }

  isCartEmpty() {
    const isEmpty = this.products.length === 0;
    console.log(`> Is cart empty: ${isEmpty}`);
    return isEmpty;
  }

  getProductList() {
    console.log(`-> Get product list`);
    return [...this.products, ...this.freebies];
  }

  getProductUniqueCount() {
    console.log(`-> Get product unique count ${this.products.length}`);
    return this.products.length;
  }

  getProductUniqueCountWithFreebie() {
    const count = [...this.products, ...this.freebies].length;
    console.log(`-> Get product unique with freebie count ${count}`);
    return count;
  }

  getAllQty() {
    const qty = this.products.reduce((acc, curr) => {
      return acc + curr.qty;
    }, 0);
    console.log(`-> Get all product qty ${qty}`);
    return qty;
  }

  getAllQtyWithFreebie() {
    const qty = [...this.products, ...this.freebies].reduce((acc, curr) => {
      return acc + curr.qty;
    }, 0);
    console.log(`-> Get all product qty with freebies ${qty}`);
    return qty;
  }

  addProduct(productId, qty) {
    const product = Products.find((p) => p.productId === productId);
    if (!product) {
      console.log(`# Product ${productId} not found`);
      return;
    }
    console.log(`+ Update product ${productId} with ${qty} qty`);
    const existIdx = this.products.findIndex((p) => p.productId === productId);
    const totalAmount =
      Products.find((p) => p.productId == productId).price * qty;

    this.addFreebie(productId, qty);

    if (existIdx > -1) {
      this.products[existIdx].qty = qty;
      this.products[existIdx].totalAmount = totalAmount;
    } else {
      this.products.push({
        productId,
        qty,
        totalAmount,
      });
    }
  }

  removeProduct(productId) {
    const productIndex = this.products.findIndex(
      (p) => p.productId === productId
    );
    if (productIndex < 0) {
      console.log(`# Product ${productId} not found inside Cart`);
      return;
    }
    console.log(`- Remove product ${productId} from cart`);
    this.products.splice(productIndex, 1);
    this.removeFreebieWithProductId(productId);
  }

  destroy() {
    console.log("- Destroy cart!!");
    this.products = [];
    this.freebies = [];
    this.discount = [];
  }

  getTotalAmount() {
    const total = this.products.reduce(
      (acc, curr) => acc + curr.totalAmount,
      0
    );
    return total;
  }

  getTotalPrice() {
    const totalAmount = this.getTotalAmount();
    console.log(`-> Total amount is: ${totalAmount}`);
    const totalDiscount = this.getTotalDiscount();
    console.log(`-> Total price is: ${totalAmount - totalDiscount}`);
    return totalAmount - totalDiscount;
  }

  getTotalDiscount() {
    if (this.discount.length < 1) {
      return 0;
    }
    const discount = this.discount[0];
    if (discount.type === "fixed") {
      console.log(`-> Total discount is: ${discount.amount}`);
      return discount.amount;
    }

    const totalDiscount = (this.getTotalAmount() * discount.amount) / 100;
    console.log(`-> Total discount is: ${totalDiscount}`);
    return totalDiscount;
  }

  addFreebie(productId, qty) {
    const promotion = Promotions.find((p) => p.productId == productId);
    if (!promotion) return;

    console.log(
      `+ Update freebie ID ${promotion.freebieId} with ${qty} qty from product ID ${productId}`
    );
    const product = Products.find((p) => p.productId === promotion.freebieId);
    const freebieIdx = this.freebies.findIndex(
      (f) => f.productId === promotion.freebieId
    );
    if (freebieIdx > -1) {
      this.freebies[freebieIdx].qty = qty;
    } else {
      this.freebies.push({
        productId: product.productId,
        qty,
      });
    }
  }

  removeFreebieWithProductId(productId) {
    const promotion = Promotions.find((p) => p.productId == productId);
    if (!promotion) return;

    const freebieIdx = this.freebies.findIndex(
      (f) => f.productId === promotion.freebieId
    );
    console.log(
      `- remove freebieId ${promotion.freebieId} from product ${productId}`
    );

    this.freebies.splice(freebieIdx, 1);
  }

  addDiscount(discountId) {
    if (this.discount.length > 0) {
      console.log("# Cannot add discount more than 1 time");
      return;
    }
    const discount = Discounts.find((d) => d.id === discountId);
    if (!discount) {
      console.log("# Discount not found");
      return;
    }
    console.log(`+ Add discount name '${discount.name}'`);
    this.discount.push(discount);
  }

  removeDiscountByName(name) {
    const idx = this.discount.findIndex((d) => d.name === name);
    if (idx < 0) {
      console.log(`# Discount name ${name} is not apply in this cart`);
      return;
    }
    console.log(`> Remove discount name ${name} from cart`);
    this.discount.splice(idx, 1);
  }
}
