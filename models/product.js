// import { Sequelize } from "sequelize/types";

// const fs = require('fs');
// const path = require('path');

// const db = require('../util/database');

// const Cart = require('./cart');

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'products.json'
// );

// const getProductsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

// module.exports = class Car {
//   constructor(){
//     throw new error;
//   }

//   constructor(id, title, imageUrl, description, price) {

//     // if((engine == null ) || (wheels == null)){
//     //   throw new error
//     // }
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     return db.execute('INSERt INTO PRODUCTS (TITLE, PRICE, DESCRIPTION) VALUES (?, ?, ?)',
//     [this.title, this.price, this.description])
//   }

//   static deleteById(id) {
//     getProductsFromFile(products => {
//       const product = products.find(prod => prod.id === id);
//       const updatedProducts = products.filter(prod => prod.id !== id);
//       fs.writeFile(p, JSON.stringify(updatedProducts), err => {
//         if (!err) {
//           Cart.deleteProduct(id, product.price);
//         }
//       });
//     });
//   }

//   static fetchAll(cb) {
//     return db.execute('SELECT * FROM PRODUCTS');
//   }

//   static findById(id, cb) {
//     return db.execute('Select * from Products where id = (?)', [id])
//   }
// };


const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Product;