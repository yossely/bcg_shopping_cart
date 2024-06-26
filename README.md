# Bcg Shopping Cart

## Requirements

Checkout system as a standalone NodeJS API that supports different items and promotions.

### Items

| SKU    | Name          | Price   |
| ------ | ------------- | ------- |
| 120P90 | Google Home   | 49.99   |
| 43N23P | MacBook Pro   | 5399.99 |
| A304SD | Alexa Speaker | 109.50  |
| 344222 | Raspberry Pi  | 30.00   |

### Promotions

- Buy 3 Google Homes for the price of 2
- Each sale of a MacBook Pro comes with a free Raspberry Pi
- Buying more than 3 Alexa Speakers will have a 10% discount on all Alexa speakers

#### Example Scenarios

- Scanned Items: MacBook Pro, Raspberry Pi B 
  - Total: $5,399.99
- Scanned Items: Google Home, Google Home, Google Home 
  - Total: $99.98
- Scanned Items: Alexa Speaker, Alexa Speaker, Alexa Speaker 
  - Total: $295.65

## Assumptions && Technical Details

- The scanned items represent the items that a user has in the shopping cart.
- There are no limits on the inventory of the products.
- The system will only place orders (the order processing is out of the scope).
- Items will be added one type at a time, specifying the quantity.
- Items will be removed one type at a time.
- Authentication
  - Users don't need to register/login in order to add items to their cart and proceed with the checkout.
  - Session-based approach where each cart will be identified by a unique session ID.
  - The session ID can be stored in cookies on the client-side and sent with each request to identify the user's cart.
  - The session ID expiration time will be 2h, allowing users enough time to browse and make decisions, and also ensuring that server resources are not excessively tied up with inactive sessions.
- Storage
  - Redis will be used as an in-memory key–value database.
  - Redis has built-in mechanisms to handle session expiration and cleanup.

## REST Resources

To enable continuous improvement, maintaining backward compatibility and managing different user requirements effectively, the API will have URI path versioning, which means that all REST resources will have the based URL `/api/v1`. Here's the list of the available endpoints:

1. [List items](./spec/api/shopping-cart/list-items.md)
2. [Get cart](./spec/api/shopping-cart/get-cart.md)
3. [Add item to cart](./spec/api/shopping-cart/add-item-to-cart.md)
4. [Remove item from cart](./spec/api/shopping-cart/remove-item-from-cart.md)
5. [Checkout](./spec/api/shopping-cart/checkout.md)

---

## Requirements

- Git
- Node
- Docker

## Start the application

1. Create `.env` file. See `.env.example` to set the environment variables needed.
2. Start local DB (Redis) using `npx nx run shopping_cart:local:db:start`. This includes a Redis web-based management tool that can be accessed via `http://localhost:8081/`
3. Start REST API server with `npx nx serve shopping_cart`
4. You're ready to consume the endpoints listed in the [REST Resources](#rest-resources) section

## Improvements

- Database 
  - Use an object-relational DB system such as PostgreSQL.
    - Best suited for transactional applications such as an e-commerce.
    - Allows managing relational data with high integrity.
  - Seeding
    - The existing process seeds the DB with the available items each time the server starts, which isn't efficient.
    - The seed can be handled by a one-time script for local data and migrations for other environments such as staging/production.
- CI/CD
  - Configure verifications steps like lint, build and tests on each pull request ensuring consistent quality.
- Tests
  - Set a test coverage threshold (Only the `cartService.addItem` was tested as an example for the challenge).
- Handling numbers (Javascript and DB)
  - Numbers associated with money in an e-commerce system requires careful attention to precision and correctness.
  - Use libraries like bignumber.js or decimal.js for precise decimal arithmetic when complex financial calculations need to be performed.
  - Always use integer arithmetic for calculations to ensure precision.
  - Convert back to the desired format (e.g., dollars) only for display purposes.
  - Use the `NUMERIC` data type, designed for exact precision, making it ideal for monetary values. It allows specifying the scale and precision to ensure values are stored correctly.
- Use Swagger for documenting, and consuming RESTful APIs.
- Differentiating the service's internal models from its API interfaces or contracts
  - Enhances maintainability, flexibility, security, and scalability. 
  - Allows internal systems to evolve independently of the API, facilitates cleaner and more secure code, and ensures a clear contract with external clients.
- Improve error handling
  - Propagate the errors from the data access layer up to the service layer, where it can be handled appropriately based on the context.
  - Log the error details, including the stack trace and relevant context information, to a persistent logging system. This helps in diagnosing and fixing issues
  - Ensure that sensitive information (like passwords or personal data) is not included in the logs.
  - Implement retry logic for transient errors.

---
<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, Smart Monorepos · Fast CI.](https://nx.dev)** ✨
