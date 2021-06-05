const Product = require('../models/product');
const Cart = require('../models/cart');
const admin = require('./admin')

exports.getProducts = (req, res, next) => {
  // Product.fetchAll(products => {
    Product.findAll().then(products => {
      res.json(products);
      // res.render('shop/product-list', {
      //   prods: products,
      //   pageTitle: 'All Products',
      //   path: '/products'
      // });
    })
  // });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(prodId);

  Product.findByPk(prodId).then(product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  })
  // Product.findById(prodId).then(([product, fields]) => {
  //   console.log('product',product)
  //   res.render('shop/product-detail', {
  //     product: product[0],
  //     pageTitle: product.title,
  //     path: '/products'
  //   });
  // });
};

exports.getIndex = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  // Product.fetchAll().then(([products, fields]) => {
  //   res.render('shop/index', {
  //     prods: products,
  //     pageTitle: 'Shop',
  //     path: '/'
  //   });
  // });
};

exports.getCart = (req, res, next) => {
  req.user.getCart().then(cart => {
  // Cart.getCart(cart => {
    cart.getProducts().then(cartProducts => {
    // Product.fetchAll(products => {
    //   const cartProducts = [];
    //   for (product of products) {
    //     const cartProductData = cart.products.find(
    //       prod => prod.id === product.id
    //     );
    //     if (cartProductData) {
    //       cartProducts.push({ productData: product, qty: cartProductData.qty });
    //     }
    //   }
      res.json(cartProducts)
      // res.render('shop/cart', {
      //   path: '/cart',
      //   pageTitle: 'Your Cart',
      //   products: cartProducts
      // });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log('prodId >>>>>>>>.', JSON.stringify(req.body))
  let fetchedCart;
  let newQuantity = 1;

  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId }})
    })
    .then(products => {
      let product;
      if(products.length > 0 ){
        product = products[0]
      }
      if(product){
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId)
    })
    .then(product => {
        return fetchedCart.addProduct(product, {
          through: { quantity: newQuantity}
      })
    })
    .then(() => {
      res.json({ message: "Sucess"})
      // res.redirect('/cart');
    })
    .catch(err => console.log(err))



  // Product.findById(prodId, product => {
  //   Cart.addProduct(prodId, product.price);
  // });
  // res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {


  const prodId = req.body.productId;
  let fetchedCart;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({where: { id: prodId}})
    })
    .then(products => {
      let product;
      if(products.length > 0){
        console.log('JSON.products>>>>>', JSON.stringify(products))
        product = products[0];
        console.log('JSON.', JSON.stringify(product))
        return product.cartItem.destroy();
      }
    })
    // .then(() => res.json('/cart'))
    // .catch(err => console.log(err))
    .then(() => res.json({message: 'Successfully Deleted'}))
    .catch(error => res.json({error: error, message: 'Failure'}))
  // Product.findById(prodId, product => {
  //   Cart.deleteProduct(prodId, product.price);
  //   res.redirect('/cart');
  // });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
