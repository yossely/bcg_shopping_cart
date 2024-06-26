## Overview

This spec describes the REST API endpoint for the checkout, that is finalize the purchase and apply all promotions for the cart associated with the session ID.

### User Story

As an user, I want to proceed to checkout with the items in my cart.

### UI Usage

N/A (based on business requirements)

### Backend Usage

None planned.

## Endpoint Details

### HTTP Request

#### Headers

```http
POST /api/v1/checkout

Content-Type: application/json
Session-ID: unique-session-id
```

#### URL Parameters

None

#### Query Parameters

N/A

#### Request Body

None

### HTTP Response

#### `200 OK`

Checkout complete successfully.
The `data` field contains the `Cart` information updated:

```json
{
  "data": {
    "cart": {
      "items": [],
      "totalPrice": 0
    },
    "order": {
      "id": "order-id",
      "createdAt": "2024-06-26T04:22:39.945Z",
      "items": [
        {
          "sku": "120P90",
          "name": "Google Home",
          "price": 49.99,
          "quantity": 1,
          "totalPrice": 49.99
        }
      ],
      "totalPrice": 49.99
    }
  }
}
```

#### Remarks

- The cart will be empty once the checkout process finishes successfully.

### Endpoint-Specific Errors

#### 400 Bad Request

```json
{
  "code": "carts/empty",
  "message": "The cart is empty",
  "data": {
    "sessionID": "session-id-provided"
  }
}
```

