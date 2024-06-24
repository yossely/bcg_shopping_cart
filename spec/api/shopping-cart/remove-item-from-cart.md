## Overview

This spec describes the REST API endpoint for removing an item to the current user's cart.

### User Story

As an user, I want to remove an item from my cart.

### UI Usage

N/A (based on business requirements)

### Backend Usage

None planned.

## Endpoint Details

### HTTP Request

#### Headers

```http
DELETE /api/v1/cart/items/{SKU}

Content-Type: application/json
Session-ID: unique-session-id
```

#### URL Parameters

- `sku`: `string` (required) The item identifier (stock keeping unit)


#### Query Parameters

N/A

#### Request Body

None

### HTTP Response

#### `200 OK`

Item has successfully been removed to the cart.
The `data` field contains the `Cart` information updated:

```json
{
  "data": {
    "items": [
      {
        "sku": "120P90",
        "name": "Google Home",
        "quantity": 1,
        "price": 49.99,
        "totalPrice": 49.99
      }
    ],
    "totalPrice": 49.99
  }
}
```

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
  "code": "sku/invalid",
  "message": "Invalid SKU",
  "data": {
    "sku": "sku-provided"
  }
}
```

#### 404 Not Found

```json
{
  "code": "cart/item_not_found",
  "message": "No item found in the cart for the SKU provided",
  "data": {
    "sku": "sku-provided"
  }
}
```
