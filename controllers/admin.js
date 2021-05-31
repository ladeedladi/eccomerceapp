const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};
const products = [];

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;


  const productobj = {
    title,
    imageUrl,
    price,
    description
  }
  console.log('productobj', productobj);
  req.user.createProduct(productobj)
    .then((results) => console.log(results)).catch(err => console.log(err))
//   Product.create(
//     productobj
// ).then((results) => console.log(results)).catch(err => console.log(err))
  // products.push(productobj);
  // const product = new Product(null, title, imageUrl, description, price);



  // product.save().then((data) => console.log('saved', data).catch(err => console.log(err) ));
  res.redirect('/products');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  req.user.getProducts({ where: {id : prodId}}).then(product => {
  // Product.findByPk(prodId).then(product => {
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product[0]
    });
  })
  // Product.findById(prodId, product => {
  //   if (!product) {
  //     return res.redirect('/');
  //   }
  //   res.render('admin/edit-product', {
  //     pageTitle: 'Edit Product',
  //     path: '/admin/edit-product',
  //     editing: editMode,
  //     product: product
  //   });
  // });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  // const updatedProduct = new Product(
  //   prodId,
  //   updatedTitle,
  //   updatedImageUrl,
  //   updatedDesc,
  //   updatedPrice
  // );
  Product.findByPk(prodId).then(product => {
    product.title = updatedTitle;
    product.imageUrl = updatedImageUrl;
    product.description = updatedDesc;
    return product.save()
  })
  .then(() =>  res.redirect('/admin/products'))
  .catch(err => console.log(err));
  // updatedProduct.save();
};

exports.getProducts = (req, res, next) => {

  req.user.getProducts(products => {
  // Product.findAll().then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch('something went wrong');
  // Product.fetchAll().then(([rows, fields]) => {
  //   res.render('admin/products', {
  //     prods: rows,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products'
  //   });
  // }).catch('something went wrong');
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.delete
  Product.destroy({where: { id : prodId }});
  res.redirect('/admin/products');
};

exports.products = products;
