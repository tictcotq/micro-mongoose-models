'use strict'

const middleware = require('../index')
const mongoose = require('mongoose')
const Schema = new mongoose.Schema({ name: String})
const Model = mongoose.model('Model', Schema)

describe('micro-mongoose-models', () => {
  it('should return plain object when passed Mongoose model', async () => {
    const req = {}
    const res = {
      writeHead: jest.fn().mockImplementation(),
      end: jest.fn().mockImplementation(),
    }
    const handler = () => new Model({name: 'John'})

    const result = await middleware(handler)(req, res)

    expect(result.name).toBe('John')
    expect(result._id).toBeDefined()
    expect(res.writeHead).toHaveBeenCalledTimes(0)
    expect(res.end).toHaveBeenCalledTimes(0)
  })

  it('should return the same plain object as passed in', async () => {
    const req = {}
    const res = {
      writeHead: jest.fn().mockImplementation(),
      end: jest.fn().mockImplementation(),
    }
    const handler = () => ({name: 'John'})

    const result = await middleware(handler)(req, res)

    expect(result).toEqual({name: 'John'})
    expect(res.writeHead).toHaveBeenCalledTimes(0)
    expect(res.end).toHaveBeenCalledTimes(0)
  })

  it('should return the same primitive value as passed in', async () => {
    const req = {}
    const res = {
      writeHead: jest.fn().mockImplementation(),
      end: jest.fn().mockImplementation(),
    }
    const handler = () => 'Works!'

    const result = await middleware(handler)(req, res)

    expect(result).toBe('Works!')
    expect(res.writeHead).toHaveBeenCalledTimes(0)
    expect(res.end).toHaveBeenCalledTimes(0)
  })

  it('should return array of plain objects when passed array of Mongoose models', async () => {
    const req = {}
    const res = {
      writeHead: jest.fn().mockImplementation(),
      end: jest.fn().mockImplementation(),
    }
    const handler = () => [
      new Model({name: 'John'}),
      new Model({name: 'Kate'}),
    ]

    const result = await middleware(handler)(req, res)

    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(2)
    expect(result[0].name).toBe('John')
    expect(result[0]._id).toBeDefined()
    expect(result[1].name).toBe('Kate')
    expect(result[1]._id).toBeDefined()
    expect(res.writeHead).toHaveBeenCalledTimes(0)
    expect(res.end).toHaveBeenCalledTimes(0)
  })
})

// test('error throwed if secret undefined', () => {
//   expect(
//     () => jwtAuth()()
//   ).toThrow('micro-jwt-auth must be initialized passing a secret to decode incoming JWT token')
// });
//
// test('case of request has not authorization header', () => {
//
//   const request = {
//     headers: {},
//     url: 'https://api.cabq.gov/domain/resources/1'
//   }
//
//   const response = {
//     writeHead: jest.fn().mockImplementation(),
//     end: jest.fn().mockImplementation()
//   };
//
//   const result = jwtAuth('mySecret')()(request, response)
//
//   expect(result).toBeUndefined()
//   expect(response.writeHead).toHaveBeenCalledWith(401)
//   expect(response.end).toHaveBeenCalledWith('missing Authorization header')
// });
//
// test('that all works fine: no errors', () => {
//
//   const request = {
//     headers: {
//       authorization: VALID_HEADER
//     },
//     url: 'https://api.cabq.gov/domain/resources/1'
//   }
//
//   const response = {
//     writeHead: jest.fn().mockImplementation(),
//     end: jest.fn().mockImplementation()
//   };
//
//   const result = jwtAuth('mySecret')(() => 'Good job!')(request, response)
//
//   expect(result).toEqual('Good job!')
//   expect(response.writeHead).toHaveBeenCalledTimes(0)
//   expect(response.end).toHaveBeenCalledTimes(0)
//   expect(request.jwt).toEqual(JWT_CONTENT)
// })
//
// test('wrong bearer case', () => {
//
//   const request = {
//     headers: {
//       authorization: INVALID_HEADER
//     },
//     url: 'https://api.cabq.gov/domain/resources/1'
//   }
//
//   const response = {
//     writeHead: jest.fn().mockImplementation(),
//     end: jest.fn().mockImplementation()
//   };
//
//   const result = jwtAuth('mySecret')(() => {})(request, response)
//
//   expect(result).toBeUndefined()
//   expect(response.writeHead).toHaveBeenCalledWith(401)
//   expect(response.end).toHaveBeenCalledWith('invalid token in Authorization header')
//
// })
//
// test('no need authorization bearer if whitelisted path', () => {
//
//   const request = {
//     headers: {},
//     url: 'https://api.cabq.gov/domain/resources/1'
//   }
//
//   const response = {
//     writeHead: jest.fn().mockImplementation(),
//     end: jest.fn().mockImplementation()
//   };
//
//   const result = jwtAuth('mySecret', [ '/domain/resources/1' ])(() => 'Good job!')(request, response)
//
//   expect(result).toEqual('Good job!')
//   expect(response.writeHead).toHaveBeenCalledTimes(0)
//   expect(response.end).toHaveBeenCalledTimes(0)
//
// })
//
// test('decode jwt even for whitelisted path', () => {
//
//   const request = {
//     headers: {
//       authorization: VALID_HEADER
//     },
//     url: 'https://api.cabq.gov/domain/resources/1'
//   }
//
//   const response = {
//     writeHead: jest.fn().mockImplementation(),
//     end: jest.fn().mockImplementation()
//   };
//
//   const result = jwtAuth('mySecret', [ '/domain/resources/1' ])(() => 'Good job!')(request, response)
//
//   expect(result).toEqual('Good job!')
//   expect(response.writeHead).toHaveBeenCalledTimes(0)
//   expect(response.end).toHaveBeenCalledTimes(0)
//   expect(request.jwt).toEqual(JWT_CONTENT)
// })
//
// test('do not throw error if jwt is invalid for whitelisted path', () => {
//
//   const request = {
//     headers: {
//       authorization: INVALID_HEADER
//     },
//     url: 'https://api.cabq.gov/domain/resources/1'
//   }
//
//   const response = {
//     writeHead: jest.fn().mockImplementation(),
//     end: jest.fn().mockImplementation()
//   };
//
//   const result = jwtAuth('mySecret', [ '/domain/resources/1' ])(() => 'Good job!')(request, response)
//
//   expect(result).toEqual('Good job!')
//   expect(response.writeHead).toHaveBeenCalledTimes(0)
//   expect(response.end).toHaveBeenCalledTimes(0)
//   expect(request.jwt).toBeUndefined()
// })
