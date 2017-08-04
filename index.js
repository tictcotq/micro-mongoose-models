'use strict'
const mongoose = require('mongoose')
const isPromise = require('is-promise')

module.exports = exports = next => async(req, res) => {
  const nextResultAsync = next(req, res)
  const nextResult = isPromise(nextResultAsync)
    ? await nextResultAsync
    : nextResultAsync

  if (Array.isArray(nextResult))
    return nextResult.map(item => item instanceof mongoose.Model ? item.toObject() : item)

  return (nextResult instanceof mongoose.Model)
    ? nextResult.toObject()
    : nextResult
}
