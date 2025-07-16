import { CartService } from './cart/cart.service';
import { Discount } from './discount/discount.model';
import { FreebieRule } from './freebie/freebie.model';

// Demo function to showcase cart service functionality
function demonstrateCartService() {
  console.log('=== Cart Service Demonstration ===\n');

  // Create a new cart service
  const cartService = new CartService();

  // Setup freebie rules
  console.log('1. Setting up freebie rules...');
  cartService.addFreebieRule(FreebieRule.create(1, 2, 1, false, 1)); // Buy product 1, get product 2 free
  cartService.addFreebieRule(FreebieRule.create(5, 10, 1, true, 3)); // Buy product 5, get product 10 free (up to 3)
  console.log('Freebie rules added:', cartService.getFreebieRules().length);

  // Add products to cart
  console.log('\n2. Adding products to cart...');
  cartService.addProduct(1, 1); // Premium T-Shirt
  console.log('Added Product 1 (Premium T-Shirt)');
  console.log('Cart items:', cartService.listAllItems());
  console.log('Total amount:', cartService.getTotalAmount());

  // Check if freebie was applied
  console.log('\n3. Checking freebie application...');
  if (cartService.hasProduct(2)) {
    console.log('✅ Freebie Product 2 (Free Socks) was automatically added!');
  }

  // Add more products
  console.log('\n4. Adding more products...');
  cartService.addProduct(3, 2); // Jeans x2
  cartService.addProduct(4, 1); // Sneakers
  console.log('Cart items:', cartService.listAllItems());
  console.log('Total amount:', cartService.getTotalAmount());
  console.log('Total items:', cartService.getTotalItems());
  console.log('Unique items:', cartService.countUniqueItems());

  // Apply discount
  console.log('\n5. Applying discount...');
  const discount = Discount.createPercentageDiscount('SUMMER10', 10, 200); // 10% off, max 200
  const discountResult = cartService.applyDiscount(discount);
  console.log('Discount applied:', discountResult);
  console.log('Final amount after discount:', cartService.getTotalAmount());

  // Test freebie stacking
  console.log('\n6. Testing freebie stacking...');
  cartService.addProduct(5, 1); // Hoodie
  cartService.addProduct(5, 1); // Another Hoodie
  cartService.addProduct(5, 1); // Third Hoodie
  console.log('Cart items after adding Hoodies:', cartService.listAllItems());
  console.log('Product 10 (Free Hat) quantity:', cartService.getCart().getItemQuantity(10));

  // Remove product and check freebie removal
  console.log('\n7. Removing trigger product...');
  cartService.removeProduct(1); // Remove Premium T-Shirt
  console.log('Cart items after removing Product 1:', cartService.listAllItems());
  console.log('Product 2 still in cart:', cartService.hasProduct(2));

  // Final cart summary
  console.log('\n8. Final cart summary:');
  console.log(JSON.stringify(cartService.getCartInfo(), null, 2));

  // Destroy cart
  console.log('\n9. Destroying cart...');
  cartService.destroyCart();
  console.log('Cart empty:', cartService.isCartEmpty());
}

// Run the demonstration
demonstrateCartService(); 