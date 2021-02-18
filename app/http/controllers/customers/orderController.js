const Order = require("../../../models/order");
const moment = require("moment");
function orderController() {
  return {
    // OrderController
    store: function (req, res) {
      // User Data for Order Placement
      const { phone, address } = req.body;
      // User Data Validation
      if (!phone || !address) {
        req.flash("error", "All fields are require");
        return res.redirect("/cart");
      } else {
        const order = new Order({
          // Already LogedIn User's Order Data
          customerId: req.user._id,
          items: req.session.cart.items,
          phone: phone,
          address: address,
        });

        // Saving the Data
        order
          .save()
          .then((result) => {
            req.flash("Success", "Order Placed Successfully");
            // To Delete the cart after the order is placed
            delete req.session.cart;
            return res.redirect("/customer/orders");
          })
          .catch((err) => {
            req.flash("error", "Something Went Wrong");
            return res.redirect("/cart");
          });
      }
    },

    // Rendering Customer's Order Page
    index: async function (req, res) {
      // LoggedIn Users's Order Data
      const orders = await Order.find({ customerId: req.user._id }, null, {
        sort: { createdAt: -1 },
      });
      res.render(
        "customers/orders",
        // Sending Customer's Orders Data
        { orders: orders, moment: moment }
      );
    },
  };
}
module.exports = orderController;
