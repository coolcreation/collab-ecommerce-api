| **Collection**    | **Endpoint**                      | **Method** | **Description**                         |
| ------------- | --------------------------------- | ---------- | --------------------------------------- |
| **users**      | `/api/users/register`             | POST       | Register a new user                     |
|               | `/api/users/login`                | POST       | Login existing user                     |
|               | `/api/users/profile`              | GET        | Get current user profile                |
|               | `/api/users/:id`                  | PUT        | Update user profile (name, email, etc.) |
|               | `/api/users`                      | GET        | (Admin) List all users                  |
|               | `/api/users/:id`                  | DELETE     | (Admin) Delete user                     |
| **admin**     | `/api/admin/login`                | POST       | Admin login                             |
|               | `/api/admin/dashboard`            | GET        | (Optional) Admin dashboard data         |
| **products**   | `/api/products`                   | GET        | List all products                       |
|               | `/api/products/:id`               | GET        | Get product by ID                       |
|               | `/api/products`                   | POST       | Create new product (admin only)         |
|               | `/api/products/:id`               | PUT        | Update product                          |
|               | `/api/products/:id`               | DELETE     | Delete product                          |
|               | `/api/products/search?q=keyword`  | GET        | Search products by keyword              |
| **reviews**    | `/api/products/:id/reviews`       | POST       | Add review to a product                 |
|               | `/api/products/:id/reviews`       | GET        | Get all reviews for a product           |
| **categories**  | `/api/categories`                 | GET        | List all categories                     |
|               | `/api/categories`                 | POST       | Create a new category                   |
|               | `/api/categories/:id`             | PUT        | Update category                         |
|               | `/api/categories/:id`             | DELETE     | Delete category                         |
|               | `/api/categories/:id/products`    | GET        | Get all products in a category          |
| **orders**     | `/api/orders`                     | POST       | Create new order                        |
|               | `/api/orders`                     | GET        | (Admin) List all orders                 |
|               | `/api/orders/my`                  | GET        | List current user's orders              |
|               | `/api/orders/:id`                 | GET        | Get order by ID                         |
|               | `/api/orders/:id/pay`             | PUT        | Mark order as paid                      |
|               | `/api/orders/:id/deliver`         | PUT        | Mark order as delivered (admin only)    |
| **orderItem** | *(Handled inside `/orders` POST)* | —          | Part of the order object payload        |
| **cart**      | `/api/cart`                       | GET        | Get current user's cart                 |
|               | `/api/cart`                       | POST       | Create/update cart                      |
|               | `/api/cart/clear`                 | DELETE     | Clear all items in the cart             |
| **cartItem**  | `/api/cart/items`                 | POST       | Add item to cart                        |
|               | `/api/cart/items/:itemId`         | PUT        | Update item quantity                    |
|               | `/api/cart/items/:itemId`         | DELETE     | Remove item from cart                   |

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
      "image": "/images/shirt.jpg",
      "price": 29.99,             
      "qty": 2                        
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
