## Overview

This spec describes the REST API endpoint for getting the current user's cart with their items and total price.

### User Story

As an user, I want to view my cart with all items I've added and the total price.

### UI Usage

N/A (based on business requirements)

### Backend Usage

None planned.

## Endpoint Details

### HTTP Request

#### Headers

```http
GET /api/v1/cart

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

Data has successfully been returned. An empty cart may be returned.
The `data` field contains the `Cart` information:

```json
{
  "data": {
    "items": [
      {
        "sku": "120P90",
        "name": "Google Home",
        "quantity": 3,
        "price": 49.99,
        "totalPrice": 99.98
      }
    ],
    "totalPrice": 99.98
  }
}
```

### Endpoint-Specific Errors

None

