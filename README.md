# REST API with Node.js, MongoDB, JWT

> Blog Node.js project

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

## Production

```
npm i -g pm2
```

# Build

```
npm run build

```

## dev

```
# serve at http://localhost:4000/

pm2:dev
```

## prod

```
# serve at http://localhost:4000/

pm2:prod

```

**Request:**

### User

```

POST user/register
{
"name": "Elon",
"email": "elon@tesla.com",
"password": "elon@1234",
"role": "author"
}

```

```

POST user/login
{
"email": "elon@tesla.com",
"password": "elon@1234"
}

```

## Authorization

### Post

```

POST posts/

{
"postTitle": "Deno",
"postBody": "New Nodejs Framework",
"genre": "tech"
}

```

```

PUT posts/:id
{
"postTitle": "Deno",
"postBody": "New Nodejs Framework by Nodejs Creator",
"genre": "tech"
}

```

```

GET posts/

GET posts/?page=1&limit=1

GET posts/:id

DELETE posts/:id

```

### Comments

```

POST comments/
{
"postId": "603b77052fbc1c1038573518",
"commentText": "Nice"
}

```

```

PUT comments/:id
{
"postTitle": "Deno",
"postBody": "New Nodejs Framework by Nodejs Creator",
"genre": "tech"
}

```

```

GET comments/

GET comments/:id

DELETE comments/:id

```

### Create Admin User

```

POST user/register
{
"name": "admin",
"email": "admin@tesla.com",
"password": "admin@1234",
"role": "admin"
}

```

```

POST user/login
{
"email": "admin@tesla.com",
"password": "admin@1234"
}

```

### Admin Authorization

```

GET user/

```
