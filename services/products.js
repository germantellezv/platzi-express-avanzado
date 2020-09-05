const productsMocks = require('../utils/mocks/products')
const MongoLib = require('../lib/mongo')

class ProductsService {
  constructor(){
    this.collection = 'products'
    this.mongoDB = new MongoLib();
  }

  async getProducts({tags}){
    const query = tags && { tags: {$in: tags}}
    const products = await this.mongoDB.getAll(this.collection, query)
    return products || []
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