import { Injectable } from '@nestjs/common';

class Message {
  message: string;
  cart?: any;
}

@Injectable()
export class CartService {
  private carts = {};
  private discounts = {};

  create(customerId: string) {
    if (!!this.carts[customerId]) {
      return this.returnMessage('This customer already have cart in system');
    }
    this.carts[customerId] = [];
    return this.returnMessage(`Create user id=${customerId} success !`);
  }

  addProduct(customerId: string, productId: string, quantity: number) {
    if (!this.carts[customerId]) {
      return this.returnMessage('Cart not found');
    }
    if (this.carts[customerId].length > 0) {
      const index = this.carts[customerId].findIndex((ele) => {
        return ele.product_id === productId;
      });
      if (index !== -1) {
        return this.returnMessage(
          'This product is already put on cart. If you want to modify, plese call other RESTapi ',
        );
      }
    }
    const newItem = {
      product_id: productId,
      quantity,
    };
    this.carts[customerId].push(newItem);
    return this.returnMessage(
      `Add Product id=${productId} success !`,
      this.carts,
    );
  }

  updateProduct(customerId: string, productId: string, quantity: number) {
    if (!this.carts[customerId]) {
      return this.returnMessage('Cart not found');
    }
    const index = this.carts[customerId].findIndex(
      (ele) => ele.product_id === productId,
    );
    if (index !== -1) {
      this.carts[customerId][index].quantity = quantity;
    } else {
      return this.returnMessage('Product not found in cart');
    }
    return this.returnMessage(
      `Update Product id=${productId} success !`,
      this.carts[customerId],
    );
  }

  removeProduct(customerId: string, productId: string) {
    if (!this.carts[customerId]) {
      return this.returnMessage('Cart not found');
    }
    const index = this.carts[customerId].findIndex(
      (ele) => ele.product_id === productId,
    );
    if (index !== -1) {
      this.carts[customerId].splice(index, 1);
    } else {
      return this.returnMessage('Product not found in cart');
    }
    return this.returnMessage(`Delete Product id=${productId} success !`);
  }

  destroy(customerId: string) {
    delete this.carts[customerId];
    return this.returnMessage(
      `Success for deleting the carts from customerId=${customerId}`,
    );
  }

  has(customerId: string, productId: string): boolean {
    const index = this.carts[customerId].findIndex(
      (ele) => ele.product_id === productId,
    );
    return !!this.carts[customerId] && index !== -1;
  }

  isEmpty(customerId: string): boolean | any {
    if (!this.carts[customerId]) {
      return this.returnMessage(
        `You don't create the cart of customerId=${customerId} yet`,
      );
    }
    return Object.keys(this.carts[customerId]).length === 0;
  }

  count(customerId: string): any {
    return {
      carts: this.carts[customerId],
    };
  }

  quantity(customerId: string): number {
    return Object.keys(this.carts[customerId] || {}).length;
  }

  total(customerId: string): number {
    let sum = 0;
    const cart = this.carts[customerId] || [];
    for (const key of cart) {
      sum += key.quantity;
    }
    return sum;
  }

  addDiscount(
    customerId: string,
    name: string,
    type: string,
    amount: number,
    max?: number,
  ) {
    let discountList = {};
    if (!this.discounts[customerId]) {
      this.discounts[customerId] = [];
    }
    if (type === 'fixed') {
      discountList = {
        name,
        type,
        amount,
      };
    } else {
      discountList = { name, type, amount, max };
    }
    this.discounts[customerId].push(discountList);
    return this.returnMessage(`Successful for add discount name=${name}`);
  }

  removeDiscount(customerId: string, name: string) {
    const index = this.discounts[customerId].findIndex(
      (ele) => name === ele.name,
    );
    if (index !== -1) {
      this.discounts[customerId].splice(index, 1);
    }
  }

  totalWithPrice(customerId: string): number | Message {
    let sum = 0;
    if (!this.carts[customerId]) {
      return this.returnMessage('Cart not found');
    }
    const cart = this.carts[customerId] || {};
    for (const key of cart) {
      let price = 100 * key.product_id; // set price of product is equal productId multiply by 100
      price *= key.quantity;
      sum += price;
    }

    // Apply discount if exists
    if (this.discounts[customerId]) {
      // for more than one
      const discount = this.discounts[customerId];
      for (const key of discount) {
        const { type, amount, max } = key;
        if (type === 'percentage') {
          const discountAmount = Math.min(
            sum * (amount / 100),
            sum * (max / 100),
          );
          sum -= discountAmount;
        } else if (type === 'fixed') {
          sum -= amount;
        }
      }
    }
    if (sum <= 0) {
      return this.returnMessage(`You can not have minus value of total price`);
    }
    return sum;
  }

  addFreebie(customerId: string, name: string, condition: any, reward: any) {
    let cart = this.carts[customerId];
    if (condition.type === 'contains') {
      const index = cart.findIndex(
        (ele) => {
          return ele.product_id === condition.product_id.toString()}
      );
      if (index !== -1) {
        cart.push(reward);
      } else {
        return this.returnMessage(`This promotion was not added to this cart because the specified conditions were not met`);
      }
    }
    this.carts[customerId] = cart;
    return this.returnMessage(`The promotion {${name}} is in the cart`);
  }

  private returnMessage(message: string, object?: any) {
    return {
      message,
      carts: object,
    };
  }
}
