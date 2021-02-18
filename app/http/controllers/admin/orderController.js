const Orders = require("../../../models/order");
const moment = require("moment");

function orderController() {
  return {
    index: async function (req, res) {
      await Orders.find({ status: { $ne: "completed" } }, null, {
        sort: { createdAt: -1 },
      })
        .populate("customerId", "-password")
        .exec((err, orders) => {
          if (req.xhr) {
            return res.json(Orders);
          } else {
            return res.render("admin/orders", {
              orders,
              moment,
            });
          }
        });
    },
  };
}

module.exports = orderController;
