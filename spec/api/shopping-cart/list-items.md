## Overview

This spec describes the REST API endpoint for listing all the available items.

### User Story

As an user, I want to view all available items to buy along with their price.

### UI Usage

N/A (based on business requirements)

### Backend Usage

None planned.

## Endpoint Details

### HTTP Request

#### Headers

```http
GET /api/v1/items

Content-Type: application/json
```

#### URL Parameters

None

#### Query Parameters

N/A (based on business requirements). In the future we could have offset, and limit as query params

#### Request Body

None

#### Remarks

### HTTP Response

#### `200 OK`

Data has successfully been returned. An empty list may be returned.
The `data` field contains a list of objects each representing an `Item`:

```json
{
  "data": [
    {
      "sku": "120P90",
      "name": "Google Home",
      "price": 49.99
    },
    {
      "sku": "43N23P",
      "name": "MacBook Pro",
      "price": 5399.99
    },
  ]
}
```

### Endpoint-Specific Errors

None at the moment.

