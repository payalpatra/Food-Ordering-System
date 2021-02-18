function cartController() {
  return {
    // Read
    index: function (req, res) {
      res.render("customers/cart");
    },
    // Update Cart
    update: function (req, res) {
      // let cart = {
      //   items: {
      //     foodId: { item: foodObject, qty: 0 },
      //   },
      //   totalQty: 0,
      //   totalPrice: 0,
      // }
      if (!req.session.cart) {
        req.session.cart = {
          // Empty Cart Created
          items: {},
          totalQty: 0,
          totalPrice: 0,
        };
      }
      let cart = req.session.cart;
      // If item doesn't exist in cart
      if (!cart.items[req.body._id]) {
        cart.items[req.body._id] = {
          item: req.body,
          qty: 1,
        };
        // If the Same item already exists in cart
        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
      } else {
        // Item already exist and a different item added
        cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
      }
      // Total No of items
      res.json({ totalQty: req.session.cart.totalQty });
    },
  };
}
module.exports = cartController;
