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

Item has successfully been removed to the cart. An empty cart may be returned.
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

#### 404 Not Found

```json
{
  "code": "items/not_found",
  "message": "Item not found",
  "data": {
    "sku": "sku-provided"
  }
}
```

```json
{
  "code": "carts/not_found",
  "message": "Cart not found or empty",
  "data": {
    "sessionID": "session-id-provided"
  }
}
```

```json
{
  "code": "carts/item_not_found",
  "message": "No item found in the cart for the SKU provided",
  "data": {
    "sku": "sku-provided"
  }
}
```
