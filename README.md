# REST API with Node.js, MongoDB

> A Basic Node.js project

## Build Setup

```bash
# install dependencies
npm install

# serve at http://localhost:4000/

npm start
```

## Prerequisites

- Nodejs
- MongoDB

**Request:**

```json
POST user/create

{
    "firstName": "Elon",
    "lastName": "Musk",
    "email": "elon@tesla.com"
}

PUT user/:id
{
    "firstName": "Elon",
    "lastName": "Musk",
    "email": "elonmusk@tesla.com"
}


GET user/getUsers

GET user/:id

DELETE user/:id
```
