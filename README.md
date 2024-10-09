
# Server-Side Challenge

Welcome to the Opn.Pro (Commerce) Engineering candidate testing area.

**Please note that:**
- We prefer to accept your assignment via GitHub or a similar platform.
- Please be prepared to present your code and code review with the interviewer.

## 1. RESTful API
Our commerce services need an interface where it bridges between frontend and data source, so we decided to have a RESTful API where it supports following pages.

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
- Our expectation regarding this topic is to observe how you implement the RESTful API project.
- You will submit with language you are requested to do so. (detault=node.js)
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
- Our expectation regarding this topic is to observe how familiar you are with the database.
- Your design can be detailed as much as you want.
- Any format of the design are acceptable, example: TXT, MD, SQL, JSON or any visual diagram as long as you can explain.

## 3. Coding
Write a service called `Cart` which serve usage listed below.

**Basic** - Cart service that can manage items.
- Cart can be created
- Product can be added to cart via product id
- Cart can be updated via product id. This update must be an absolute update
  - i.e. updating product id `1` with quantity of `10` will update the cart product id `1` in cart to quantity of `10`
- Product can be remove from cart via product id
- Cart can be destroy

**Utilities** - Functions that save consumers effort.
- Can check if product already exists
- Can check if cart is empty
- Can list all items in cart
- Can count number of unique items in cart
- Can return the total amount of items in cart

**Discount** - Sometimes customer apply coupon or voucher.
- Discount should be apply to cart which directly changes the total amount of the cart
- Discount should have a `name` identifier
- Discount should be calculated as
  - `fixed` where cart is deducted according to the discounted amount
  - `percentage` where cart is deducted as a percentage from the total amount but not exceeding the maximum set with the discount.
    - A cart with the total of 2,000 THB with a 10% discount and maximum of 100 THB will only apply 100 THB discount.
- Should be able to remove discount by `name`

**Freebie** - "Buy A get B for free!"
- Freebie should be able to be apply to the cart with the following conditions
  - If a cart contains the a product then add freebie product into the cart
    - i.e. if a cart contain product `1` then add product `2` with quantity `1` to the cart

#### Requirements
- Your code should be executable on console or unit test.
- No need to connect to any storage or database.
- Validation is not required.
- Negative cases have additional score.

#### Notes
- Our expectation for this topic is to assess your coding skills.
- You will submit with language you are requested to do so (default=nodejs).
- Bonus consideration for OOP

## 4. Solution Architecture
Design microservices architecture for MVP Instagram-like mobile application which supports following features.

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
- Our expectation for this topic is to evaluate your architectural skills.
- You are required to present this to the Engineering/Project/Business/Product/QA Team.
