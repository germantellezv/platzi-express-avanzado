const productMocks = require('../utils/mocks/products')
const productsMocks = require('../utils/mocks/products')

class ProductsService {
  constructor(){}

  getProducts({tags}){
    return Promise.resolve(productsMocks)
  }

  getProduct({productId}){
    return Promise.resolve(productsMocks)
  }

  createProduct({product}){
    return Promise.resolve(productsMocks)
  }

  updateProduct({productId}){
    return Promise.resolve(productsMocks)
  }

  deleteProduct({productId, product}){
    return Promise.resolve(productsMocks)
  }

}

module.exports = ProductsService