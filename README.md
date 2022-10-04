
# Server-Side Challenge

Welcome to the Opn.Pro (Commerce) Engineering candidate testing area.

## 1. RESTful API
Our commerce services need an interface where it bridges between frontend and data source, so we decided to have a RESTful API where it supports bellowing pages.

#### Pages
- **Registration page** is where new member can start their membership.
  - Fields submitted: email, password, name, date of birth, gender and address, subscribe to newsletter.
- **Profile page** is where we can see their information.
  - Fields to display: email, name, age, gender, address and subscribe to newsletter.
- **Edit profile page** is where members can update their information.
  - Fields allowed to edit: date of birth, gender, address and subscribe to newsletter.
  - Members can delete their account regarding PDPA policy.
- **Password change page** is where members can set their new password by entering current password and following with new password and confirmation.

#### Requirements
- Your program will serve a RESTful API.
- Your API will be called via an HTTP client, e.g.: Postman, curl.
- No need to connect to the database.
- Authentication should be verified from header "Authorization" with mock value e.g.: `Authorization: Bearer faketoken_user1`
- Validation have additional score.

#### Notes
- You will submit with language you are requested to do so.
- Any idea that makes your application better are acceptable.

## 2. Database
Design a database contains tables that support bellowing requirements.

#### Requirements
- As a store owner, I'd like to save customer information, so I can track age, gender and location for analysis purpose.
- As a store owner, I'd like to have a list of products, so my customers can browse and discover my collections.
  - Each product can be listed in categories.
  - Each product has different and multiple variation which can be color, size or anything.
- As a store owner, I would like my customers to be able to add items to cart, so they can process to check out.

#### Notes
- Your design can be detailed as much as you want.
- Any format of the design are acceptable, example: TXT, MD, SQL, JSON or any visual diagram as long as you can explain.

## 3. Coding
Write a service called `Cart` which serve usage listed below.

**Basic** - Cart service that can manage items.

```javascript
// Create cart object
cart = Cart.create(customer_id)

// Add or increase item quantity in cart by product id.
cart.add(product_id, quantity)

// Replace item quantity or remove item from cart by product id.
cart.update(product_id, quantity)

// Delete item from cart by product id.
cart.remove(product_id)

// Delete cart object.
cart.destroy()
```

**Utilities** - Functions that save consumers effort.

```javascript
// Check id product is already in cart, boolean returned.
has = cart.has(product_id)

// Check if cart contains any items, boolean returned.
isEmpty = cart.isEmpty()

// Display list of items and quantity, json returned.
count = cart.count()

// Get number of different items, int returned.
quantity = cart.quantity()

// Get amount of total items, int returned.
total = cart.total()
```

**Discount** - Sometimes customer apply coupon or voucher.
- `addDiscount` - Apply a promotion to cart that effect directly to `total`
  - Accept 2 parameters
    - `name` - An identifier.
    - `discount` - A parameters to be calculated.
        - Case1: Deduct 50.- total
            - `{type: "fixed", amount: 50}`
        - Case2: Deduct 10% from total but not over 100.-
            - `{type: "percentage", amount: 10, max: 100}`
- `removeDiscount` - Remove promotion by name.

```javascript
discount = {type: "percentage", amount: 10, max: 100}

total = cart.total() // 2500

cart.addDiscount(name, discount)
total = cart.total() // 2400

cart.removeDiscount(name);
total = cart.total() // 2500
```

**Freebie** - "Buy A get B for free!"
- `addFreebie` - Apply a promotion to cart that effect directly to `items`
  - Accept 3 parameters
    - `name` - An identifier.
    - `condition` - A valiation rule cart should applied to get reward.
    - `reward` - A return if cart applied to condition

```javascript
cart.add(1, 1)

condition = {type: "contains", product_id: 1}
reward = {product_id: 2, quantity: 1}
cart.addFreebie(name, condition, reward)

cart.has(2) // true
cart.count() // 2
```

#### Requirements
- Your code should be executable on console or unit test.
- No need to connect to any storage or database.
- Validation is not required.
- Negative cases have additional score.

#### Notes
- You will submit with language you are requested to do so.

## 4. Solution Architecture
Design microservices architecture for MVP Instagram-like mobile application which supports bellowing features.

#### Features
- Content uploading - Photo and video should be resized and reformatting
- Feeds - Sort the selected content to each user
- Interaction - Like and comment at content also notify the content owner
- Messaging - Generic chat system
- Notification - Notify user on their phone and email
- Analytics - Report content's view and interaction daily and send to owner email

#### Requirements
- You need to consider the time-to-market as first priority, following with cost and extensibility.
- Your architecture can contain real service provider, e.g.: AWS, GCP, Firebase etc.
- The diagram should come with pros, cons, risks and extensibility.

#### Notes
- You are required to present this to the Engineering/Project/Business/Product/QA Team.
