<!-- [![Build Status](https://travis-ci.org/kandros/micro-jwt-auth.svg?branch=master)](https://travis-ci.org/kandros/micro-jwt-auth)
[![npm](https://img.shields.io/npm/v/micro-jwt-auth.svg)](https://www.npmjs.com/package/micro-jwt-auth) -->
# micro-mongoose-models
Return [Mongoose](http://mongoosejs.com/) models right from your [zeit/micro](https://github.com/zeit/micro) microservices.  
Models get converted to plain objects with model's `.toObject` method.

## Usage
#### Before
```js
const handler = (req, res) => {
  const products = await Product.find()
  return products.map(p => p.toObject())
}

module.exports = handler
```

#### After
```js
const handler = (req, res) =>
  Product.find()

module.exports = mongooseModels(handler)
```

> Important: all examples assume Mongoose is configured to use promises.  
> [Details](http://mongoosejs.com/docs/promises.html) on Mongoose docs.
```js
mongoose.Promise = global.Promise
```

##Install
```sh
npm install --save micro-mongoose-models
# or
yarn add micro-mongoose-models
```

## Examples

Let's assume you have `Product` model defined in a following way:
```javascript
const toObject = {
  transform: (doc, res) => {
    delete res._id
    delete res.__v
    res.id = doc.id
  },
}

const Product = mongoose.model('Product', mongoose.Schema({
  name: String,
  price: Number,
}, { toObject }))
```

#### With single model
```javascript
const mongooseModels = require('micro-mongoose-models')

const handler = async(req, res) =>
  User.findById(req.params.id)

module.exports = mongooseModels(handler)
```

#### With array of models
```js
const handler = async(req, res) =>
  User.find()
```

#### Combine with any other middleware (better with [micro-compose](https://github.com/microauth/micro-compose)):
```js
const compose = require('micro-compose')
const someMiddleware = require('some-middleware')
const mongooseModels = require('micro-mongoose-models')

const handler = (req, res) =>
  User.find()

module.exports = compose(
  someMiddleware,
  mongooseModels)(handler)
```
