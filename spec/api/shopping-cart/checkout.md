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
    "items": [],
    "totalPrice": 0
  }
}
```

#### Remarks

- The cart will be empty once the checkout process finishes successfully.

### Endpoint-Specific Errors

#### 400 Bad Request

```json
{
  "code": "session_id/invalid",
  "message": "Invalid Session ID"
}
```

```json
{
  "code": "cart/empty",
  "message": "Empty cart, try adding some items first"
}
```

