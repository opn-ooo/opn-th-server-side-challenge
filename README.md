
# Server-Side Challenge

Welcome to the Opn.Pro (Commerce) Engineering candidate testing area.

## 1. RESTful API
Our commerce services need an interface where it bridges between frontend and data source, so we decided to have a RESTful API where it supports bellowing pages.

#### Pages
- **Registration page** is where new member can start their membership.
  - Fields submitted: email, password, name, date of birth, gender and address, accept notification (check box).
- **Profile page** is where we can see their information.
  - Fields to display: email, name, age, gender, address and accept notification.
- **Edit profile page** is where members can update their information.
  - Fields allowed to edit: date of birth, gender, address and accept notification.
  - Members can delete their account regarding PDPA policy.
- **Password change page** is where members can set their new password by entering current password and following with new password and confirmation.

#### Requirements
- Your program will serve a RESTful API.
- Your code must be access over HTTP client, e.g.: Postman, curl.
- No need to connect to the database.
- Validation is optional.
- Please skip the authentication and authorization.

#### Notes
- You will submit with language you are requested to do so.

## 2. Coding style (Experienced Level)
As an experienced developer, your code should be readable, flexible, maintainable also extensible. We would like you to compose lines of codes that related to following documents.

**Basic** - Cart service that can manage items.
```javascript
cart = Cart.create(customer_id)
cart.add(product_id, quantity)
cart.update(product_id, quantity)
cart.remove(product_id)
cart.destroy()
```

**Utilities** - Functions that save consumers effort.
```javascript
has = cart.has(product_id)
isEmpty = cart.isEmpty()
count = cart.count() // get number of different items
quantity = cart.quantity() // get amount of items
total = cart.total()
```

**Discount** - Sometimes customer apply coupon or voucher.
```javascript
cart.addDiscount(name, {type: "fixed", amount: "50"})
cart.addDiscount(name, {type: "percentage", amount: "10", max: 100})
cart.removeDiscount(name);
```

**Freebie** - "Buy A get B for free!"
```javascript
condition = {type: "contains", product_id: 1}
reward = {product_id: 2, amount: 1}
cart.addFreebie(name, condition, reward)
```

#### Requirements
- Your code should be executable on console or unit test.
- No need to connect to any storage or database.
- Validation is not required.
- Negative cases have additional score.

#### Notes
- You will submit with language you are requested to do so.

## 3. Database
Design a database contains tables that support bellowing requirements.

#### Requirements
- As a PO, I'd like to save customer information, so I can track age, gender and location for analysis purpose.
- As a PO, I'd like to have a list of products, so my customers can browse and discover my collections.
  - Each product can be listed in categories.
  - Each product has different and multiple variation which can be color, size or anything.
- As a PO, I would like customers to be able to add items to cart, so they can process to check out.

#### Notes
- Your design can be detailed as much as you want.
- Any format of the design are acceptable, example: TXT, MD, SQL, JSON or any visual diagram as long as you can explain.

## 4. Solution Architecture (Experienced Level)
Design microservices architecture for MVP Instagram-like mobile application which supports bellowing features.

#### Features
- Content uploading - Photo and video should be resized and reformatting
- Feeds - Sort the selected content to each user
- Interaction - Like and comment at content also notify the content owner
- Messaging - Generic chat system
- Notification - Notify user on their phone and email
- Analytics - Report content's view and interaction daily

#### Requirements
- You need to consider the time-to-market as first priority, following with cost and extensible.
- Your architecture can contain real service provider, e.g.: AWS, GCP, Firebase etc.
- The diagram should come with pros, cons, risks and extensible.

#### Notes
- You are required to present this to the Engineering/Project/Business/Product/QA Team.
