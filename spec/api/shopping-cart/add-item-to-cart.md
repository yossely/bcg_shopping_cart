## Overview

This spec describes the REST API endpoint for adding an item to the current user's cart.

### User Story

As an user, I want to add items to my cart.

### UI Usage

N/A (based on business requirements)

### Backend Usage

None planned.

## Endpoint Details

### HTTP Request

#### Headers

```http
POST /api/v1/cart/items/{SKU}

Content-Type: application/json
Session-ID: unique-session-id
```

#### URL Parameters

- `sku`: `string` (required) The item identifier (stock keeping unit)

#### Query Parameters

N/A

#### Request Body

The request body, a `ItemToCartInputSchema`, is JSON formatted.

```json
{
  "quantity": 1
}
```

- `quantity`: `number` (required) The number of items the user wants to add to the cart

#### Remarks

- If no cart found, a new cart will be created for the user and the item(s) will be added.

### HTTP Response

#### `200 OK`

Item(s) has successfully been added to the cart.
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
    "code": "carts/invalid_quantity",
    "message": "Quantity should be greater than 0",
    "data": {
        "quantity": 0
    }
}
```

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

