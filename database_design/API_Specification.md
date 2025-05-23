| **Collection**    | **Endpoint**                      | **Method** | **Description**                         |
| ------------- | --------------------------------- | ---------- | --------------------------------------- |
| **users**      | `/users/register`             | POST       | Register a new user                     |
|               | `/users/login`                | POST       | Login existing user                     |
|               | `/users/profile`              | GET        | Get current user profile                |
|               | `/users/:id`                  | PUT        | Update user profile (name, email, etc.) |
|               | `/users`                      | GET        | (Admin) List all users                  |
|               | `/users/:id`                  | DELETE     | (Admin) Delete user                     |
| **admin**     | `/admin/login`                | POST       | Admin login                             |
|               | `/admin/dashboard`            | GET        | (Optional) Admin dashboard data         |
| **products**   | `/products`                   | GET        | List all products                       |
|               | `/products/:id`               | GET        | Get product by ID                       |
|               | `/products`                   | POST       | Create new product (admin only)         |
|               | `/products/:id`               | PUT        | Update product                          |
|               | `/products/:id`               | DELETE     | Delete product                          |
|               | `/products/search?q=keyword`  | GET        | Search products by keyword              |
| **reviews**    | `/products/:id/reviews`       | POST       | Add review to a product                 |
|               | `/products/:id/reviews`       | GET        | Get all reviews for a product           |
| **categories**  | `/categories`                 | GET        | List all categories                     |
|               | `/categories`                 | POST       | Create a new category                   |
|               | `/categories/:id`             | PUT        | Update category                         |
|               | `/categories/:id`             | DELETE     | Delete category                         |
|               | `/categories/:id/products`    | GET        | Get all products in a category          |
| **orders**     | `/orders`                     | POST       | Create new order                        |
|               | `/orders`                     | GET        | (Admin) List all orders                 |
|               | `/orders/my`                  | GET        | List current user's orders              |
|               | `/orders/:id`                 | GET        | Get order by ID                         |
|               | `/orders/:id/pay`             | PUT        | Mark order as paid                      |
|               | `/orders/:id/deliver`         | PUT        | Mark order as delivered (admin only)    |
| **orderItem** | *(Handled inside `/orders` POST)* | —          | Part of the order object payload        |
| **cart**      | `/cart`                       | GET        | Get current user's cart                 |
|               | `/cart`                       | POST       | Create/update cart                      |
|               | `/cart/clear`                 | DELETE     | Clear all items in the cart             |
| **cartItem**  | `/cart/items`                 | POST       | Add item to cart                        |
|               | `/cart/items/:itemId`         | PUT        | Update item quantity                    |
|               | `/cart/items/:itemId`         | DELETE     | Remove item from cart                   |

---  
`orderItem` is not an endpoint, it's a snapshot of the exact item and it's specifications at time it's placed.  
We want to preserve this as item specifications can change over time.
What you typically **embed** in `orderItem`
| Field     | Purpose                                      |
| --------- | -------------------------------------------- |
| `product` | Reference to the original product (ObjectId) |
| `name`    | Product name at time of purchase             |
| `image`   | Image URL at time of purchase                |
| `price`   | Price when ordered                           |
| `qty`     | Quantity purchased                           |  

Example orderItem **(embedded)**
```
{
  "_id": "order1",
  "user": "user77",
  "orderItems": [
    {
      "product": "productId88",       // Reference for tracking or future lookup
      "name": "Shirt",  
      "description" : "best t-shirt in the world",      
      "image": "/images/shirt.jpg",
      "brand": "Nike",
      "price": 29.99,             
      "stock": 2                        
    }
  ],
  "totalPrice": 59.98,
  "createdAt": "2025-05-20T10:00:00Z"  
}  
```  
Example orderItem **(referenced)**
```
{
  "_id": "order1",
  "user": "user77",
  "orderItems": [      // id's of individual orders
    "orderItemA1", 
    "orderItemA2"
  ],
  "totalPrice": 59.98,
  "createdAt": "2025-05-20T10:00:00Z"
}
  
```  

MongoDB gives us **`Embedded`** or **`Referenced`** to associate our collections  
| Feature          | **Embedded**                       | **Referenced**                           |
| ---------------- | ---------------------------------- | ---------------------------------------- |
| Relationship  | Stored *inside* parent document    | Separate documents, linked via ObjectId  |
| Performance   | Faster reads (fewer queries/joins) | Slightly slower reads (requires lookup)  |
| Use Case      | One-to-few, tightly related data   | One-to-many, loosely related or reusable |
| Updates       | Updated *with* the parent          | Updated *independently*                  |
| Document Size | Grows with embedded array          | Smaller, normalized parent               |
| Best For       | Static data, doesn't change often  | Dynamic, shared across collections       |
| Avoid When     | Sub-document size grows unbounded  | You only ever use the data *with* parent |  

One case where we would want Referenced would be reviews.  
Looking up expanded reviews would be costly for performance. 
